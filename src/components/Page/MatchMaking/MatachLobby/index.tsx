import React, { useEffect, useReducer, useState } from "react";
import RedLoL from "@Image/Matchmaking/redlol.jpg";
import BlueLoL from "@Image/Matchmaking/bluelol.jpg";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ReactComponent as Loading } from "@Image/loaderNew.svg";
import RedCrad from "./RedCrad";
import Redplay from "./Redplay";
import BlueCrad from "./BlueCrad";
import Blueplay from "./Blueplay";
import Hexagon from "@Image/Matchmaking/frame-hexagon.png";
import BgHexagon from "@Image/Matchmaking/bg-hexagon.png";
import { ReactComponent as Sword } from "@Image/Matchmaking/sword.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "antd";
import "./style.css";
import WinCard from "./Win";
import LoseCard from "./lose";
import GameAPI from "@api/MatchmakingAPI";
import {
  useSearchMatchContext,
  useSearchMatchDispatch,
} from "@Context/SearchMatch";
import { socket } from "@Utils/socket";
import { getToken } from "../../../../Token";
import { useSearchOppoMatchContext } from "@Context/SearchOppoMatch";
import MatchInProgress from "@Components/Modal/MatchInProgress";
import Wheelspin from "@Components/Page/CustomGame/RoomHost/WheelSpin";
import MaxAPI from "@api/MaxAPI";

