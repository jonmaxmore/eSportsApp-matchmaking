import React, { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowSmLeftIcon } from "@heroicons/react/outline";
import DemoWallpaper from "@Image/Matchmaking/wallpaperLoL.jpg";
import Single from "./Single";
import clsx from "clsx";
import GameAPI from "@api/MatchmakingAPI";
import UserAPI from "@api/UserAPI";
import MaxAPI from "@api/MaxAPI";
import { data } from "jquery";
import { socket } from "@Utils/socket";
import { Popover, Drawer, Modal } from "antd";
import SelectBetAmount from "../LobbyMyTeam/selectAmount";
import { useSearchMatchDispatch } from "@Context/SearchMatch";
import config from "@Config/app.config";
import CreateTeam from "./CreateTeam";
import "antd/dist/antd.css";
import ModalUpdatenow from './Install';
//import clsx from "clsx";
import ModalLinkGame from "./Linksteam";


const SelectAmount = () => {
  const navigate = useNavigate();
  const [selectSingle, setSelectSingle] = useState(false);
  const [selectCreateTeam, setSelectCreateTeam] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [showPopupSteam, setShowPopupSteam] = useState(false);
  const [amount, setAmount] = useState(0);
  const [userid, setUserid] = useState("");
  const context = useSearchMatchDispatch();
  const apiURL:any = config.apiURL;

  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      name: "",
      player: "",
      coverImageUrl: "",
      gameImageURL: ""
    }
  );
  const location = useLocation()
  const game: any = location.state
  const gameId = game.id;

  console.log(gameId);
  useEffect(() => {
    const id = setInterval(() => {
      MaxAPI.chackLoginStram()
      .then((res) => {

       
        if (res.data.success) {
         console.log(res.data);
          if(res.data.steam){
           // console.log(res.data);
           setShowPopupSteam(false);

          if(gameId == 4){
            if(res.data.steam.linked_game_username == null  ){
              //  console.log("test");
              setShowPopup(true)
              }else{
                setShowPopup(false)
              }
          }

          }else{

            if(gameId == 4) {
              setShowPopupSteam(true);
              if(res.data.steam.linked_game_username == null){
                //  console.log("test");
                setShowPopup(true)
                }else{
                  setShowPopup(false)
                }
            }
           
           // console.log(res.data);
          }
         

          //setGames(res.data.games);
          // setImggames(res.data.img);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      })

    }, 1500);
    return () => clearInterval(id);
}, []);



  // useEffect(() => {
  //   maxtest();
  // }, []);

  // const maxtest = () => {
  //   MaxAPI.tEstapi()
  //     .then((res) => {
  //      // console.log(res.data);
        
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    UserAPI.getUserDetail()
      .then((res) => {
        if (res.data.success) {
        //  console.log(res.data);
        setUserid(res.data.user.id)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
  useEffect(() => {
    getGameDetails(gameId)
  }, [])

  const getGameDetails = (id: number) => {
    GameAPI.getGameDetailsAndBetAmountByID(id)
      .then(res => {

        if (res.data.success) {
          setState({
            name: res.data.game.name_en,
            player: res.data.game.number_of_participant_per_team,
            coverImageUrl: res.data.game.cover_image_url,
            gameImageURL: res.data.game.game_image_url
          })
        } else {
          console.log(res.data.message);

        }
      }).catch(err => {
        console.log(err)
      })
  }

  const searchTeam = (team_room_id: any) => {
    if (team_room_id != "") {
        socket.emit("search_team", team_room_id);
    }
  };

  const SingleorTeam = () => {
    return (
      <div className={clsx(selectSingle || selectCreateTeam ? "hidden" : "")} >
        <p className="text-primary-sky text-xl font-bold mb-2 mt-12 text-center">{state.name}</p>
        <p className="text-white text-xl mb-16 text-center">{state.player}vs{state.player} Matchmaking</p>
        <div className="flex flex-col gap-10">
          {/* <button
            className="bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
            onClick={() => setSelectSingle(true)}
          >
            single(search party)
          </button> */}
          
          {state.name != "Chess" && <button
            className=" w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
            onClick={() => {setSelectCreateTeam(true)}}
          >
            CREATE TEAM
          </button>}


          {state.name == "csgo" && <button
            className="bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
            onClick={() => setSelectSingle(true)}
          >
            single(search party)
          </button>}
          {state.name == "Chess" && <button
            className="bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
            onClick={() => setSelectSingle(true)}
          >
            single(search party)
          </button>}
          {/* <Modal visible={showPopup} footer={null} title={null} centered closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
              <SelectBetAmount SetShowPopup={setShowPopup} amount={amount} setAmount={setAmount} dollarToBLC={dollarToBLC} setDollarToBLC={setDollarToBLC} updateBetAmountHandler={onCreatTeam}/>
          </Modal> */}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0e1619] h-full">
      <div>
        <div className="bg-[#0e1619] w-full h-full relative pt-6 mb-6">
          <h1 className="uppercase text-white font-bold text-[25px] text-center">
            {selectSingle ? "Select the amount" : "select mode"}
          </h1>
          <p className="text-center mt-5">
            {selectSingle || selectCreateTeam ? "Select the amount of BLC you would like to bet for the game" :
              "Select the type of match and how you would like to play"}

          </p>
          <div
            className="flex items-center justify-center cursor-pointer top-6 left-6 w-36 h-14 border-2 absolute border-primary-sky"
            onClick={() => navigate(`/matchmaking/selectgame`)}
          >
            <ArrowSmLeftIcon className="w-10" />
            <p className="uppercase font-bold ">back</p>
          </div>
        </div>


        <div
          style={{
            height: "calc(100vh - 230px)",
          }}
          className="flex flex-col items-center justify-start w-full p-6 overflow-y-auto">
          <img src={state.coverImageUrl} className="w-full h-[200px] tall:h-[300px] object-cover" />
          <SingleorTeam />
          <div className={clsx(selectSingle ? "" : "hidden", "mt-10")}>
            <Single gameId={gameId} />
          </div>
          <div className={clsx(selectCreateTeam ? "" : "hidden", "mt-10")}>
            <CreateTeam gameId={gameId} />
          </div>

        </div>
        <ModalLinkGame
          visible={showPopupSteam}
          setVisible={setShowPopupSteam}
          linkGame={userid}
          position={null}
          onSubmit={null}
        />
         <ModalUpdatenow
          visible={showPopup}
          setVisible={setShowPopup}
          linkGame={userid}
          position={null}
          onSubmit={null}
        />
      </div>
    </div>
  );
};
export default SelectAmount;
