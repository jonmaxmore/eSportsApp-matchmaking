// import {Layout, Menu } from 'antd';
import { Outlet } from "react-router-dom";
import BG from '@Image/bg.png';
import SideMenu from "./SideMenu"
import FriendMenu from "./FriendMenu"
import Navbar from "./Navbar"
import News from "@Views/pages/News";
import Ranking from "@Views/pages/Ranking";
import Faq from "@Views/pages/Faq";
import Update from '@Views/pages/Update';
import Contact from '@Views/pages/Contact';
import About from '@Views/pages/About';
import Setting from '@Views/pages/Setting';
import Clan from '@Views/pages/Clan';
import React, { useEffect, useState } from 'react';
import { ChatAlt2Icon } from "@heroicons/react/solid"
import clsx from 'clsx';
import Style from './style.module.css';
import { Modal, Badge} from "antd";
import Chat from "@Components/Modal/Chat";
import ClanCreate from '@Views/pages/Clan/ClanCreate';
import ClanMember from '@Views/pages/Clan/ClanMember';
import ClanEdit from '@Views/pages/Clan/ClanEdit';
import { socket } from "@Utils/socket";
import MessageAPI from '@api/MessageAPI';


type Props = {};

const DefaultLayout = (props: Props) => {
  const [ recUserName, setRecUserName ] = useState("");
  const [ msg, setMsg ] = useState("");
  const [ msgCount, setMsgCount ] = useState(0);
  const [ isMatchInvitation, setIsMatchInvitation ] = useState(false);
  const [ActiveSub , setActiveSub] = useState(false)
  const [ActiveSide, setActiveSide] = useState('');
  const [Chatpopup, setChatpopup] = useState(false);
  const [messageFriendList, setMessageFriendList] = React.useState([] as any);

  useEffect(() => {
      socket.on("receive_message", (data) => {
        setMsgCount(msgCount + 1);
        setIsMatchInvitation(data.messageData.team_id !== null ? true : false)
        setMsg(data.messageData.message);
        setRecUserName(data.messageData.User.avatar_unique_name);
      });
  }, [socket, msgCount]);

  

  useEffect(() => {
      getMessageFriendList();
      getUnReadMessages();
  }, []);

  const getMessageFriendList = () => {
      const data = {
          chatType: "World"
      }
      MessageAPI.fetchMessageFriendList(data)
          .then(res => {

            // console.log(res.data)
              if(res.data.success){
                  setMessageFriendList(res.data.friends);
              }
          })
  }

  const getUnReadMessages = () => {
    MessageAPI.fetchUnReadMessagesAPI()
    .then(res => {
      if(res.data.success){
          // console.log(res.data)
          setMsgCount(res.data.unReadMessageCount);
          if(res.data.lastMessage){
            setMsg(res.data.lastMessage.message);
            setIsMatchInvitation(res.data.lastMessage.team_id !== null ? true : false)
            setRecUserName(res.data.lastMessage.User.avatar_unique_name);
          }
      }
    }).catch(err => console.log(err))
  }

  const joinRoom = (room: any) => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  joinRoom("World");






  // useEffect(() => {
  //   const id = setInterval(() => {
      
      
  
  //   }, 1500);
  //   return () => clearInterval(id);
  // }, []);

  

  const SubContent = () => {
    if (ActiveSide === 'news') {
      setActiveSub(false)
      return <News ActivePop={value => setActiveSide(value)} />
    }
    else if (ActiveSide === 'ranking') {
      setActiveSub(false)
      return <Ranking ActivePop={value => setActiveSide(value)} />
    }
    else if (ActiveSide === 'faq') {
      setActiveSub(true)
      return <Faq ActivePop={value => setActiveSide(value)}/>
    }
    else if (ActiveSide === 'update') {
      setActiveSub(true)
      return <Update ActivePop={value => setActiveSide(value)}/>
    }
    else if (ActiveSide === 'contact') {
      setActiveSub(true)
      return <Contact ActivePop={value => setActiveSide(value)}/>
    }
    else if (ActiveSide === 'about') {
      setActiveSub(true)
      return <About ActivePop={value => setActiveSide(value)}/>
    }
    else if (ActiveSide === 'setting') {
      return <Setting ActivePop={value => setActiveSide(value)}/>
    }
    else if (ActiveSide === 'clan') {
      return <Clan ActivePop={value => setActiveSide(value)}/>
    }
    else if (ActiveSide === 'clan_create') {
      return <ClanCreate ActivePop={value => setActiveSide(value)}/>
    }
    else if (ActiveSide === 'clan_member') {
      return <ClanMember ActivePop={value => setActiveSide(value)}/>
    }
    else if (ActiveSide === 'clan_edit') {
      return <ClanEdit ActivePop={value => setActiveSide(value)}/>
    }
    else {
      // setActiveSub(false)
      return <div></div>
    }
  }


  const halfMessageShow = (message: any) => {
    if (message && message.length > 8) {
      return message.substring(0, 10) + '...';
    } else {
      return message;
    }
  };


  return (

    <div style={{
      backgroundImage: `url(${BG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }} className="grid grid-cols-[auto_fit-content(350px)] overflow-hidden grid-flow-col h-screen w-screen ">
      <div className="w-full h-full grid grid-rows-[fit-content(90px)_auto] ">

        {/* Navbar */}
        <div className="bg-black w-full h-24 text-white">
          <Navbar ActivePop={value => setActiveSide(value)}/>
        </div>


        <div className="grid grid-cols-[fit-content(80px)_auto] grid-flow-col  h-full w-full">
          {/* side menu */}
          <div className="w-[100px] h-full bg-primary-dark/20 backdrop-blur-sm" >
            <SideMenu ActivePop={value => setActiveSide(value)} Pop={ActiveSide} ActiveSub = {ActiveSub}/>
          </div>
          {/* center section */}
          <div className={clsx(" backdrop-blur-lg bg-blend-darken pt-5 pr-4 pl-4 wide:pr-12 wide:pl-12 h-full w-full relative ",ActiveSide === '' ? "" : "bg-primary-sky/20")}>


            {/* Chat Popup */}
            {/* textShadow */}

            <div className={clsx("absolute min-w-[220px] w-auto h-12 bottom-8  bg-primary-dark z-[999] flex items-center -left-1  px-2 cursor-pointer duration-500 ", Chatpopup ? "opacity-0" : "opacity-100")}
              onClick={() => {
                setChatpopup(true) 
                setMsgCount(0)
                setMsg("")
                setRecUserName("")}}
              >
              <Badge count={msgCount} color={"#ff3200"} >
                <ChatAlt2Icon className={clsx('w-9 h-9 text-primary-sky ', Style.chatShadow)} />
              </Badge>
              {recUserName !== "" && <p className={clsx("text-white ml-6 font-semibold")}> {recUserName}:</p>}
              {msg !== "" ? <p className={clsx("text-white ml-2")}>  {isMatchInvitation ? halfMessageShow('Match Invitation') :halfMessageShow(msg)}</p> : <p className={clsx("text-white ml-2")}> No message </p>}
            </div>
            

            

            <div className="w-full h-full text-white" >

              <SubContent />

              {/* Sub Content */}

              <div className={clsx(ActiveSide === '' ? "hidden" : "")}>
                <SubContent />
              </div>

              {/* Main Content */}
              <div className={clsx(ActiveSide === '' ? "" : "hidden")}>
                <Outlet />
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Friend list */}
      <div className="h-full wide:max-w-[350px] min-w-[300px] bg-primary-dark mb-8">
        <FriendMenu setChatpopup={setChatpopup} Chatpopup={Chatpopup}/>
      </div>
      <Modal visible={Chatpopup} footer={null} title={null} closable={false} bodyStyle={{ padding: "0px", margin: "0px" }} className="p-0 m-0  w-auto h-auto flex items-center justify-center "
        style={{
          top: "calc(100vh - 640px)",
          left: "15%",
        }}
      >
        <Chat setChatpopup={setChatpopup} />
      </Modal>

    </div>
  )
};

export default DefaultLayout;