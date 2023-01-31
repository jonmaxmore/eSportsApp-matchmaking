import React, { useEffect, useState, useReducer } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid"
import demo from "./clanlogo_demo.jpg";
import UserAPI from "../../../../api/UserAPI";
import dotalogo from "@Image/Matchmaking/dotaLogo.jpg"
import lollogo from "@Image/Matchmaking/LogoLoL.png";
import "./style.css"
import { useFriendChathDispatch } from "@Context/Friend/FriendChat";
import { getUserID } from "../../../../Token";

const Status = (props: any) => {
    const [state, setState] = useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }),
        {
            user: {},
            postCount: 0,
            followersCount: 0,
            followingCount: 0,
            friendCount: 0,
            myClan: {},
            clanMemberCount: 0,
            gameHistories: []
        }
    );
    const context = useFriendChathDispatch();
    useEffect(() => {
        getProfile()
      }, [])

      const getProfile = () => {
        UserAPI.getProfile(getUserID())
          .then(res => {
            if(res.data.success){
                setState({
                    user: res.data.user,
                    postCount: res.data.postCount,
                    followersCount: res.data.followersCount,
                    followingCount: res.data.followingCount,
                    friendCount: res.data.friendCount,
                    myClan: res.data.myClan,
                    clanMemberCount: res.data.clanMemberCount,
                    gameHistories: res.data.gameHistories
                });
                context._addFriendChatDetails({friendsMessageListCount : res.data.friendCount});

            }
          }).catch(err => {
            console.log(err)
          })
      }

    return (
        <div style={{
            height: "calc(100vh - 120px)",
        }} className="noselect overflow-y-auto flex justify-start items-center flex-col p-[30px_30px] bg-[#10181b] w-full ">
            <div className="flex justify-center items-center gap-[10px] w-full">
                <span className="text-[24px] font-bold pl-[30px] ">{state.user.avatar_unique_name}</span>
                <ChevronDownIcon className="h-[20px] w-[20px] " />
            </div>
            <span className="mt-[5px] text-[12px] text-[#b0b2b4] font-semibold">
                Code ID: {state.user.code_id}
            </span>
            <span className="mt-[5px] text-[12px] text-[#95be4c] font-semibold">
                Lavel: {state.user.level}
            </span>
            <span className="mt-[10px] text-[12px] text-primary-sky font-semibold">
                Online
            </span>
            <div className="flex min-w-[200px] w-full  justify-between items-start border-b-[1px] border-[#e6e6e6] py-12 text-white ">
                <div className="flex justify-start items-start gap-[22px] flex-col text-[14px] font-medium">
                    <p>Post</p>
                    <p>Follower</p>
                    <p>Following</p>
                    <p>Friend</p>
                    <p>My sell order</p>
                </div>
                <div className =  "flex justify-start items-end gap-[22px] flex-col text-[14px] font-semibold">
                    <p>{state.postCount}</p>
                    <p>{state.followersCount}</p>
                    <p>{state.followingCount}</p>
                    <p>{state.friendCount}</p>
                    <p>0</p>
                </div>
            </div>
            {/* <div className="flex min-w-[200px] w-full p-[20px_0px_20px_0px]  justify-between items-start border-b-[1px] border-[#e6e6e6] text-white">
                <div className="flex justify-start items-start gap-[22px] flex-col text-[14px] font-medium">
                    <p>My Clan</p>
                    <p>Clan Members</p>
                </div>
                <div className = "flex justify-start items-end gap-[15px] flex-col text-[14px] font-semibold">
                    <div className = "flex gap-2">
                    {state.myClan ? <img className = "text-[8px] text-center  w-9 border-2 " src = {demo}/> : "-"}
                    <p className = "text-[#95be4c] text-[16px]">{state.myClan ? state.myClan.clan_initial : ""}</p> 

                    </div>
                    <p>{state.clanMemberCount}</p>
                </div>
            </div> */}
            <div className="w-full flex justify-start  items-center mt-[10px]">
                <p>Recent games</p>
            </div>

            {state.gameHistories.map((item : any) =>
                <div className="flex min-w-[200px] w-full p-[10px_0px_30px_0px] justify-between items-start text-white">
                    <div className="flex justify-start items-start gap-[17px] flex-col font-[14px] font-medium">
                        <div className="w-[50px] h-[50px] rounded-[6px] border-[2px] border-[#58afe6]">
                            <img className="w-full h-full object-cover" src={item.GameDetail.game_icon} />
                        </div>
                    </div>
                    <div className="flex justify-start items-end gap-[45px] flex-col text-[16px] font-semibold p-[15px_0px_0px_0px]">
                        <p className="text-center">{item.GameDetail.name_en}</p>
                    </div>
                </div>
            )}
            {state.gameHistories.length > 0 ? null :
                <div className="mt-[10px] text-[15px]">
                    <p>You haven't played any game.</p>
                </div>
            }
        </div>
    )
}

export default Status;