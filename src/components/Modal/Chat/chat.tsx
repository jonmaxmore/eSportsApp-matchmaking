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
import MessageAPI from "@api/MessageAPI";
import { socket } from "@Utils/socket";
import moment from "moment";
import { getUserID } from "../../../Token";
import GameAPI from "@api/MatchmakingAPI";
import { useSearchMatchDispatch } from "@Context/SearchMatch";
import { useNavigate } from "react-router-dom";

const Card = (props: any) => {
  const team = props.message.Team;
  const game = props.message.Team.Game;
  const vs = `${game.number_of_participant_per_team}Vs${game.number_of_participant_per_team}`;
  const context = useSearchMatchDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [playerCount, setPlayerCount] = useState(0);

  GameAPI.getJoinTeamPlayerCount(team.id)
    .then(res => {
      if (res.data.success) {
        setPlayerCount(res.data.playerCount)
      }
    }).catch(err => {
      console.log(err)
    })

  const joinMatchHandler = () => {
    const teamId = team.id;
    const postData = {
      team_id: teamId,
      game_id: game.id,
      bet_amount: team.individual_amount,
      from_user_id: props.fromUserId
    }
    const searchTeam = (team_room_id: any) => {
      if (team_room_id != "") {
        socket.emit("search_team", team_room_id);
      }
    };

    GameAPI.joinMatch(postData)
      .then(res => {
        if (res.data.success) {
          // socket.connect();
          const team_room_id = "team_room_" + teamId;
          searchTeam(team_room_id);
          // add data to context
          const contextData = {
            team_id: teamId,
            team_room_id: team_room_id,
            is_team_fulfilled: false,
            betAmount: team.individual_amount,
            amountToBlc: team.individual_amount ,
            game_id: game.id,
            gameName: game.name_en,
            imageUrl: game.game_image_url,
            gameIcon: game.game_icon,
            numberOfPlayerPerTeam: game.number_of_participant_per_team
          }
          context._addSearchMatchDetails(contextData);
          // end
          const data = {
            team_room_id: team_room_id,
          }
          socket.emit("set_join_game_participant", data);
          props.setChatpopup(false);
          navigate("/matchmaking/lobbymyteam", { state: { team_id: teamId, team_room_id: team_room_id } });
        } else {
          setMessage(res.data.message);
        }
      }).catch(err => {
        console.log(err)
      })
  }
  return (
    <>
      <div className="w-[450px] h-[120px] bg-red-300 relative">
        <img src={game.cover_image_url} className="absolute w-full h-full object-cover brightness-[0.25]" />
        <div className="flex justify-between items-end absolute w-full h-full p-4">
          <div>
            <p className="font-bold text-2xl mb-1.5">{vs} Matchmaking</p>
            <div className="xl:flex block gap-3 mb-1">
              <span>Individal: </span>
              <div>
                <span className="font-bold ">{team.team_amount}$ </span><span className="font-bold ">in total</span>
                <p className="font-bold text-sm text-primary-green tracking-tight">= {parseInt(team.team_amount) } BLC</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold">Player: </span><span className="font-bold ">{playerCount}/{game.number_of_participant_per_team}</span>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end">
            <img src={game.game_image_url} className="w-32 h-auto object-cover" />
            {getUserID() != props.message.user_id && <button className="w-36 cursor-pointer h-10 bg-primary-sky/30 uppercase font-bold text-xs border-2 border-primary-sky" onClick={joinMatchHandler}>
              Join game
            </button>}
          </div>
        </div>
      </div>
      {<p className="text-primary-green font-bold">{message}</p>}
    </>
  )
}

