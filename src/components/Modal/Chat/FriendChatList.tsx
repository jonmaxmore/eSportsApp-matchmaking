import React, { useEffect } from 'react';
import { Input } from "antd";
import { SearchIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import Style from './style.module.css';
import ChatFriend from './chatfriend';
import MessageAPI from '@api/MessageAPI';
import moment from 'moment';
import { getUserID } from '../../../Token';
import { useFriendChathDispatch } from '@Context/Friend/FriendChat';

const FriendChatList = (props: any) => {
    const [text, setText] = React.useState("")
    const [messageFriendList, setMessageFriendList] = React.useState([] as any);
    // const [messageList, setMessageList] = React.useState([] as any);
    const [Changepage, setChangepage] = React.useState(false);
    const [friendData, setFriendData] = React.useState({});
    const [searchText, setSearchText] = React.useState('');

    useEffect(() => {
        getMessageFriendList();
    }, []);

    const getMessageFriendList = () => {
        const data = {
            chatType: props.chatType
        }
        MessageAPI.fetchMessageFriendList(data)
            .then(res => {
                if(res.data.success){
                    setMessageFriendList(res.data.friends);
                }
            })
    }



    const fetchSearchMessageFriendList = (searchText: any) => {
        setSearchText(searchText)
        const data = {
            searchText: searchText
        }
        MessageAPI.fetchSearchMessageFriendList(data)
            .then(res => {
                setMessageFriendList(res.data.friends)
            })
    }

    const Windows = () => {
        if (Changepage) {
            return <ChatFriend
                setChangepage={setChangepage}
                friendData={friendData}
                getMessageFriendList={getMessageFriendList}
                setChatpopup={props.setChatpopup}
            />
        } else {
            return <ListPage />
        }
    }

    const ListPage = () => {
        return (
            <div className="h-[570px] w-full pt-2 px-6 bg-[#0d1518]">
                <Input
                    bordered={false}
                    prefix={<SearchIcon className="w-7 h-7" />}
                    placeholder="Search chat"
                    className={clsx(
                        Style.search,
                        " text-white w-full h-[50px] px-4  rounded-xl border-0 bg-gradient-to-r from-[#1c323f] to-[#121e26]"
                    )}
                    onChange={(e) => fetchSearchMessageFriendList(e.target.value)}
                    value={searchText}
                />
                <div className=" mt-2 overflow-y-auto h-[480px] hidden-scroll">
                    {
                        messageFriendList.map((fr: any, i: any) => {
                            return (
                                <div key={i} className="w-full h-[100px] mt-2 bg-[#1d3747] flex py-4 px-10 cursor-pointer justify-between items-start shadow-2xl"
                                    onClick={() => {
                                        setChangepage(true)
                                        setFriendData(fr)
                                    }}
                                >
                                    <div>
                                        <div className=" flex gap-4 items-center">
                                            <p className="text-xl font-bold text-white ">{fr.avatar_unique_name}</p>
                                            {
                                                fr.unreadTotal > 0 && (fr.lastMsgUersId != getUserID()) &&
                                                <div className="w-7 h-7 bg-primary-dark rounded-md text-white text-center font-bold">{fr.unreadTotal}</div>
                                            }
                                            <p className="text-sm text-primary-sky">{fr.is_online == 1 ? 'Online' : 'Offline'}</p>
                                        </div>
                                        <p className="text-base font-medium mt-4 text-white">{fr.message}</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        {/* <p className="text-[#5b676e] text-sm">Today.14.08</p> */}
                                        {
                                            fr.message_at &&
                                            <p className="text-[#5b676e] text-sm">{`${moment().calendar(moment(fr.message_at))}`}</p>
                                        }
                                        <ChevronRightIcon className="w-8 mt-2 text-[#dfe3e5] text-right" />
                                    </div>
                                </div>

                            )
                        })
                    }

                    {/* <div className="w-full h-[100px] mt-2 bg-[#1d3747] flex py-4 px-10 justify-between cursor-pointer items-start shadow-2xl"
                        onClick={() => setChangepage(true)}
                    >
                        <div>
                            <div className=" flex gap-4 items-center">
                                <p className="text-xl font-bold text-white ">Dayvee13</p>
                                <div className="w-7 h-7 bg-primary-dark rounded-md text-white text-center font-bold">12</div>
                                <p className="text-sm text-primary-sky">Online</p>
                            </div>
                            <p className="text-base font-medium mt-4 text-white">Hello everyone !!!</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-[#5b676e] text-sm">Today.14.08</p>
                            <ChevronRightIcon className="w-8 mt-2 text-[#dfe3e5] text-right" />
                        </div>
                    </div>
                    <div className="w-full h-[100px] mt-2 bg-[#141a1c] flex py-4 px-10 justify-between cursor-pointer items-start shadow-2xl"
                        onClick={() => setChangepage(true)}
                    >
                        <div>
                            <div className=" flex gap-4 items-center">
                                <p className="text-xl font-bold text-white ">Dayvee13</p>
                                <div className="w-7 h-7 bg-primary-dark rounded-md text-white text-center font-bold">12</div>
                                <p className="text-sm text-primary-sky">Online</p>
                            </div>
                            <p className="text-base font-medium mt-4 text-white">Hello everyone !!!</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-[#5b676e] text-sm">Today.14.08</p>
                            <ChevronRightIcon className="w-8 mt-2 text-[#dfe3e5] text-right" />
                        </div>
                    </div>

                    <div className="w-full h-[100px] mt-2 bg-[#141a1c] flex py-4 px-10 justify-between cursor-pointer items-start shadow-2xl"
                        onClick={() => setChangepage(true)}
                    >
                        <div>
                            <div className=" flex gap-4 items-center">
                                <p className="text-xl font-bold text-white ">Dayvee13</p>
                                <div className="w-7 h-7 bg-primary-dark rounded-md text-white text-center font-bold">12</div>
                                <p className="text-sm text-primary-sky">Online</p>
                            </div>
                            <p className="text-base font-medium mt-4 text-white">Hello everyone !!!</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-[#5b676e] text-sm">Today.14.08</p>
                            <ChevronRightIcon className="w-8 mt-2 text-[#dfe3e5] text-right" />
                        </div>
                    </div>

                    <div className="w-full h-[100px] mt-2 bg-[#141a1c] flex py-4 px-10 justify-between cursor-pointer items-start shadow-2xl"
                        onClick={() => setChangepage(true)}
                    >
                        <div>
                            <div className=" flex gap-4 items-center">
                                <p className="text-xl font-bold text-white ">Dayvee13</p>
                                <div className="w-7 h-7 bg-primary-dark rounded-md text-white text-center font-bold">12</div>
                                <p className="text-sm text-primary-sky">Online</p>
                            </div>
                            <p className="text-base font-medium mt-4 text-white">Hello everyone !!!</p>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-[#5b676e] text-sm">Today.14.08</p>
                            <ChevronRightIcon className="w-8 mt-2 text-[#dfe3e5] text-right" />
                        </div>
                    </div> */}

                </div>

            </div>
        )
    }

    return (
        <div>
            <Windows />
        </div>
    )
}

export default FriendChatList;