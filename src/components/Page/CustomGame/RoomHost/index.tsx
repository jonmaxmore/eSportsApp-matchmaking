import React, { useEffect, useReducer, useState } from "react";
import RedCrad from "./RedCrad";
import BlueCrad from "./BlueCrad";
import Hexagon from "@Image/Matchmaking/frame-hexagon.png"
import BgHexagon from "@Image/Matchmaking/bg-hexagon.png"
import { ReactComponent as Sword } from "@Image/Matchmaking/sword.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Popover } from "antd";
import Wheelspin from "./WheelSpin";
import "./style.css"
import WinCard from "./Win";
import LoseCard from "./lose";
import CustomGameAPI from "@api/CustomGameAPI";
import { socket } from "@Utils/socket";
import HostLeavePopup from "./HostLeavePopup";
import clsx from "clsx";
import { getToken } from "../../../../Token";
import ChangeAmountAlert from "./ChangeAmountAlert";
import MatchInProgress from "@Components/Modal/MatchInProgress";


const MatachLobby = () => {

    const [ShowWheel, setShowWheel] = useState(false);
    const [win, setWin] = useState(false);
    const [lose, setLose] = useState(false);
    const [changeAmountPopup, setChangeAmountPopup] = useState(false);
    const [updatedBetAmount, setUpdatedBetAmount] = useState(0);
    const [gameParticipantPerTeam, setGameParticipantPerTeam] = useState(0);
    const [showHostLeavePopup, setShowHostLeavePopup] = useState(false);
    const [ isLoginAsHost, setIsLoginAsHost ] = useState(false);
    const [ isUserReady, setIsUserReady ] = useState(false);
    const [ isAllUserReady, setIsAllUserReady ] = useState(false);
    const [winAmount, setWinAmount] = useState(0);
    const [loseAmount, setLoseAmount] = useState(0);
    const [bonusAmount, setBonusAmount] = useState(0);
    const [ matchInProgressPopup, setMatchInProgressPopUp ] = useState(false);
    const [userEarnAmount, setUserEarnAmount] = useState(0);
    const [spin, setSpin] = useState(true);

    let gameWindow:any;

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
                    gameName: ""
                },
            },
            teamOne: [],
            teamTwo: [],
        }
    );

    const navigate = useNavigate();
    const location = useLocation()
    const match: any = location.state
    const matchId = match.id;
    const teamId = match.teamID;
    const lobbyRoom = match.lobbyRoom;

    useEffect( () => {
        getCreatedRoomMatchById(matchId);
    },[]);

    useEffect(() => {
        socket.on("get_user_join_data", (data) => {
            getCreatedRoomMatchById(matchId)
          });

        socket.on("get_update_customroom_bet_amount", (data) => {
            setUpdatedBetAmount(data.updatedBetAmount);
            setChangeAmountPopup(true);
            getCreatedRoomMatchById(matchId);
        });
        
        socket.on("get_leaved_room_status", (data) => {
            data.isHostLeaved ? setShowHostLeavePopup(true) : getCreatedRoomMatchById(matchId) ;
        });

        socket.on("get_ready_room_status", (data) => {
            data.isAllPlayerReady ? setIsAllUserReady(true) : setIsAllUserReady(false) ;
            getCreatedRoomMatchById(matchId);
            if(data.isHostReady){
                // start bonus spinner logic
                setBonusAmount(data.bonusAmount);
                setSpin(true);
                setShowWheel(true);
                //end  
                setTimeout(() => {
                    gameWindow = window.open(`http://battlelab.online/chessWebGL/?room=1&matchid=${matchId}&team1id=${data.teamOneID}&team2id=${data.teamTwoID}&currentplayerteamid=${teamId}&user1id=${data.userOneID}&user2id=${data.userTwoID}&accessToken=${getToken()}`
                        , '_blank', 'width=1600,height=1024,center=true,frame=true');
                        setShowWheel(false);
                        setMatchInProgressPopUp(true);
                }, 13000);
            }
        });

        socket.on("get_game_result", (data) => {
            if(data.win_team_id === teamId){
                setWinAmount(data.total_amount);
                setUserEarnAmount(data.userEarnAmount);
                setMatchInProgressPopUp(false);
                setWin(true);
            }
            if(data.lose_team_id === teamId){
                setLoseAmount(data.total_amount);
                setMatchInProgressPopUp(false);
                setLose(true);
            }
            setTimeout(() => {
                gameWindow.close();
            },1000);
            setTimeout( () => {
                socket.emit('leave_room',lobbyRoom); 
            },3000);
        });
    }, [socket]);

    const getCreatedRoomMatchById = (matchID: any) => {
        CustomGameAPI.getCreatedCustomRoomByMatchIDAPI(matchID)
            .then((res) => {
                if(res.data.success){
                    setGameParticipantPerTeam(res.data.match.Game.number_of_participant_per_team);
                    setState({
                        match: {
                            team_one_id: res.data.match.team_one_id,
                            team_two_id: res.data.match.team_two_id,
                            totalPlayer: res.data.match.total_players,
                            playerPerTeam: res.data.match.total_players / 2,
                            password: res.data.match.room_password,
                            roomName: res.data.match.room_name,
                            individualAmount: res.data.match.bet_amount,
                            individualblcAmount: res.data.match.bet_amount ,
                            roomAmount: res.data.match.total_amount / 2,
                            roomBLCAmount: (res.data.match.total_amount / 2) ,
                            Game: {
                                lobbyImageUrl: res.data.match.Game.lobby_image_url,
                                gameName: res.data.match.Game.name_en
                            },
                        },
                        teamOne: res.data.teamOne,
                        teamTwo: res.data.teamTwo
                    });
                }else{

                }
            })
            .catch(function (error) {
                console.log("error ", error);
            });
    }

    const leaveRoomHandler = async () => {
        const payload = {
            match_id: matchId,
        }

        CustomGameAPI.leaveCustomRoomAPI(payload)
        .then(res => {
            
            if(res.data.success){
                const socketData = {
                    custom_room_id: lobbyRoom,
                    isHostLeaved: res.data.isHostLeaved
                }
                socket.emit("leave_custom_game", socketData);
                socket.emit('leave_room',lobbyRoom);
                navigate(`/home`);
            }else{
                console.log(res.data.message);
            }
            }).catch(err => {
                console.log(err);
            });
    }

    const readyToPlayGameHandler = async () => {
        const payload = {
            match_id: matchId,
            status: isUserReady ? "NotReady" : "Ready"
        }
        CustomGameAPI.readyToCustomRoomGameAPI(payload)
        .then(res => {
            if(res.data.success){
                const socketData = {
                    custom_room_id: lobbyRoom,
                    isAllPlayerReady: res.data.isAllPlayerReady,
                    isHostReady: res.data.isHostReady,
                    bonusAmount: res.data.bonusAmount,
                    teamOneID: state.match.team_one_id,
                    teamTwoID: state.match.team_two_id,
                    userOneID: state.teamOne[0].User.id,
                    userTwoID: state.teamTwo[0].User.id
                }
                if(!isLoginAsHost){
                    setIsUserReady(!isUserReady);
                    getCreatedRoomMatchById(matchId);
                }
                socket.emit("ready_custom_game", socketData);
                if(res.data.isHostReady){
                    // bonus spinner logic
                        setBonusAmount(res.data.bonusAmount);
                        setSpin(true);
                        setShowWheel(true);
                        
                        setTimeout(() => {
                            gameWindow = window.open(`http://battlelab.online/chessWebGL/?room=0&matchid=${matchId}&team1id=${state.match.team_one_id}&team2id=${state.match.team_two_id}&currentplayerteamid=${teamId}&user1id=${state.teamOne[0].User.id}&user2id=${state.teamTwo[0].User.id}&accessToken=${getToken()}`
                            , '_blank', 'width=1600,height=1024,center=true,frame=true');
                            setShowWheel(false);
                            setMatchInProgressPopUp(true);
                        },15000);
                }
            }else{
                console.log(res.data.message);
            }
            }).catch(err => {
                console.log(err);
            });
    }

    const onUpdateBetAmountHandler = (updatedBetAmount: number) => {
        const payload = {
            matchID: matchId,
            betAmount: updatedBetAmount
        }
        CustomGameAPI.updateBetAmountAPI(payload)
        .then(res => {
            if(res.data.success){
                const socketData = {
                    custom_room_id: lobbyRoom,
                    updatedBetAmount: updatedBetAmount
                }
                socket.emit("set_update_customroom_bet_amount", socketData);
                getCreatedRoomMatchById(matchId);
            }else{
                console.log(res.data.message);
            }
            }).catch(err => {
                console.log(err);
            });
    }
    
    const Share = () => {
        return (
            <div className="  px-4 py-3 w-44 h-24 bg-primary-dark">
                <p className="font-white cursor-pointer normal-case text-base font-medium border-b-[2px] border-[#3C4042] mb-2 pb-3 text-left" style={{ color: "#fff" }}>Share to world</p>
                <p className="font-white  cursor-pointer normal-case text-base font-medium text-start text-left" style={{ color: "#fff" }}> Share to clan</p>

            </div>
        )
    }
    return (
        <div
            style={{
                height: "calc(100vh - 110px)",
            }}
            className="pt-6 px-12 overflow-y-auto scroll"
        >
            <div className="grid grid-cols-11  2xl:grid-cols-11  grid-rows-5 h-[1700px] xl:h-[750px]">
                <div className=" w-full h-full col-span-3 row-span-3 pb-4">
                    <img src={state.match.Game.lobbyImageUrl}  className="w-full h-full object-cover " />
                </div>
                <div className=" w-full h-full col-span-8  row-span-2 flex justify-start">
                    <RedCrad 
                        team={state.teamOne} 
                        teamID={state.match.team_one_id} 
                        gameParticipantPerTeam={gameParticipantPerTeam} 
                        betAmount={state.match.individualAmount} 
                        setIsLoginAsHost={setIsLoginAsHost} 
                        onUpdateBetAmount={onUpdateBetAmountHandler}
                    />
                    <div className="w-16 h-[280px] bg-gradient-to-b from-[#e40000] to-[#5c0000] flex flex-col justify-center items-center">
                        <p className="text-3xl text-center">T<br />e <br />a<br />m</p>
                        <p className="text-[43px] text-center font-black">1</p>
                    </div>
                </div>


                <div className=" w-full h-full  col-span-5  row-span-1 relative">
                    <div className="absolute w-full h-full flex justify-start items-center px-8 z-40">
                        <span className="h-[15px] border-y-2 border-primary-green" style={{
                            width: "calc(50% - 34px)",
                        }}></span>
                        <span className="h-[15px] w-[68px] flex justify-center items-center " >
                            <Sword className=" w-10 h-10" />

                        </span>
                        <span className="h-[15px] border-y-2 border-primary-green" style={{
                            width: "calc(50% - 34px)",
                        }}></span>
                    </div>
                    <div className="absolute w-full h-full flex justify-center items-center z-0">
                        <img src={BgHexagon} className="absolute w-24 h-24 object-contain" />
                    </div>
                    <div className="absolute w-full h-full flex justify-center items-center z-0">
                        <img src={Hexagon} className="absolute w-24 h-24 object-contain" />
                    </div>



                </div>



                <div className=" w-full h-full col-span-3 row-span-3 relative pt-4">
                    <img src={state.match.Game.lobbyImageUrl} className="w-full h-full object-cover brightness-[0.25] " />
                    <div className="absolute w-full h-full  top-4 left-0 right-0 p-6 text-[18px] flex flex-col gap-6">
                        <div className="flex gap-3">
                            <span>Room Name: </span><span className="font-bold ">{state.match.roomName} Room</span>
                        </div>
                        <div className="flex gap-3">
                            <span>Password: </span><span className="font-bold ">{state.match.password ? state.match.password : "None"}</span>
                        </div>
                        <div className="xl:flex block gap-3">
                            <span>Type: </span><span className="font-bold text-primary-sky">{state.match.playerPerTeam}vs{state.match.playerPerTeam} Matchmaking </span>
                        </div>
                        <div className="flex gap-3">
                            <span>Players: </span><span className="font-bold ">{state.match.totalPlayer}/{state.match.totalPlayer} </span>
                        </div>

                        <div className="xl:flex block gap-3">
                            <span>Individal: </span>
                            <div>
                                <p className="font-bold ">{state.match.individualAmount} USD/person</p>
                                <p className="font-bold text-base text-primary-green">= {state.match.individualblcAmount} BLC</p>
                            </div>
                        </div>
                        <div className="xl:flex block  gap-3">
                            <span>Room: </span>
                            <div>
                                <p className="font-bold ">{state.match.roomAmount} USD in total</p>
                                <p className="font-bold text-base text-primary-green">= {state.match.roomBLCAmount} BLC</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <Popover content={Share} trigger={"click"} placement="left" getPopupContainer={trigger => trigger} >
                                <div className="relative border-2 text-center border-primary-sky text-white text-xl cursor-pointer w-52 h-30 font-bold uppercase py-3 px-2 rounded-sm">
                                    share match
                                </div>
                            </Popover>
                        </div>
                    </div>
                </div>
                <div className=" w-full h-full col-span-8  row-span-2 flex items-end pt-6">

                    <div className="w-16 h-[280px] bg-gradient-to-b from-[#4785ad] to-[#1c364e] flex flex-col justify-center items-center">
                        <p className="text-3xl text-center">T<br />e <br />a<br />m</p>
                        <p className="text-[43px] text-center font-black">2</p>
                    </div>
                    <BlueCrad team={state.teamTwo} teamID={state.match.team_two_id} gameParticipantPerTeam={gameParticipantPerTeam} betAmount={state.match.individualAmount}/>
                </div>
            </div> 
            <div className="flex justify-between items-center mt-4">

                {/* Test win button */}
                {/* <button className=" border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44  rounded-sm"
                    onClick={() => setWin(true)}

                >
                    test win
                </button> */}

                {/* Test lose button */}
                {/* <button className="bg-primary-sky/30 border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44 rounded-sm"
                    onClick={() => setLose(true)}
                >
                    test lose
                </button> */}

                <Modal visible={win} footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 bg-transparent w-full h-auto flex items-center justify-center">
                    <WinCard win={win} setWin={setWin} rewardAmount={winAmount} userEarnAmount={userEarnAmount}/>
                </Modal>
                <Modal visible={lose} footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 bg-transparent w-full h-auto flex items-center justify-center">
                    <LoseCard lose={lose} setLose={setLose} loseAmount={loseAmount}/>
                </Modal>
                <Modal visible={showHostLeavePopup} centered footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
                <HostLeavePopup setShowPopup = {setShowHostLeavePopup} roomName={state.match.roomName} betAmount={state.match.individualAmount}/>
                </Modal>
                <Modal visible={changeAmountPopup} centered footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 bg-transparent w-full h-auto flex items-center justify-center">
                    <ChangeAmountAlert setChangeAmountPopup={setChangeAmountPopup} newBetAmount={updatedBetAmount}/>
                </Modal>
            </div>
            <div className="flex justify-between items-center mt-4">
                <button className=" border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44  rounded-sm"
                    onClick={() => leaveRoomHandler()}

                >
                    leave room
                </button>
                {isLoginAsHost ?
                    <button
                    disabled={isAllUserReady ? false : true} 
                    className={clsx("bg-primary-sky/30 border-2 border-primary-sky text-white text-xl mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44 rounded-sm",
                    !isAllUserReady ? "opacity-50 cursor-not-allowed" : "cursor-pointer")}
                    onClick={() => readyToPlayGameHandler()}
                    >
                       Start
                    </button> :
                    <button className="bg-primary-sky/30 border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44 rounded-sm"
                    onClick={() => readyToPlayGameHandler()}
                    >
                        {isUserReady ? "Not Ready" : "Ready"}
                    </button>
                }
                <Modal visible={ShowWheel} footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 bg-transparent w-full h-auto flex items-center justify-center">
                    <Wheelspin bonusAmount={bonusAmount} spin={spin}/>
                </Modal>
                <Modal visible={matchInProgressPopup} centered footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 bg-transparent w-full h-auto flex items-center justify-center">
                    <MatchInProgress matchInProgressPopup={matchInProgressPopup} gameName={state.match.Game.gameName}/>
                </Modal>
            </div>
        </div>
    )
}

export default MatachLobby;