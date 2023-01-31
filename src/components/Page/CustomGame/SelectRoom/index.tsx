import React, { useEffect, useReducer, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { Input, Modal } from "antd";
import clsx from "clsx";
import style from "./style.module.css";
import demo from "@Image/Matchmaking/demo.png";
import { useNavigate } from "react-router-dom";
import { Select } from "antd"
import "./style.css"
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/outline";
import LogoLoL from "@Image/Matchmaking/LogoLoL.png";
import dotaLogo from "@Image/Matchmaking/dotaLogo.jpg";
import EnterPassword from "./EnterPassword";
import { ReactComponent as Ping_good } from "@Image/CustomGame/ic_connection_good.svg";
import { ReactComponent as Ping_medium } from "@Image/CustomGame/ic_connection_medium.svg";
import { ReactComponent as Ping_weak } from "@Image/CustomGame/ic_connection_weak.svg";
import config from "@Config/app.config";
import CustomGameAPI from "@api/CustomGameAPI";
import PublicPopUp from "./PublicPopUp";
import { socket } from "@Utils/socket";
import AlertCustomGame from "./AlertCustomGame";
interface DataProps {
  icon: any;
  mode: string;
  name: string;
  amount: string;
  player: string;
  ping: number;
  type: string;
  status: string;
}

interface CardRoomProps {
  data: DataProps;
  index: number;
}



const SelectRoom = () => {

  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [activeData, setActiveData] = useState({ activePage: 1, totalPage: 1, limit: config.paginationPerPage, filter:"All"});
  const [ hasMoreData, setHasMoreData ] = useState(true);

  const [state, setState] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      matches: [],
    }
  );


  
  const Type = ({ item }: any) => {
    if (item === "" || item === null) {
      return <GlobeAltIcon className="w-9 h-9" />
    } else {
      return <LockIcon />
    }
  }


  const searchMatchLobby = (room_id: any) => {
    if (room_id != "") {
        socket.emit("search_match", room_id);
    }
  };
  
  useEffect(() => {
    searchMatchLobby("custom_game");
    getCustomCreatedRoomList(activeData)
  }, [])

  useEffect(() => {
    socket.on("get_created_room_list", (data) => {
      getCustomCreatedRoomList(activeData)
    });
  },[ socket])

  const getCustomCreatedRoomList = async (loadData: any) => {
    CustomGameAPI.getCustomCreatedRoomListAPI(loadData)
          .then(res => {
            if(res.data.success){
                activeData.totalPage = Math.ceil((res.data.matches.length) / activeData.limit);
                setActiveData({activePage:loadData.activePage, totalPage: activeData.totalPage,  limit: config.paginationPerPage, filter:activeData.filter, });
                setState(
                  { 
                    matches: res.data.matches,
                  })
            }else{
              setHasMoreData(false);
            }
          }).catch(err => {
            console.log(err)
          })
  }

  const LockIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 24 24"
      >
        <path
          className="fill-white w-7 h-7"
          d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"
        />
      </svg>

    )
  }

  const ChevronDown = () => {
    return (
      <ChevronDownIcon
        className={" text-white mb-1"}
      />
    );
  }

  const ColorCard = (status: string) => {
    if (status === "gold") {
      return "border-[#f9b401] shadow-[0px_0px_5px_2px_rgba(249,180,1,0.7)]"
    } else if (status === "silver") {
      return "border-[#b5b5b5] shadow-[0px_0px_5px_2px_rgba(181,181,181,0.7)]"
    } else {
      return "border-[#b46f1f] shadow-[0px_0px_5px_2px_rgba(180,111,31,0.7)]"
    }
  }
  

  const CardRoom = ({ data, index }: any) => {
    const [showPrivatePopUp, setShowPrivatePopUp] = useState(false);
    const [showPublicPopUp, setShowPublicPopUp] = useState(false);
    const [ showAlert, setShowAlert ] = useState(false);
    const [betAmount, setBetAmount] = useState(0);
    const [roomName, setRoomName] = useState('');
    const [roomPassword, setRoomPassword] = useState('');
    const [invalidPassMsg, setInValidPassMsg] = useState('');

    const mode = `${data.Game.player}vs${data.Game.player} Matchmaking`;
    const joinPlayer = data.MatchTeamOne.TeamParticipant.length + data.MatchTeamtwo.TeamParticipant.length
    const players = `${joinPlayer}/${data.Game.totalPlayer}`;
    //console.log(data)
    const Ping = () => {
      if (data.ping < 60) {
        return <Ping_good className="w-7 h-7" />
      } else if (data.ping < 100) {
        return <Ping_medium className="w-7 h-7" />
      } else {
        return <Ping_weak className="w-7 h-7" />
      }
    }

    const onClickOpenJoinConfiramation = (amount: any, rname: any, rpassword: string) => {
      setBetAmount(amount);
      setRoomName(rname);
      if(rpassword === '' || rpassword === null){
        setShowPublicPopUp(true);
      }else{
        setShowPrivatePopUp(true);
      }
    }

    const joinCustomRoomHandler = async () => {
      const payload = {
        match_id: data.id,
        password: roomPassword
      }
      CustomGameAPI.joinCustomRoomAPI(payload)
        .then((res) => {
            if(res.data.success){


              //console.log(res.data)
              const room_id = `match_lobby_${data.id}` ;
              searchMatchLobby(room_id);
              const socketData = {
                custom_room_id: room_id,
              }
              socket.emit("join_custom_room", socketData);
              navigate(`/customgame/roomhost`, { state: { id: data.id, teamID: res.data.teamID , lobbyRoom: room_id } })
            }else{
              if(res.data.isRoomyou){
                const room_id = `match_lobby_${data.id}` ;
               console.log(res.data)
               navigate(`/customgame/roomhost`, { state: { id: data.id, teamID: res.data.teamID , lobbyRoom: room_id } })
                //show alert popup
                setShowPublicPopUp(false);
                setShowPrivatePopUp(false);
                setShowAlert(true);
              }
              if(res.data.isRoomFilled){
                //const room_id = `match_lobby_${data.id}` ;
               // console.log(res.data.isRoomFilled)
               //navigate(`/customgame/roomhost`, { state: { id: data.id, teamID: res.data.teamID , lobbyRoom: room_id } })
                //show alert popup
                setShowPublicPopUp(false);
                setShowPrivatePopUp(false);
                setShowAlert(true);
              }
              if(res?.data?.status_code === 106){
                setInValidPassMsg("You have entered invalid room password.")
              }
            }
        })
        .catch(function (error) {
            console.log("error ", error);
        });
    }

    return (
      <div>
        <div className={clsx("grid grid-cols-11 w-full h-28 bg-[#2e2e2e] border-2 mt-2", ColorCard(data.status))} onClick = {() => {
          onClickOpenJoinConfiramation(data.bet_amount, data.room_name, data.room_password);
        }}>
          <div className="col-span-1 flex justify-start pl-6 items-center text-2xl font-bold text-primary-green">
            {index + 1}
          </div>
          <div className="col-span-2 flex justify-start items-center text-lg font-normal">
            {data.room_name} room
          </div>

          <div className="col-span-2 flex justify-start items-center text-lg font-normal">
            <div className="w-16 h-auto border-2 border-primary-sky rounded-md bg-black" >
              <img src={data.Game.game_icon} className="w-16 h-16 object-cover" />
            </div>
          </div>
          <div className="col-span-2 flex justify-start items-center text-lg font-normal">
            {mode}
          </div>
          <div className="col-span-2 flex justify-center items-center">
            <p className="text-primary-sky font-bold text-2xl">{data.bet_amount} USD</p>
          </div>
          <div className="col-span-1 flex justify-center items-center text-lg font-normal">
            {players}
          </div>

          <div className="col-span-1 flex justify-center items-center text-lg font-normal">
            <Type item={data.room_password} />
          </div>
          {/* <div className="col-span-1 flex justify-center items-center text-lg font-normal">
            {0}
          </div>
          <div className="col-span-1 flex justify-center items-center text-lg font-normal">
            <Ping/>
          </div> */}

        </div>
        <Modal visible={showPrivatePopUp} centered footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
        <EnterPassword 
          setShowPopup = {setShowPrivatePopUp} 
          roomName={roomName} betAmount={betAmount} 
          roomPassword={roomPassword} 
          setRoomPassword={setRoomPassword} 
          onConfirmHandler={joinCustomRoomHandler}
          invalidPassMsg={invalidPassMsg}
          setInValidPassMsg={setInValidPassMsg}
          />
        </Modal>
        <Modal visible={showPublicPopUp} centered footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
        <PublicPopUp setShowPopup = {setShowPublicPopUp} roomName={roomName} betAmount={betAmount} onConfirmHandler={joinCustomRoomHandler}/>
        </Modal>
        <Modal visible={showAlert} centered footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
        <AlertCustomGame setShowPopup={setShowAlert} roomName={roomName}/>
        </Modal>
      </div>
    )
  }



  return (
    <div>
      <div className="bg-[#0f181b] w-full h-full relative pt-6 mb-6 ">
        <div className="grid grid-cols-3 w-full h-16 px-8 xl:px-16">
          <div className="col-start-2 col-span-1 w-full text-white text-3xl font-bold flex items-center justify-center uppercase tracking-wide">custom game</div>
          <div className="col-span-1 w-full h-full pl-6">
            <Input
              bordered={false}
              prefix={<SearchIcon className="w-7 h-7" />}
              placeholder="Search chat"
              className={clsx(
                " text-white searchroom w-full h-full px-4  rounded-xl border-0 bg-gradient-to-r from-[#1c323f] to-[#121e26]"
              )}
            /></div>
        </div>
        <div className="grid grid-cols-9 w-full mt-4  pt-4 px-8 xl:px-16">
          <div className="col-span-3 w-full flex items-center justify-start">
            <p className="text-white font-bold uppercase ">filter by:</p>
            <Select defaultValue="All game" onChange={setSelected} suffixIcon={ChevronDown} className="xl:ml-6 text-white w-[200px] xl:w-[250px] font-bold selec"
            dropdownClassName = "rounded-none bg-[#2e2e2e] text-white">
              <Select.Option value="All game" className = "text-white hover:text-black">All game</Select.Option>
              <Select.Option value="Leauge of Lagends" className = "text-white hover:text-black">Leauge of Lagends</Select.Option>
              <Select.Option value="Dota 2" className = "text-white hover:text-black">Dota 2</Select.Option>
            </Select>
          </div>
          <div className="col-span-3 w-full flex items-center">
            <p className="text-white font-bold uppercase ">filter by:</p>
            <Select defaultValue="All room type" onChange={setSelected} suffixIcon={ChevronDown} className="xl:ml-6 text-white w-[200px] xl:w-[250px] font-bold selec"
            dropdownClassName = "rounded-none bg-[#2e2e2e] text-white">
              <Select.Option value="All room type" className = "text-white hover:text-black">All amounts<p className="text-primary-sky">($)</p></Select.Option>
              <Select.Option value="Leauge of Lagends" className = "text-white hover:text-black">Leauge of Lagends</Select.Option>
              <Select.Option value="Dota 2" className = "text-white hover:text-black">Dota 2</Select.Option>
            </Select>
          </div>
          <div className="col-span-3 w-full flex items-center justify-end">
            <p className="text-white font-bold uppercase ">filter by:</p>
            <Select defaultValue="All room type" onChange={setSelected} suffixIcon={ChevronDown} className="xl:ml-6 text-white w-[200px] xl:w-[250px] font-bold selec"
            dropdownClassName = "rounded-none bg-[#2e2e2e] text-white">
              <Select.Option value="All room type" className = "text-white hover:text-black">All room type</Select.Option>
              <Select.Option value="Leauge of Lagends" className = "text-white hover:text-black">Leauge of Lagends</Select.Option>
              <Select.Option value="Dota 2" className = "text-white hover:text-black">Dota 2</Select.Option>
            </Select>
          </div>
        </div>
        <div className="px-8 xl:px-16">
          <div className="grid grid-cols-11 bg-[#1a313e] w-full h-[60px] mt-4 font-semibold text-lg">
            <div className="col-span-1 items-center flex justify-start pl-6 ">No</div>
            <div className="col-span-2 items-center flex justify-start">Room Name</div>
            <div className="col-span-2 items-center flex justify-start">Game</div>
            <div className="col-span-2 items-center flex justify-start">Mode</div>
            <div className="col-span-2 items-center flex justify-center">Amount</div>
            <div className="col-span-1 items-center flex justify-center">Players</div>
            <div className="col-span-1 items-center flex justify-center">Type</div>
            {/* <div className="col-span-1 items-center flex justify-center">Ping</div>
            <div className="col-span-1 items-center flex justify-center">Latency</div> */}

          </div>
        </div>
        <div className="h-[calc(100vh-445px)] w-full overflow-y-auto scroll px-8 xl:px-16">
          {state.matches.map((match: any, index:any) => {
            return (
              <div key={`customroom_${match.room_name}`}>
                <CardRoom data={match} index={index} />
              </div>
            )
          })}
        </div>
        
        

        <div className="w-full h-[90px] mt-4  px-8 xl:px-16 flex items-start justify-end">
          <button className="border-2 border-primary-sky w-80 h-14 bg-primary-sky/30 uppercase font-bold text-lg flex items-center justify-center"
            onClick={() => {
              navigate(`/customgame/selectgame`)
            }}
          >
            create room
          </button>
        </div>

      </div>
    </div>
  );
};

export default SelectRoom;
