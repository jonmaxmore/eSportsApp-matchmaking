import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { ReactComponent as MaleProfile } from "@Image/Home/male_profile.svg";
import { Checkbox, Input } from "antd"
import style from "./style.module.css"
import clsx from "clsx";
import "./style.css"
import UserAPI from "@api/UserAPI";


interface Props {
    setPopTagfriend: (show: boolean) => void;
    setTag: any;
}

interface friend {
    name: string;
    laval: string;
}

const PopupTagfriend = ({ setPopTagfriend, setTag }: Props) => {
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        getFriendList();
    }, []);

    const getFriendList = () => {
        UserAPI.getFriendListAPI()
            .then(res => {
            if (res.data.success) {
                const friends:any = res.data.friends;
                friends.map((friend:any) => {
                    friend.isChecked = false;
                })
                setFriendList(friends);
            } else {
                setFriendList([])
            }
            }).catch(err => {
                console.log(err)
            });
    }

    const CardFriend = ({ data }: { data: any }) => {
        return (
            <div className="flex justify-between items-center">
                <div className=" flex items-center">
                    <div className="p-[10px] w-[60px] flex justify-center items-center relative">
                        {/* <MaleProfile className="w-24" /> */}
                        <img src={data.avatar_image} alt="avatar" className="h-[60px] w-[100px] object-cover" />
                        <div className="w-5 h-5 bg-gradient-to-tr to-[#2b353f] from-[#111b25] rounded-md text-white font-semibold text-xs flex justify-center items-center  absolute -bottom-2 left-3">
                            {data.level}
                        </div>
                    </div>
                    {/* <div className="p-[10px] w-[60px] flex justify-center items-center relative">
                            <img src={data.avatar_image} alt="avatar" className="h-[60px] w-[40px] object-cover" />
                            <p className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-[#222C36] rounded-[5px]">{data.level}</p>
                        </div> */}
                    <p className="text-white font-semibold">
                        {data.avatar_unique_name}
                    </p>
                </div>
                <Checkbox className="checked" value={data.avatar_unique_name} />
            </div>
        )
    }
    return (
        <div className="w-[500px] bg-primary-dark text-black">
            <div className="h-[75px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5 flex items-center justify-center ">
                <p className="text-white text-center uppercase font-bold text-base">
                    TAG FRIEND
                </p>
                <button onClick={() => {
                    setPopTagfriend(false);
                    setTag([])
                }}
                    className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-4 left-4">
                    <XIcon className="text-white w-9" />
                </button>
            </div>
            <div className="flex flex-col items-center py-12 gap-2 bg-gradient-to-b from-[#0a1417] to-[#0a1619]" >
                <div className="px-12 w-full h-[500px] overflow-y-auto sc">
                    <Checkbox.Group style={{ width: '100%' }} onChange={(value) => {
                        setTag(value as [])
                    }}>
                        {friendList.map((data: any, index:number) => {
                            return (
                                <div key={data.id} className="mt-5">

                                    <CardFriend data={data} />
                                </div>
                            )
                        })}

                    </Checkbox.Group>

                    {friendList.length === 0 && <div className={clsx("flex w-full text-white justify-center")}>
                        <p className="w-50 h-40 text-white text-[18px]">You don't have any friends in account.</p>
                        </div>}

                </div>

                {friendList.length > 0 && <button
                    className="bg-primary-sky/30 mt-10 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => { setPopTagfriend(false) }}
                >
                    confirm
                </button>}
            </div>


        </div>
    )
}

export default PopupTagfriend;