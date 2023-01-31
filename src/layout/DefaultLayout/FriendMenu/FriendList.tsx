import React, { useEffect, useState } from "react";
import Addfriend from "./img/ic-AddFriend.png";
import Search from "./img/ic-search.png";
import clsx from "clsx";
import Avater from "./img/avatar.png";
import { CheckCircleIcon, XIcon, SearchIcon } from "@heroicons/react/solid"
import styles from "./style.module.css";
import UserAPI from "../../../api/UserAPI";
import "./style.css"
import { Popover, Modal, Input } from "antd"
import Addnikename from "./Addnikename";
import Removefriend from "./Removefriend";
import Block from "./Block";
import Inviteclan from "./Inviteclan";
import AddfriendModal from "./Addfriend";
// import {XIcon} from "@heroicons/react/outline"
import { socket } from "@Utils/socket";
import { getUserID } from "../../../Token";

interface FriendListProps {
    id: number,
    img: any;
    avatar_image: string,
    name: string;
    avatar_unique_name: string,
    level: number;
    status: string;
    is_online: boolean
    lastOnline?: string;
}

const FriendMenu = (props:any) => {
    const [ShowNikename, setShowNikename] = React.useState(false);
    const [ShowRemoveFriend, setShowRemoveFriend] = React.useState(false);
    const [ShowBlock, setBlock] = React.useState(false);
    const [ShowInviteClan, setShowInviteClan] = React.useState(false);
    const [showInput, setShowInput] = React.useState(true);
    const [showAddfriend, setShowAddfriend] = React.useState(false);

    const [ friendRequestData, setFriendRequestData ] = useState([]);
    const [ favFriendData, setFavFriendData ] = useState([]);
    const [ onlineFriendData, setOnlineFriendData ] = useState([]);
    const [ offlineFriendData, setOfflineFriendData ] = useState([]);

    const [onlineFriend, setOnlineFriend] = useState({ activePage: 1, totalPage: 1, limit: 10, search: "" });
    const [toUserId, setToUserId] = React.useState("");
    const [avatarName, setavatarName] = React.useState("");

    var requestSocketData = {
        room_id: "FrientRequest"
    }

    useEffect(() => {
        getFriendRequest()
        getFavouriteFriend()
        getOnlineFriend(onlineFriend)
        getOfflineFriend(onlineFriend)
        getFriendListToCreateSocketRoom()
      }, [])

    useEffect(() => {
        socket.on("get_acceptReject_request", (data) => {
            getFriendRequest();
            getOnlineFriend(onlineFriend);
            getOfflineFriend(onlineFriend);
        });
    },[socket]);

    const getFriendListToCreateSocketRoom = () => {
        UserAPI.getFriendListToCreateSocketRoomAPI()
        .then(res => {
            if(res.data.success){
                res.data.friends.forEach((friend:any, i:number) => {
                    console.log(friend.from_user_id);
                    console.log(friend.to_user_id);
                    joinRoom(friend.from_user_id);
                    joinRoom(friend.to_user_id);
                });
            }
          }).catch(err => {
            console.log(err)
          })
    }

    const joinRoom = (room: any) => {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    };
    joinRoom(requestSocketData.room_id);

      const getFriendRequest = () => {
        UserAPI.getFriendRequestAPI()
          .then(res => {
            if(res.data.success){
                setFriendRequestData(res.data.users)
            }else{
                setFriendRequestData([]);
            }
          }).catch(err => {
            console.log(err)
          })
      }

      const getFavouriteFriend = () => {
        UserAPI.getFavouriteFriendAPI()
          .then(res => {
            if(res.data.success){
                setFavFriendData(res.data.users)
            }else{
                setFavFriendData([]);
            }
          }).catch(err => {
            console.log(err)
          })
      }
      
      const getOnlineFriend = (data: any) => {
        UserAPI.getOnlineFriendAPI(data)
          .then(res => {
            setOnlineFriend({ activePage: onlineFriend.activePage, totalPage: res.data.totalCounts, limit: onlineFriend.limit, search: onlineFriend.search });

            if(res.data.success){
                setOnlineFriendData(res.data.users);
            }else{
                setOnlineFriendData([]);
            }
          }).catch(err => {
            console.log(err)
          })
      }

      const getOfflineFriend = (data:any) => {
        UserAPI.getOfflineFriendAPI(data)
          .then(res => {
              
            if(res.data.success){
                setOfflineFriendData(res.data.users)
            }else{
                setOfflineFriendData([]);
            }
          }).catch(err => {
            console.log(err)
          })
      }

   

    const acceptFriendRequest = (user_id: number) => {
        const postData = {
            from_user_id: user_id,
            status: "Accepted"
        }
        UserAPI.acceptRejectRequestAPI(postData)
            .then(res => {
                if(res.data.success){
                    const data = {
                        room_id :`${user_id}_${getUserID()}`
                    };
                    joinRoom(data.room_id);
                    socket.emit("set_friend_request", data);
                    socket.emit("set_notification", data); 
                    getFriendRequest();
                    getOnlineFriend(onlineFriend);
                    getOfflineFriend(onlineFriend);
                }
            }).catch(err => {
                console.log(err)
            });
    }
 
    const rejectFriendReuest = (user_id: number) => {
        const postData = {
            from_user_id: user_id,
            status: "Rejected"
        }
        UserAPI.acceptRejectRequestAPI(postData)
            .then(res => {
                if(res.data.success){
                    const data = {
                        room_id :`${user_id}_${getUserID()}`
                    };
                    joinRoom(data.room_id);
                    socket.emit("set_friend_request", data); 
                    socket.emit("set_notification", data); 
                    getFriendRequest();
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const handleSearch = (value: any) => {
        let searchValue = value.target.value;
        setOnlineFriend({ activePage: onlineFriend.activePage, totalPage: onlineFriend.totalPage, search: searchValue, limit: onlineFriend.limit });
        const data = { activePage: onlineFriend.activePage, totalPage: onlineFriend.totalPage, search: searchValue, limit: onlineFriend.limit }
        getOnlineFriend(data);
        getOfflineFriend(data);
    }

    const ColorStatus = (status: boolean) => {
        if (status === true) {
            return "text-primary-sky"
        } else if (status === false) {
            return "text-gray-500"
        } else {
            return "text-primary-green"
        }
    }

    const Status = (value: FriendListProps) => {
        if (value.is_online === true) {
            return <p className={clsx("text-[11px] font-semibold", ColorStatus(value.is_online))}>Online</p>
        } else if (value.is_online === false) {
            return <p className={clsx("text-[11px] font-semibold", ColorStatus(value.is_online))}>Last online {value.lastOnline} ago</p>
        } else {
            return <p className={clsx("text-[11px] font-semibold", ColorStatus(value.is_online))}>{value.is_online}</p>
        }
    }

    const toUserHandler = (item : any) => {
        setToUserId(item.toUser);
        setavatarName(item.avatarName);
        setBlock(true);
    }

    const chatHandler = () => {
        props.setChatpopup(true);
    }

    const MenuRightClike = (props : any) => {
        return (
            <div className="bg-[#0f171a] text-[#cccdce] p-5">
                <p className=" border-b-[1px] border-[#4c5052] pb-1.5 cursor-pointer" onClick={chatHandler}>Chat</p>
                {/* <p className="mt-1.5 border-b-[1px] border-[#4c5052] cursor-pointer pb-1.5">View profile</p>
                <p className=" mt-1.5 border-b-[1px] border-[#4c5052] cursor-pointer pb-1.5"
                    onClick={() => setShowNikename(true)}
                >Add nikename</p>
                <p className="mt-1.5 border-b-[1px] border-[#4c5052] cursor-pointer pb-1.5">Add to favorite</p> */}
                <p className="mt-1.5 border-b-[1px] border-[#4c5052] cursor-pointer pb-1.5"
                    onClick={ () => setShowRemoveFriend(true)}
                >Remove as friend</p>
                <p className="mt-1.5 border-b-[1px] border-[#4c5052] cursor-pointer pb-1.5"
                    onClick={ () => toUserHandler(props) }
                >Block</p>
                {/* <p className="mt-1.5  cursor-pointer pb-1.5"
                    onClick={() => setShowInviteClan(true)}
                >Invite to clan</p> */}

            </div>
        )
    }

    const FriendReq = (value: FriendListProps) => {
        return (
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="p-[10px] w-[60px] flex justify-center items-center relative">
                        <img src={value.avatar_image} className="h-[60px] w-10 object-cover" />
                        <p className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-[#222C36] rounded-[5px]">
                            {value.level}
                        </p>
                    </div>
                    <div>
                        <p className="text-[12px]  mb-[10px] font-medium">{value.avatar_unique_name}</p>
                        <p className={clsx("text-[11px] font-semibold", ColorStatus(value.is_online))}>{value.is_online ? "Online" : "Offline"}</p>
                    </div>
                </div>
                <div className="flex gap-[10px] items-center">
                    <button onClick={() => {acceptFriendRequest(value.id)}}> <CheckCircleIcon className = "w-[30px] h-[30px] text-[#767676]"/> </button>
                   <button  onClick={() => {rejectFriendReuest(value.id)}}> <XIcon className = "w-[20px] h-[20px] text-[#767676]" /> </button>
                </div>
            </div>
        )
    }

    const FriendList = (value: FriendListProps) => {
        return (
            <Popover content={<MenuRightClike toUser={value.id} avatarName={value.avatar_unique_name} />} trigger={"contextMenu"} placement = {"right"}  getPopupContainer={trigger => trigger}>
                <div className="relative flex justify-between items-center">

                    <div className="flex items-center">
                        <div className="p-[10px] w-[60px] flex justify-center items-center relative">
                            <img src={value.avatar_image} alt="avatar" className="h-[60px] w-[40px] object-cover" />
                            <p className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-[#222C36] rounded-[5px]">{value.level}</p>
                        </div>
                        <div>
                            <p className="text-[12px] mb-[10px] font-bold">{value.avatar_unique_name}</p>
                            {Status(value)}
                        </div>
                    </div>
                </div>
            </Popover >
        )
    }

    return (
        <div style={{
            width: "100%",
            height: "calc(100vh - 150px)",
        }} >
            <div className="h-60px w-full text-white px-4 bg-[#182e38] border-l-4 shadow-[inset_0_2px_4px_4px_rgb(0,0,0/0.6)]  border-l-[#5d752f] pb-2.5 flex items-center bg-gradient-to-r from-[#162b35] to-[#122128]">
                <p className={clsx(" overflow-hidden duration-500", showInput ? "w-[155px] opacity-100" : "w-0 opacity-0")}>FRIEND({onlineFriendData.length + offlineFriendData.length})</p>
                <div className={clsx("duration-500 mt-[2px] hover:bg-[#081418]/30 w-full h-[45px] flex",showInput ? "" : "bg-[#081418]")}>
                    <div className={clsx("duration-500  w-full h-[45px] flex items-center pr-1",showInput ? "opacity-0" : "opacity-100")}>
                        <Input
                            bordered={false}
                            prefix={<SearchIcon className="w-6 h-6" />}
                            placeholder="Search Friend"
                            onChange={value => handleSearch(value)}
                            className={clsx(
                                " text-white h-12 px-4 border-0 bg-[#081418] duration-500 addfriend",showInput ? "w-0" : "w-full"
                            )}
                        />
                        <XIcon className = "w-5 h-5 text-[#767676] bg-[#081418]" onClick={() => setShowInput(!showInput)}/>
                    </div>
                    <img src={Search} className={clsx("h-[45px] object-contain cursor-pointer overflow-hidden duration-500 pb-1 pr-2", showInput ? "w-[58px] opacity-100" : "w-0 opacity-0")} onClick={() => setShowInput(!showInput)} />
                </div>
                <div style={{
                    paddingTop: "2px",
                }} className="flex">

                    <img src={Addfriend} className="h-[45px] w-[45px] object-cover  cursor-pointer" onClick={() => setShowAddfriend(true)} />
                </div>
            </div>

            <div style={{
                height: "calc(100vh - 265px)",
            }} className={clsx(styles.SFriendList, "text-white w-full bg-gradient-to-b from-[#111d1f] to-[#0a0a0a] flex overflow-y-auto flex-col p-[10px_20px_0px_25px]")}>
                <p className="text-[12px] mb-[10px]">FRIEND REQUSTS({friendRequestData.length})</p>
                {friendRequestData.length > 0 && friendRequestData.map((value: FriendListProps) => {
                    return (
                        <FriendReq key={value.id} {...value} />
                    )
                })}
                <p className = "text-[12px] my-[15px]">FAVORITE FRIEND({favFriendData.length})</p>
                {favFriendData.map((value: FriendListProps) => {
                    return (
                        <FriendList key={value.id} {...value} />
                    )
                })}
                <p className = "text-[12px] my-[15px]">ONLINE FRIEND({onlineFriendData.length})</p>
                {onlineFriendData.map((value: FriendListProps) => {
                    return (
                        <FriendList key={value.id} {...value} />
                    )
                })}
                <p className = "text-[12px] my-[15px]">OFFLINE FRIEND({offlineFriendData.length})</p>
                {offlineFriendData.map((value: FriendListProps) => {
                    return (
                        <FriendList key={value.id} {...value} />
                    )
                })}
                <Modal visible={ShowNikename} footer={null} title={null} centered closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
                    <Addnikename setShowNikename={setShowNikename} />
                </Modal>

                <Modal visible={ShowRemoveFriend} footer={null} title={null} centered closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
                    <Removefriend setShowRemoveFriend={setShowRemoveFriend} />
                </Modal>
                <Modal visible={ShowBlock} footer={null} title={null} centered closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
                    <Block setBlock={setBlock} toUserId={toUserId} avatarName={avatarName}/>
                </Modal>
                <Modal visible={ShowInviteClan} footer={null} title={null} centered closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
                    <Inviteclan setShowInviteClan={setShowInviteClan} />
                </Modal>
                <Modal visible={showAddfriend} footer={null} title={null} centered closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
                    <AddfriendModal setShowAddfriend={setShowAddfriend} />
                </Modal>
            </div>
        </div>
    )
}

export default FriendMenu;