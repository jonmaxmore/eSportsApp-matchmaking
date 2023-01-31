import React, { useEffect, useState } from "react";
import "./style.css"
import CornerLeft2 from "@Image/cornerLeft.svg"
import { ReactComponent as CornerLeft } from "@Image/cornerLeft.svg"
import { ReactComponent as CornerRight } from "@Image/cornerRight.svg"
import { Popover } from "antd"
import Picker from 'emoji-picker-react'
import { EmojiHappyIcon } from "@heroicons/react/outline";
import blueLol from "@Image/Matchmaking/bluelol.jpg"
import LoLbanner from "@Image/lolbanner.png"
import { useSearchMatchDispatch } from "@Context/SearchMatch";
import MessageAPI from "@api/MessageAPI";
import { getUserID } from "../../../Token";
import { socket } from "@Utils/socket";
import moment from "moment";


const Match = (props: any ) => {
  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState([] as any);

  const context = useSearchMatchDispatch();
  const item = context.items;
  var chatGroupName = item.team_room_id;

  useEffect(() => {
    socket.on("receive_message", (data) => {
        setMessageList((list: any) => [...list, data.messageData]);
    });
}, [socket]);

  useEffect(() => {
    const data = {
      chatType: chatGroupName
    }
    MessageAPI.fetchMessage(data)
      .then(res => {
        setMessageList(res.data.messages)
      })
  }, [chatGroupName]);

  console.log("messageList", messageList);
  
  
  const onEmojiClick = (event: any, emojiObject: any) => {
    setText(text + emojiObject.emoji)
  };

  const joinRoom = (room: any) => {
    if (room !== "") {
        socket.emit("join_room", room);
    }
  };
  joinRoom(chatGroupName);

  const onSend = async () => {
    const data = {
        message: text,
        chat_group_name: chatGroupName,
        in_for: "Match",
        group_type: "Group",
        time: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    MessageAPI.sendMessage(data)
        .then(res => {

            // socket.emit("send_message", JSON.stringify(res.data.messageData));
            let data = {
                chat_group_name: chatGroupName,
                messageData: res.data.messageData
            }
            socket.emit("send_message", data);
            setText("");
            setMessageList((list: any) => [...list, res.data.messageData]);
        });
};

  const card = (
    <div className="w-[450px] h-[120px] bg-red-300 relative">
      <img src={blueLol} className="absolute w-full h-full object-cover brightness-[0.25]" />
      <div className="flex justify-between items-end absolute w-full h-full p-4">
        <div>
          <p className="font-bold text-2xl mb-1.5">5vs5 Matchmaking</p>
          <div className="xl:flex block gap-3 mb-1">
            <span>Individal: </span>
            <div>
              <span className="font-bold ">25 $ </span><span className="font-bold ">in total</span>
              <p className="font-bold text-sm text-primary-green tracking-tight">= 312.5 BLC</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className = "font-semibold">Player: </span><span className="font-bold ">1/10</span>
          </div>
        </div>
        <div className = "flex flex-col justify-end items-end">
          <img src={LoLbanner} className="w-32 h-auto object-cover" />
          <button className="w-36 cursor-pointer h-10 bg-primary-sky/30 uppercase font-bold text-xs border-2 border-primary-sky">
            Join game
          </button>

        </div>
      </div>

    </div>
  )
  
  const onEnterKeyPressHandler = (e:any) => {
    if(e.key === "Enter" || e.key.charCode === 13){
        onSend()
    }
  }

  const styles = require("@chatscope/chat-ui-kit-styles/dist/default/styles.min.css");
  const chats = require("@chatscope/chat-ui-kit-react/");
  return (
    <div style={{ position: "relative", height: "570px" }}>

      <chats.MainContainer className="">
        <chats.ChatContainer className="">
          <chats.MessageList className="p-[20px_25px_10px_25px]" scrollBehavior={"smooth"}>
            {messageList.map((message: any, index: any) => {
               if (getUserID() == message.user_id && message.type == "CreateMatch") {
                return (
                  <div className="relative">
                    <div className="text-[#8F8F8F] flex justify-center"><p className="font-bold mr-1">You</p>created the match</div>
                  </div>
                )
               }else if(getUserID() != message.user_id && message.type == "CreateMatch"){
                return(
                  <div className="relative">
                    <div className="text-[#8F8F8F] flex justify-center"><p className="font-bold mr-1">{message.User.avatar_unique_name}</p>created the match</div>
                  </div>
                )
               }else if (getUserID() == message.user_id && message.type == "JoinMatch") {
                return (
                  <div className="relative">
                    <div className="text-[#8F8F8F] flex justify-center"><p className="font-bold mr-1">You</p>joined the match</div>
                  </div>
                )
               }else if(getUserID() != message.user_id && message.type == "JoinMatch"){
                return(
                  <div className="relative">
                    <div className="text-[#8F8F8F] flex justify-center"><p className="font-bold mr-1">{message.User.avatar_unique_name}</p>joined your match</div>
                  </div>
                )
               }else if (getUserID() == message.user_id && message.type == "LeftMatch") {
                return (
                  <div className="relative">
                    <div className="text-[#8F8F8F] flex justify-center"><p className="font-bold mr-1">You</p>Left the match</div>
                  </div>
                )
               }else if(getUserID() != message.user_id && message.type == "LeftMatch"){
                return(
                  <div className="relative">
                    <div className="text-[#8F8F8F] flex justify-center"><p className="font-bold mr-1">{message.User.avatar_unique_name}</p>Left your match</div>
                  </div>
                )
               }

               if (getUserID() == message.user_id) {

                return (
                    <div key={index} className="relative">
                        <chats.Message
                            model={{
                                message: message.message,
                                sentTime: moment(message.created_at).fromNow(),
                                sender: message.User.avatar_unique_name,
                                // direction: "ingoing",
                                direction: "outgoing",
                                position: "single"
                            }}
                            className="ChatSide1 relative"

                        >
                            <chats.Message.Header sender={message.User.avatar_unique_name} sentTime={moment(message.created_at).fromNow()} className="Chatheader outgoingChat" />
                        </chats.Message>
                        <CornerLeft className="absolute -bottom-4 left-0 w-5 h-5 fill-[#202223]" />
                    </div>
                )
            } else {
                return (
                    <div key={index} className="relative">
                        <chats.Message
                            model={{
                                message: message.message,
                                sentTime: moment(message.created_at).fromNow(),
                                sender: message.User.avatar_unique_name,
                                direction: "ingoing",
                            }}
                            className="ChatSide1 relative"

                        >
                            <chats.Message.Header sender={message.User.avatar_unique_name} sentTime={moment(message.created_at).fromNow()} className="Chatheader " />

                        </chats.Message>
                        <CornerLeft className="absolute -bottom-4 left-0 w-5 h-5 fill-[#202223]" />
                    </div>
                )
            }
              
              
            })}
            

            {/* <div className="relative">
              <chats.Message model={{
                message: "Hello my friend werq2erawefqwefasdfawef",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "outgoing",
                position: "single"
              }} >
                <chats.Message.Header sender="Zoe" sentTime="just now" className="Chatheader outgoingChat" />
              </chats.Message>
              <CornerRight className="absolute -bottom-4 right-0 w-5 h-5 fill-[#1c2f39]" />
            </div>

            <div className="relative">
              <chats.Message model={{
                message: "Hello my friend werqwefqwefwDFwed",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "outgoing",
                position: "single"
              }} >
                <chats.Message.Header sender="Zoe" sentTime="just now" className="Chatheader outgoingChat" />
              </chats.Message>
              <CornerRight className="absolute -bottom-4 right-0 w-5 h-5 fill-[#1c2f39]" />
            </div>




            <div className="relative">
              <chats.Message
                model={{
                  message: "Hello my friend 😊/n rtret werqwer  2tqegqwegdgwef  w2efDF  WEFWFSDFSSDFGHRTH",
                  sentTime: "just now",
                  sender: "Joe",
                  direction: "ingoing",
                }}
                className="ChatSide1 relative"

              >
                <chats.Message.Header sender="Emily" sentTime="just now" className="Chatheader " />
              </chats.Message>
              <CornerLeft className="absolute -bottom-4 left-0 w-5 h-5 fill-[#202223]" />
            </div>

            <div className="relative">
              <chats.Message model={{
                message: "Hello my friend werqwefqwefwDFwed",
                sentTime: "15 mins ago",
                sender: "Zoe",
                direction: "outgoing",
                position: "single"
              }} >
                <chats.Message.CustomContent children={card} />
                <chats.Message.Header sender="Zoe" sentTime="just now" className="Chatheader outgoingChat" />
              </chats.Message>
              <CornerRight className="absolute -bottom-4 right-0 w-5 h-5 fill-[#1c2f39]" />
            </div>

            <div className="relative">
              <chats.Message
                model={{
                  message: "Hello my friend 😊/n rtret werqwer  2tqegqwegdgwef  w2efDF  WEFWFSDFSSDFGHRTH",
                  sentTime: "just now",
                  sender: "Joe",
                  direction: "ingoing",
                }}
                className="ChatSide1 relative"

              >
                <chats.Message.CustomContent children={card} />
                <chats.Message.Header sender="Emily" sentTime="just now" className="Chatheader " />
              </chats.Message>
              <CornerLeft className="absolute -bottom-4 left-0 w-5 h-5 fill-[#202223]" />
            </div>

            <div className="relative">
              <chats.Message
                model={{
                  message: "Hello my friend 😊/n rtret werqwer  2tqegqwegdgwef  w2efDF  WEFWFSDFSSDFGHRTH",
                  sentTime: "just now",
                  sender: "Joe",
                  direction: "ingoing",
                }}
                className="ChatSide1 relative"

              >
                <chats.Message.Header sender="Emily" sentTime="just now" className="Chatheader " />
              </chats.Message>
              <CornerLeft className="absolute -bottom-4 left-0 w-5 h-5 fill-[#202223]" />
            </div> */}



          </chats.MessageList>
          {chatGroupName != "" && <chats.MessageInput 
                placeholder="Type message here..." 
                attachButton={false} 
                sendButton={false} 
                value={text} 
                onChange={(item: string) => setText(item)}
                onKeyPress= { (event:any) => { onEnterKeyPressHandler(event)}}
                onSend={() => { setText("") }}
          />}
        </chats.ChatContainer>

      </chats.MainContainer>
      {chatGroupName != "" && <div className="absolute bottom-0 right-0 h-[60px] bg-[#05080a] w-[200px] px-2 flex items-center z-[999]">
        <Popover content={<Picker onEmojiClick={onEmojiClick} />} trigger={"click"} className="mr-6 cursor-pointer" getPopupContainer={trigger => trigger}>
          <div className="relative">
          <EmojiHappyIcon className="w-8 text-white cursor-pointer" />
          </div>
        </Popover>
        <button className="border-2 border-primary-sky bg-primary-sky/30 px-5 py-3 text-white uppercase font-bold text-sm"
          onClick={onSend}>
          SEND MASSAGE
        </button>
      </div>}
    </div>
  );
}

export default Match;