const CardExpired = (props: any) => {

  const team = props.message.Team;
  const game = props.message.Team.Game;
  const vs = `${game.number_of_participant_per_team}Vs${game.number_of_participant_per_team}`;

  return (
    <>
      <div className="w-[450px] h-[120px] bg-red-300 relative">
        <img src={game.cover_image_url} className="absolute w-full h-full object-cover brightness-[0.25]" />
        <div className="flex justify-between items-end absolute w-full h-full p-4">
          <div>
            <p className="font-bold text-2xl mb-1.5">{vs} Matchmaking</p>
            <div className="xl:flex block gap-3 mb-1">
              <span>Individal: </span>
              <div>
                <span className="font-bold ">{team.team_amount} $ </span><span className="font-bold ">in total</span>
                <p className="font-bold text-sm text-primary-green tracking-tight">= {parseInt(team.team_amount) } BLC</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold">Player: </span><span className="font-bold ">1/10</span>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end">
            <img src={game.game_image_url} className="w-32 h-auto object-cover" />
            <button className="w-36 cursor-pointer h-10 bg-primary-sky/30 uppercase font-bold text-xs border-2 border-primary-sky">
              Join game
            </button>

          </div>
        </div>
        <div className="absolute w-full h-full bg-black/80 flex justify-center items-center font-bold">
          This sesion is expired
        </div>
      </div>
    </>
  )

}

