import React, { useState } from "react";
import { ChatAlt2Icon, MinusIcon } from "@heroicons/react/solid"
import clsx from "clsx";
import { Badge } from "antd"
import "./style.css"
import ChatFunction from "./chat";
import FriendChat from "./FriendChatList"
import { socket } from "@Utils/socket";
import { useFriendChathDispatch } from "@Context/Friend/FriendChat";
import Match from "./Match";

// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
// } from "@chatscope/chat-ui-kit-react";

interface Props {
    setChatpopup: (value: boolean) => void
}

const Chat = ({ setChatpopup }: Props) => {

    const [fillter, setFillter] = useState("World");
    const context = useFriendChathDispatch();

    const active = (value: string) => {
        if (fillter === value) {
            return "bg-[#95be4c] font-bold text-black";
        } else {
            return "bg-[#13252e] text-white font-semibold";
        }
    };

    const WindowsChat = () => {
        if (fillter === "Friend") {
            return <FriendChat chatType="Friend" setChatpopup={setChatpopup}/>
        } else if(fillter === "Match") {
            return <Match chatType="Match" setChatpopup={setChatpopup}/>
        } else {
            return <ChatFunction chatType={fillter} setChatpopup={setChatpopup}/>
        }
    };

    return (

        <div className="w-[800px] h-[640px]  bg-primary-dark/80 " >
            <div className="w-full h-[70px] bg-gradient-to-r from-primary-light to-primary-dark border-l-4 border-primary-green px-6 flex items-center justify-between">
                <div className="flex gap-8 items-center">
                    <ChatAlt2Icon className='w-14 h-14 text-primary-sky chatShadow' />
                    <div className="flex justify-start items-center gap-[10px] xl:gap-[15px] backdrop-blur-[5px] w-full h-[60px] px-[0px] font-bold">
                        <p className={clsx("p-[2px_35px] rounded-[25px] cursor-pointer duration-300 ", active("World"))} onClick={() => setFillter("World")}>
                           Battlelab World Chat
                        </p>
                        {/* <p className={clsx("p-[2px_35px] rounded-[25px] cursor-pointer duration-300", active("Clan"))} onClick={() => setFillter("Clan")}>
                            Clan
                        </p> */}
                        <p className={clsx("p-[2px_35px] rounded-[25px] cursor-pointer duration-300", active("Match"))} onClick={() => setFillter("Match")}>
                            Match
                        </p>
                        <p className={clsx("p-[2px_6px_2px_35px] flex items-center rounded-[25px] cursor-pointer duration-300  ", active("Friend"))} onClick={() => setFillter("Friend")}>

                            Friend
                            <div className = "w-[20px] h-[20px] bg-red-500 ml-2 rounded-full flex justify-center items-center text-center text-white font-bold text-[10px] ">
                               <span>{context.items.friendsMessageListCount}</span>
                            </div>
                        </p>
                    </div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-primary-light to-primary-dark rounded-md shadow-xl flex items-center justify-center cursor-pointer"
                    onClick={() => setChatpopup(false)}
                >
                    <MinusIcon className='w-8 h-8 text-[#c3ccd3] text-center' />

                </div>
            </div>
            <div>
                <WindowsChat />
            </div>

        </div>
    )
}

export default Chat;