const MatachLobby = () => {
  const { searchMatch, SetSearch }: any = useSearchMatchContext();
  const { searchOppoMatch, SetSearchOppo }: any = useSearchOppoMatchContext();

  const [ShowWheel, setShowWheel] = useState(false);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const location = useLocation();
  const stateData: any = location.state;
  const match_id = stateData.match_id;
  const lobbyRoomID = stateData.lobbyRoomID;
  const [isUserReady, setIsUserReady] = useState(false);
  const [winAmount, setWinAmount] = useState(0);
  const [loseAmount, setLoseAmount] = useState(0);
  const [userEarnAmount, setUserEarnAmount] = useState(0);
  const [matchInProgressPopup, setMatchInProgressPopUp] = useState(false);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [timestart, setTimestart] = useState("");

  const [spin, setSpin] = useState(true);
  const [all_ready, setAll_ready] = useState(false);
  const [all_play, setAll_play] = useState(false);
  const [all_rode, setAll_rode] = useState(false);
  const [play, setPlay] = useState(false);
  const [datalinkplay, setDatalinkplay] = useState("");
  const navigate = useNavigate();

  const context = useSearchMatchDispatch();
  const item = context.items;

  const team_id = item.team_id;
  const game_id = item.game_id;
  //console.log(item);

  console.log(datalinkplay);

  let gameWindow: any;
  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      match: {
        team_one_id: 0,
        team_two_id: 0,
        totalPlayer: 0,
        playerPerTeam: 0,
        password: "",
        individualAmount: 0,
        individualblcAmount: 0,
        roomAmount: 0,
        roomBLCAmount: 0,
        Game: {
          lobbyImageUrl: "",
          gameName: "",
        },
      },
      teamOne: [],
      teamTwo: [],
    },
  );
  const [serverip, setServerip] = useState("");

  // useEffect(() => {
  //     setTimeout(() => {
  //         setTimestart((count) => count + 1);
  //     }, 1000);
  //   });

  function onUpdate(remainingTime: number) {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 20;
    const zeroS = seconds < 10 ? "0" : "";
    const zeroM = minutes < 10 ? "0" : "";
    setTimestart(`${zeroM}${minutes}:${zeroS}${seconds}`);
    if (`${zeroM}${minutes}:${zeroS}${seconds}` === "00:00") {
      // gameWindow = window.open(`steam://connect/141.98.18.40:27015` , '_blank', 'width=1600,height=1024,center=true,frame=true');
      const postData = {
        serverip: serverip,
        game_id: game_id,
        match_id: match_id,
      };

      MaxAPI.update_Serveronplay(postData)
        .then((res) => {
          if (res.data.success) {
            // setTimeout(() => {
            //     gameWindow = window.open(`http://http://54.169.109.89/?room=1&matchid=${match_id}&team1id=${data.teamOneID}&team2id=${data.teamTwoID}&currentplayerteamid=${team_id}&user1id=${data.userOneID}&user2id=${data.userTwoID}&accessToken=${getToken()}`
            //         , '_blank', 'width=1600,height=1024,center=true,frame=true');
            //     setShowWheel(false);
            //     setMatchInProgressPopUp(true);
            // }, 13000);
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      setAll_play(true);
      setAll_rode(false);
      setPlay(true);
      setMatchInProgressPopUp(true);
    }
  }

  useEffect(() => {
    getMatchAndLobbyDetails(match_id);
  }, []);

  useEffect(() => {
    socket.on("get_ready_to_play_user", (data) => {
      getMatchAndLobbyDetails(match_id);
    });

    socket.on("search_match_after_oppo_leaved", (data) => {
      if (data.team_room_id == item.team_room_id) {
        SetSearchOppo.CancelOppoSearch();
        SetSearch.setSearchMatchTrue();
        socket.emit("leave_room", data.lobby_room_id);
        navigate("/home");
      } else {
        SetSearchOppo.setSearchOppoMatchTrue();
        navigate("/home");
      }
    });
  }, [socket, match_id, item]);

  useEffect(() => {
    chack_server();
  }, []);

  const chack_server = () => {
    MaxAPI.chack_Serveronplay()
      .then((res) => {
        if (res.data.success) {
          //  console.log(res.data);
          setServerip(res.data.getserver.link);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    socket.on("get_ready_to_play_via_socket", (data) => {
      // if(state.match.Game.gameName == 'csgo'){
      //     console.log('test')
      // }

      //    console.log(data)
      if(data.is_all_ready){
        gameWindow = window.open(`http://54.169.109.89/?room=0&matchid=${match_id}&team1id=${data.teamOneID}&team2id=${data.teamTwoID}&currentplayerteamid=${team_id}&user1id=${data.userOneID}&user2id=${data.userTwoID}&accessToken=${getToken()}`
        , '_blank', 'width=1600,height=1024,center=true,frame=true');
       
        setMatchInProgressPopUp(true);
    //   setChackplay(true);
       // console.log(data.is_all_ready);
        //console.log(data.is_all_ready);
    }
    });

    socket.on("get_game_result", (data) => {
      setUserEarnAmount(data.userEarnAmount);
      if (data.win_team_id == item.team_id) {
        setWinAmount(data.total_amount);
        setMatchInProgressPopUp(false);
        setWin(true);
        setTimeout(() => {
          gameWindow.close();
        }, 1000);
      }
      if (data.lose_team_id == item.team_id) {
        setLoseAmount(data.total_amount);
        setMatchInProgressPopUp(false);
        setLose(true);
        setTimeout(() => {
          gameWindow.close();
        }, 1000);
      }
      setTimeout(() => {
        // socket.emit("search_match", "");
        socket.emit("leave_room", lobbyRoomID);
      }, 3000);
    });

    return () => gameWindow;
  }, [socket, match_id, team_id, gameWindow]);

  const apitest = () => {
    MaxAPI.cHackidplay()
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
          //setServerip(res.data.getserver.link);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMatchAndLobbyDetails = (match_id: number) => {
    GameAPI.getMatchOrLobby(match_id)
      .then((res) => {
        if (res.data.success) {
          setState({
            match: {
              team_one_id: res.data.match.team_one_id,
              team_two_id: res.data.match.team_two_id,
              totalPlayer: res.data.match.total_players,
              playerPerTeam: res.data.match.total_players / 2,
              password: "None",
              individualAmount: res.data.match.bet_amount,
              individualblcAmount: res.data.match.bet_amount,
              roomAmount: res.data.match.total_amount / 2,
              roomBLCAmount: res.data.match.total_amount / 2,
              Game: {
                lobbyImageUrl: res.data.match.Game.lobby_image_url,
                gameName: res.data.match.Game.name_en,
              },
            },
            teamOne: res.data.teamOne,
            teamTwo: res.data.teamTwo,
          });
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //console.log(state);
  const leaveRoomhandler = () => {
    const postData = {
      team_id: team_id,
      game_id: game_id,
      for: "Match",
    };

    GameAPI.leaveRoomOrTeam(postData)
      .then((res) => {
        if (res.data.success) {
          const data = {
            lobby_room_id: lobbyRoomID,
            team_room_id: item.team_room_id,
          };
          socket.emit("leave_match", data);
          socket.emit("leave_room", lobbyRoomID);
          socket.emit("leave_room", item.team_room_id);
          navigate(`/home`);
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const readyToplayHandler = async () => {
    if (state.match.Game.gameName == "Chess") {
      const postData1 = {
        match_id: match_id,
        team_id: team_id,
        game_id: game_id,
        server_ip: serverip,
        status: isUserReady ? "NotReady" : "Ready",
      };
      GameAPI.readyToGamePlaycsgo(postData1)
        .then((res) => {
          if (res.data.success) {
            var room = 0;
            if (state.match.team_one_id == team_id) {
              room = 1;
            }
            const data = {
              lobby_room_id: lobbyRoomID,
              is_all_ready: res.data.is_all_ready,
              bonusAmount: res.data.bonusAmount,
              type: "Start",
              room: room,
              re_check_friends_status_room_id: "reCheckFriendList", //update friendlist status
              teamOneID: state.match.team_one_id,
              teamTwoID: state.match.team_two_id,
              userOneID: state.teamOne[0].User.id,
              userTwoID: state.teamTwo[0].User.id,
              onlineFriends: res.data.onlineFriends,
            };
            setIsUserReady(!isUserReady);

            socket.emit("ready_to_play", data);
            getMatchAndLobbyDetails(match_id);

            socket.emit("ready_to_play_via_socket", data);

            if(res.data.is_all_ready){
                setTimeout(() => {
                    gameWindow = window.open(`http://54.169.109.89/?room=1&matchid=${match_id}&team1id=${data.teamOneID}&team2id=${data.teamTwoID}&currentplayerteamid=${team_id}&user1id=${data.userOneID}&user2id=${data.userTwoID}&accessToken=${getToken()}`
                    , '_blank', 'width=1600,height=1024,center=true,frame=true');
                },2000);
                //setChackplay(true);
                setMatchInProgressPopUp(true);
            }
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      //if1
    } else if (state.match.Game.gameName == "csgo") {
      const postData1 = {
        match_id: match_id,
        team_id: team_id,
        game_id: game_id,
        status: isUserReady ? "NotReady" : "Ready",
      };
      GameAPI.readyToGamePlaycsgo(postData1)
        .then((res) => {
          if (res.data.success) {
            var room = 0;
            if (state.match.team_one_id == team_id) {
              room = 1;
            }
            const data = {
              lobby_room_id: lobbyRoomID,
              is_all_ready: res.data.is_all_ready,
              bonusAmount: res.data.bonusAmount,
              type: "Start",
              room: room,
              re_check_friends_status_room_id: "reCheckFriendList", //update friendlist status
              teamOneID: state.match.team_one_id,
              teamTwoID: state.match.team_two_id,
              userOneID: state.teamOne[0].User.id,
              userTwoID: state.teamTwo[0].User.id,
              onlineFriends: res.data.onlineFriends,
            };
            setIsUserReady(!isUserReady);

            socket.emit("ready_to_play", data);
            getMatchAndLobbyDetails(match_id);
            socket.emit("ready_to_play_via_socket", data);

            if (res.data.is_all_ready) {
              const dataam = {
                cone: state.match.team_one_id,
                teamTwoID: state.match.team_two_id,
                userOneID: state.teamOne[0].User.id,
                userTwoID: state.teamTwo[0].User.id,
                onlineFriends: res.data.onlineFriends,
              };
             // setMatchInProgressPopUp(true);
            }
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      //if1
    } else if (state.match.Game.gameName == "Dota") {
      const postData1 = {
        match_id: match_id,
        team_id: team_id,
        game_id: game_id,
        status: isUserReady ? "NotReady" : "Ready",
      };
      GameAPI.readyToGamePlaycsgo(postData1)
        .then((res) => {
          if (res.data.success) {
            var room = 0;
            if (state.match.team_one_id == team_id) {
              room = 1;
            }
            const data = {
              lobby_room_id: lobbyRoomID,
              is_all_ready: res.data.is_all_ready,
              bonusAmount: res.data.bonusAmount,
              type: "Start",
              room: room,
              re_check_friends_status_room_id: "reCheckFriendList", //update friendlist status
              teamOneID: state.match.team_one_id,
              teamTwoID: state.match.team_two_id,
              userOneID: state.teamOne[0].User.id,
              userTwoID: state.teamTwo[0].User.id,
              onlineFriends: res.data.onlineFriends,
            };
            setIsUserReady(!isUserReady);

            socket.emit("ready_to_play", data);
            getMatchAndLobbyDetails(match_id);
            socket.emit("ready_to_play_via_socket", data);

            apitest();
            console.log(apitest());
            if (res.data.is_all_ready) {
              // setTimeout(() => {
              //   gameWindow = window.open(
              //     `http://http://54.169.109.89/?room=1&matchid=${match_id}&team1id=${data.teamOneID}&team2id=${data.teamTwoID}&currentplayerteamid=${team_id}&user1id=${data.userOneID}&user2id=${data.userTwoID}&accessToken=${getToken()}`,
              //     "_blank",
              //     "width=1600,height=1024,center=true,frame=true",
              //   );
              //   // setShowWheel(false);
              //   // setMatchInProgressPopUp(true);
              // }, 13000);
            }
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      //if1
    } else {
      console.log(state.match);
    }
  };

  return (
    <div
      style={{
        height: "calc(100vh - 110px)",
      }}
      className="pt-6 px-12 overflow-y-auto"
    >
      <div className="grid grid-cols-9  2xl:grid-cols-9  grid-rows-5 h-[1700px] xl:h-[750px]">
        <div className=" w-full h-full col-span-2 row-span-3 pb-4">
          <img
            src={state.match.Game.lobbyImageUrl}
            className="w-full h-full object-cover "
          />
        </div>
        <div className=" w-full h-full col-span-7  row-span-2 flex justify-start">
          {play && <Redplay team={state.teamOne} data={state} />}
          {!all_play && <RedCrad team={state.teamOne} data={state} />}
          <div className="w-16 h-[280px] bg-gradient-to-b from-[#e40000] to-[#5c0000] flex flex-col justify-center items-center">
            <p className="text-3xl text-center">
              T<br />e <br />a<br />m
            </p>
            <p className="text-[43px] text-center font-black">1</p>
          </div>
        </div>

        <div className=" w-full h-full  col-span-5  row-span-1 relative">
          {!all_ready && (
            <div className="absolute w-full h-full flex justify-start items-center px-8 z-40">
              <span
                className="h-[15px] border-y-2 border-primary-green"
                style={{
                  width: "calc(50% - 34px)",
                }}
              ></span>
              <span className="h-[15px] w-[68px] flex justify-center items-center ">
                <Sword className=" w-10 h-10" />
              </span>
              <span
                className="h-[15px] border-y-2 border-primary-green"
                style={{
                  width: "calc(50% - 34px)",
                }}
              ></span>
            </div>
          )}

          <div className="absolute w-full h-full flex justify-center items-center z-0">
            {all_rode && (
              <div className=" w-full h-full ">
                <h1 className="font-bold text-[30px] text-center text-white TextShadow">
                  The game will start in
                </h1>
                <div className="text-[1px]">
                  <CountdownCircleTimer
                    isPlaying={all_rode}
                    duration={60}
                    colors={["#58afe6", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[60, 40, 30, 10]}
                    strokeWidth={150}
                    rotation="clockwise"
                    size={0}
                    trailStrokeWidth={0}
                    strokeLinecap="butt"
                    onUpdate={onUpdate}
                  >
                    {({ remainingTime }) => remainingTime}
                  </CountdownCircleTimer>
                </div>
              </div>
            )}
          </div>
          {all_rode && (
            <div className="absolute w-full h-full flex justify-center items-center z-0">
              <p className="font-bold text-[70px] text-white TextShadow">
                {timestart}
              </p>
            </div>
          )}

          {play && (
            <div className="absolute w-full h-full flex justify-center items-center z-0">
              <p className="font-bold text-[50px] text-white TextShadow font-semibold uppercase mr-5">
                round
              </p>

              <p className="font-bold text-[70px] text-white TextShadow font-semibold uppercase ml-5">
                0
              </p>
            </div>
          )}
        </div>
        <div className=" w-full h-full col-span-2 row-span-3 relative pt-4">
          <img
            src={state.match.Game.lobbyImageUrl}
            className="w-full h-full object-cover brightness-[0.25] "
          />
          <div className="absolute w-full h-full  top-4 left-0 right-0 p-6 text-[18px] flex flex-col gap-6">
            <div className="xl:flex block gap-3">
              <span>Type: </span>
              <span className="font-bold text-primary-sky">
                {state.match.playerPerTeam}vs{state.match.playerPerTeam}{" "}
                Matchmaking{" "}
              </span>
            </div>
            <div className="flex gap-3">
              <span>Players: </span>
              <span className="font-bold ">
                {state.match.totalPlayer}/{state.match.totalPlayer}{" "}
              </span>
            </div>
            <div className="flex gap-3">
              <span>Password: </span>
              <span className="font-bold ">{state.match.password}</span>
            </div>
            <div className="xl:flex block gap-3">
              <span>Individal: </span>
              <div>
                <p className="font-bold ">
                  {state.match.individualAmount} /person
                </p>
                <p className="font-bold text-base text-primary-green">
                  = {state.match.individualblcAmount} BLC
                </p>
              </div>
            </div>
            <div className="xl:flex block  gap-3">
              <span>Room: </span>
              <div>
                <p className="font-bold ">{state.match.roomAmount} in total</p>
                <p className="font-bold text-base text-primary-green">
                  = {state.match.roomBLCAmount} BLC
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full h-full col-span-7  row-span-2 flex items-end pt-6">
          <div className="w-16 h-[280px] bg-gradient-to-b from-[#4785ad] to-[#1c364e] flex flex-col justify-center items-center">
            <p className="text-3xl text-center">
              T<br />e <br />a<br />m
            </p>
            <p className="text-[43px] text-center font-black">2</p>
          </div>

          {play && (
            <Blueplay team={state.teamTwo} data={state.match.totalPlayer} />
          )}
          {!all_play && (
            <BlueCrad team={state.teamTwo} data={state.match.totalPlayer} />
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        {/* <button className=" border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44  rounded-sm"
                    onClick={() => setWin(true)}

                >
                    test win
                </button>
                <button className="bg-primary-sky/30 border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44 rounded-sm"
                    onClick={() => setLose(true)}
                >
                    test lose
                </button> */}
        <Modal
          visible={win}
          footer={null}
          title={null}
          closable={false}
          bodyStyle={{ padding: "0px" }}
          className="p-0 bg-transparent w-full h-auto flex items-center justify-center"
        >
          <WinCard
            win={win}
            setWin={setWin}
            rewardAmount={winAmount}
            userEarnAmount={userEarnAmount}
          />
        </Modal>
        <Modal
          visible={lose}
          footer={null}
          title={null}
          closable={false}
          bodyStyle={{ padding: "0px" }}
          className="p-0 bg-transparent w-full h-auto flex items-center justify-center"
        >
          <LoseCard lose={lose} setLose={setLose} loseAmount={loseAmount} />
        </Modal>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className=" border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44  rounded-sm"
          onClick={() => leaveRoomhandler()}
        >
          leave room
        </button>

        <button
          className={`${
            isUserReady ? "bg-[#eb2227]" : "bg-primary-sky/30"
          } border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44 rounded-sm`}
          onClick={() => readyToplayHandler()}
        >
          {isUserReady ? "Not Ready" : "Ready"}
        </button>

        <Modal
          visible={ShowWheel}
          footer={null}
          title={null}
          closable={false}
          bodyStyle={{ padding: "0px" }}
          className="p-0 bg-transparent w-full h-auto flex items-center justify-center"
        >
          <Wheelspin bonusAmount={bonusAmount} spin={spin} />
        </Modal>
        <Modal
          visible={matchInProgressPopup}
          centered
          footer={null}
          title={null}
          closable={false}
          bodyStyle={{ padding: "0px" }}
          className="p-0 bg-transparent w-full h-auto flex items-center justify-center"
        >
          <MatchInProgress
            matchInProgressPopup={matchInProgressPopup}
            setMatchInProgressPopUp={setMatchInProgressPopUp}
            gameName={datalinkplay}
            ipserver={serverip}
            team={state.teamTwo}
            data={state.match.totalPlayer}
          />
        </Modal>
      </div>
    </div>
  );
};

export default MatachLobby;