const Chat = (props: any) => {
  const [text, setText] = useState("")
  const [messageList, setMessageList] = useState([] as any);

  useEffect(() => {
    const data = {
      chatType: props.chatType
    }
    MessageAPI.fetchMessage(data)
      .then(res => {
        setMessageList(res.data.messages)
      })
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list: any) => [...list, data.messageData]);
    });
  }, [socket]);

  const onEmojiClick = (event: any, emojiObject: any) => {
    setText(text + emojiObject.emoji)
  };

  const joinRoom = (room: any) => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  joinRoom(props.chatType);

  const onSend = async () => {
    const data = {
      message: text,
      chat_group_name: props.chatType,
      in_for: props.chatType,
      group_type: "Group",
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    MessageAPI.sendMessage(data)
      .then(res => {

        // socket.emit("send_message", JSON.stringify(res.data.messageData));
        let data = {
          chat_group_name: props.chatType,
          messageData: res.data.messageData
        }
        socket.emit("send_message", data);
        setText("");
        setMessageList((list: any) => [...list, res.data.messageData]);
      })
  };

  const onEnterKeyPressHandler = (e: any) => {
    if (e.key === "Enter" || e.key.charCode === 13) {
      onSend()
    }
  }

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
            <span className="font-semibold">Player: </span><span className="font-bold ">1/10</span>
          </div>
        </div>
        <div className="flex flex-col justify-end items-end">
          <img src={LoLbanner} className="w-32 h-auto object-cover" />
          <button className="w-36 cursor-pointer h-10 bg-primary-sky/30 uppercase font-bold text-xs border-2 border-primary-sky">
            Join game
          </button>

        </div>
      </div>
    </div>
  )

  const styles = require("@chatscope/chat-ui-kit-styles/dist/default/styles.min.css");
  const chats = require("@chatscope/chat-ui-kit-react/");
  return (
    <div style={{ position: "relative", height: "570px" }}>

      <chats.MainContainer className="">
        <chats.ChatContainer className="">
          <chats.MessageList className="p-[20px_25px_10px_25px]" scrollBehavior={"smooth"}>
            {/* <div className="text-[#8F8F8F] flex justify-center"><p className="font-bold mr-1">Player 1</p>Come online</div>
            <div className="text-[#8F8F8F] flex justify-center"><p className="font-bold mr-1">Player 1</p>Come online</div> */}

            {
              messageList.map((message: any, index: any) => {

                if (message.team_id != null) {
                  if (getUserID() == message.user_id) {
                    if (message.Team.status == "Playing" || message.Team.status == "Played") {
                      //expired card
                      return (
                        <div className="relative">
                          <chats.Message model={{
                            // message: "Hello my friend werqwefqwefwDFwed",
                            sentTime: moment(message.created_at).fromNow(),
                            sender: message.User.avatar_unique_name,
                            direction: "outgoing",
                            position: "single"
                          }} >
                            <chats.Message.CustomContent children={<CardExpired message={message} setChatpopup={props.setChatpopup} />} />
                            <chats.Message.Header sender={message.User.avatar_unique_name} sentTime={moment(message.created_at).fromNow()} className="Chatheader outgoingChat" />
                          </chats.Message>
                          <CornerRight className="absolute -bottom-4 right-0 w-5 h-5 fill-[#1c2f39]" />
                        </div>
                      )
                    } else {
                      return (
                        <div className="relative">
                          <chats.Message
                            model={{
                              // message: message.message,
                              sentTime: moment(message.created_at).fromNow(),
                              sender: message.User.avatar_unique_name,
                              direction: "outgoing",
                              position: "single"
                            }}
                            className="ChatSide1 relative"

                          >
                            <chats.Message.CustomContent children={<Card message={message} fromUserId={message.user_id} setChatpopup={props.setChatpopup} />} />
                            <chats.Message.Header sender={message.User.avatar_unique_name} sentTime={moment(message.created_at).fromNow()} className="Chatheader outgoingChat " />
                          </chats.Message>
                          <CornerLeft className="absolute -bottom-4 right-0 w-5 h-5 fill-[#1c2f39]" />
                        </div>
                      )
                    }
                  } else {
                    if(message.Team.status == "Playing" || message.Team.status == "Played"){
                      return (
                          <div className="relative">
                              <chats.Message model={{
                                  // message: "Hello my friend werqwefqwefwDFwed",
                                  sentTime: moment(message.created_at).fromNow(),
                                  sender: message.User.avatar_unique_name,
                                  direction: "ingoing",
                              }} 
                              className="ChatSide1 relative">
                                  <chats.Message.CustomContent children={<CardExpired message={message} setChatpopup={props.setChatpopup}/>} />
                                  <chats.Message.Header sender={message.User.avatar_unique_name} sentTime={moment(message.created_at).fromNow()} className="Chatheader" />
                              </chats.Message>
                              <CornerRight className="absolute -bottom-4 right-0 w-5 h-5 fill-[#1c2f39]" />
                          </div>
                      )
                    }else{
                        return (
                            <div className="relative">
                            <chats.Message
                                model={{
                                    // message: message.message,
                                    sentTime: moment(message.created_at).fromNow(),
                                    sender: message.User.avatar_unique_name,
                                    direction: "ingoing",
                                }}
                                className="ChatSide1 relative"

                            >
                                <chats.Message.CustomContent children={<Card message={message} fromUserId={message.user_id} setChatpopup={props.setChatpopup}/>} />
                                <chats.Message.Header sender={message.User.avatar_unique_name} sentTime={moment(message.created_at).fromNow()} className="Chatheader " />
                            </chats.Message>
                            <CornerLeft className="absolute -bottom-4 left-0 w-5 h-5 fill-[#202223]" />
                            </div>
                        )
                    }  
                  }

                } else {
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
                }

              })
            }
            {/* <div className="relative">
              <chats.Message
                model={{
                  message: "Hello my friend 😊/n rtret wefwefqwefdweqfqwefw ge",
                  sentTime: "15 mins ago",
                  sender: "Joe",
                  direction: "ingoing",
                }}
                className="ChatSide1 relative"

              >
                <chats.Message.Header sender="Emily" sentTime="15 mins ago" className="Chatheader " />

              </chats.Message>
              <CornerLeft className="absolute -bottom-4 left-0 w-5 h-5 fill-[#202223]" />
            </div>

            <div className="relative">
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
            </div> */}

            {/* <div className="relative">
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
            </div> */}

          </chats.MessageList>
          <chats.MessageInput
            placeholder="Type message here..."
            attachButton={false} sendButton={false}
            value={text}
            onChange={(item: string) => setText(item)}
            onSend={() => { setText("") }}
            onKeyPress={(event: any) => { onEnterKeyPressHandler(event) }}
          />
        </chats.ChatContainer>

      </chats.MainContainer>
      <div className="absolute bottom-0 right-0 h-[60px] bg-[#05080a] w-[200px] px-2 flex items-center z-[999]">
        <Popover content={<Picker onEmojiClick={onEmojiClick} />} trigger={"click"} className="mr-6 cursor-pointer" getPopupContainer={trigger => trigger}>
          <div className="relative">
            <EmojiHappyIcon className="w-8 text-white cursor-pointer" />
          </div>
        </Popover>
        <button className="border-2 border-primary-sky bg-primary-sky/30 px-5 py-3 text-white uppercase font-bold text-sm"
          onClick={onSend}
          disabled={text == ""}
        >
          SEND MASSAGE
        </button>
      </div>
    </div>
  );
}

export default Chat;