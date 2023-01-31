import React, { useEffect, useState } from 'react';
import { XIcon, SearchIcon, PlusIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { Input } from 'antd';
import "./style.css"
import avatar from "./img/avatar.png";
import UserAPI from '@api/UserAPI';
import Addfriend from "./img/ic-AddFriend.png";
import { socket } from "@Utils/socket";
import { getUserID } from '../../../Token';

interface Props {
    setShowAddfriend: (show: boolean) => void;
}

interface Dummy {
    name: string;
    lavel: string;
    avatar: any;
}

const AddFriend = ({ setShowAddfriend }: Props) => {

    const [activeData, setActiveData] = useState({ activePage: 1, totalPage: 1, limit: 10, search: "" });
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    searchFriend(activeData);
  }, []);

  

  const searchFriend = (data: any) => {
    UserAPI.searchFriendAPI(data)
      .then(res => {
        setActiveData({ activePage: activeData.activePage, totalPage: res.data.totalCounts, limit: activeData.limit, search: activeData.search });
        if (res.data.success) {
            const users:any = res.data.friends;
            users.map((user:any) => {
                user.requestTo ? user.user = user.requestTo : user.user = user.requestFrom
            })
            setSearchedResults(users);
        } else {
            setSearchedResults([])
        }
      }).catch(err => {
        console.log(err)
      })
  }

  const handleSearch = (value: any) => {
    let searchValue = value.target.value;
    setActiveData({ activePage: activeData.activePage, totalPage: activeData.totalPage, search: searchValue, limit: activeData.limit });
    const data = { activePage: activeData.activePage, totalPage: activeData.totalPage, search: searchValue, limit: activeData.limit }
    searchFriend(data)
  }

    const Results: Dummy[] = [
        {
            name: "SirDominic",
            lavel: "12",
            avatar: avatar
        },
    ]

    const Lastplayed: Dummy[] = [
        {
            name: "SirDominic",
            lavel: "12",
            avatar: avatar
        },
        {
            name: "SirDominic",
            lavel: "12",
            avatar: avatar
        },
        {
            name: "SirDominic",
            lavel: "12",
            avatar: avatar
        },
        {
            name: "SirDominic",
            lavel: "12",
            avatar: avatar
        },
    ]

   
    const joinRoom = (room: any) => {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    };


    const CardPlayer = (data: any) => {

        const [AddFriend, setAddFriend] = React.useState(false);
        const [userID, setUserID] = React.useState(0);
        var requestSocketData = {
            room_id: "FrientRequest"
        }
        
        const onAddFriendHandler = (userID: number) => {
            setAddFriend(!AddFriend);

            const postData = {
                friend_id: userID
            }
            const data = {
                room_id :`${getUserID()}_${userID}`
            };
            joinRoom(data.room_id);
            if(!AddFriend){
                UserAPI.sendFriendRequestAPI(postData)
                    .then(res => {
                        if (res.data.success) {
                            console.log(res.data.message);
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            }else{

                UserAPI.removeFriendRequestAPI(postData)
                .then(res => {
                    if (res.data.success) {
                        console.log(res.data.message);
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            socket.emit("set_friend_request", data); 
            socket.emit("set_friend_request", requestSocketData); 
        }

        const onRemoveRequestHandler = (userID: number) => {
            setAddFriend(!AddFriend);

            const postData = {
                friend_id: userID
            }
            const data = {
                room_id :`${getUserID()}_${userID}`
            };
            joinRoom(data.room_id);
            if(AddFriend){
                UserAPI.sendFriendRequestAPI(postData)
                    .then(res => {
                        if (res.data.success) {
                            console.log(res.data.message);
                        }
                    }).catch(err => {
                        console.log(err)
                    })

            }else{
                UserAPI.removeFriendRequestAPI(postData)
                .then(res => {
                    if (res.data.success) {
                        console.log(res.data.message);
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
            socket.emit("set_friend_request", data); 
            socket.emit("set_friend_request", requestSocketData); 
        }

        const AddRequestButton = () => {
            if(!data.user){
                return (
                    <div className={clsx("w-36 h-10 border-2 border-primary-sky uppercase flex items-center duration-500 cursor-pointer",AddFriend?"":"bg-primary-sky/30")} onClick={() => {
                        onAddFriendHandler(data.id)
                       }}>
                           <div className=" border-r-2 h-full border-primary-sky flex items-center px-2">
                               <PlusIcon className={clsx("w-5 h-5 text-white duration-500" ,AddFriend? "rotate-45" : "rotate-0")} />
                           </div>
       
                           <p className="flex items-center text-white text-center w-full text-xs justify-center duration-500">{AddFriend ? "REquest sent": "add friend"}</p>
       
                       </div>
                  );
            }else if(data.user.status == "Requested"){
                // setAddFriend(!AddFriend);
                return (
                    <div className={clsx("w-36 h-10 border-2 border-primary-sky uppercase flex items-center duration-500 cursor-pointer",AddFriend?"bg-primary-sky/30":"")} onClick={() => {
                        onRemoveRequestHandler(data.id)
                    }}>
                        <div className=" border-r-2 h-full border-primary-sky flex items-center px-2">
                            <PlusIcon className={clsx("w-5 h-5 text-white duration-500" ,AddFriend? "rotate-0" : "rotate-45")} />
                        </div>
    
                        <p className="flex items-center text-white text-center w-full text-xs justify-center duration-500">{AddFriend ? "add friend ": "REquest sent"}</p>
    
                    </div>
                );
            }else if(data.user.status == "Accepted"){
                return (
                    <div className={clsx("w-36 h-10 border-2 border-primary-sky uppercase flex items-center duration-500","")} >
                        {/* <div className=" border-r-2 h-full border-primary-sky flex items-center px-2">
                            <PlusIcon className={clsx("w-5 h-5 text-white duration-500" ,AddFriend? "rotate-0" : "rotate-45")} />
                        </div> */}
                        <img src={Addfriend} className="h-[35px] w-[35px] mt-1 object-cover"/>
                        <p className="flex items-center text-white text-center w-full text-xs justify-center duration-500">Friends</p>
                    </div>
                );
            }else{
                return (
                    <></>
                );
            }
            
        }

        return (
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center relative">
                    <img src={data.avatar_image} className=" h-20 object-contain" />
                    <div className="a absolute bottom-0 left-0 w-5 h-5 rounded-md bg-primary-light text-white font-bold text-xs flex items-center justify-center">
                        {data.level}
                    </div>
                    <p className="text-white font-bold ml-8">{data.avatar_unique_name}</p>
                </div>
                
                <AddRequestButton/>
                {/* {data.toFriend.request_status != "Accepted" && <div className={clsx("w-36 h-10 border-2 border-primary-sky uppercase flex items-center duration-500 cursor-pointer",AddFriend?"":"bg-primary-sky/30")} onClick={() => {
                 onAddFriendHandler(data.id)
                }}>
                    <div className=" border-r-2 h-full border-primary-sky flex items-center px-2">
                        <PlusIcon className={clsx("w-5 h-5 text-white duration-500" ,AddFriend? "rotate-45" : "rotate-0")} />
                    </div>

                    <p className="flex items-center text-white text-center w-full text-xs justify-center duration-500">{AddFriend ? "REquest sent": "add friend"}</p>

                </div>} */}
            </div>
        )
    }




    return (
        <div className="w-[750px] bg-primary-dark text-black">
            <div className="h-[75px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5 flex items-center justify-center ">
                <p className="text-white text-center uppercase font-bold text-base">
                    ADD FRIEND
                </p>
                <button onClick={() => { setShowAddfriend(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-4">
                    <XIcon className="text-white w-9" />
                </button>
            </div>
            <div className="flex flex-col items-start  py-12 gap-2 px-10">
                <Input
                    bordered={false}
                    prefix={<SearchIcon className="w-7 h-7" />}
                    placeholder="Friend name or friend ID code"
                    onChange={value => handleSearch(value)}
                    style={{
                        color: '#fff',
                    }}
                    className={clsx(
                        " text-white w-full h-14 px-4 addfriend  rounded-lg border-0 bg-gradient-to-r from-[#1c323f] to-[#121e26]"
                    )}
                />

                <p className="uppercase mt-4 text-[#bdc0c1] text-base ">search found</p>
                <div className="grid grid-cols-2 gap-6 w-full">
                    {searchedResults.map((data: any, index:any) => {
                        return (
                            <CardPlayer key={index} {...data} />
                        )
                    })}

                </div>



                <p className="uppercase mt-4 text-[#bdc0c1] text-base ">last played together</p>
                {/* <div className="grid grid-cols-2 gap-6 w-full">
                {Lastplayed.map((data, index) => {
                        return (
                            <CardPlayer key={index} {...data} />
                        )
                    })}

                </div> */}
            </div>
        </div>
    );
}

export default AddFriend;