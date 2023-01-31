import React, { useEffect, useState, useReducer } from 'react';
import Avatar from "../../../assets/images/Profile/avatar.png";
import ICShirt from "../../../assets/images/Profile/ic-shirt.png";
import ICLol from "../../../assets/images/Profile/ic-lol.png";
import NoContent from "../../../assets/images/no_content.png";
import ICBadge from "../../../assets/images/Profile/ic-Badge.png";
import ICTrophy from "../../../assets/images/Profile/ic-tophy.png";
import ICSilverMember from "../../../assets/images/Profile/ic-SilverMember.png";
import Comp from "../../../assets/images/Profile/Comp.png";
import { useNavigate } from "react-router-dom";
import UserAPI from '@api/UserAPI';
import style from "./style.module.css";
import clsx from "clsx";
import { getUserID } from '../../../Token';

const ProfileTotal = ({ setActiveTab, userID }: any) => {
  const navigate = useNavigate();
  

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
        totalEarnings: 0
    }
  );

  useEffect(() => {
      getProfile()
    }, [userID])

    const getProfile = () => {
      UserAPI.getProfile(userID)
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
                  matchesPlayed: res.data.matchesPlayed,
                  totalWins: res.data.totalWins,
                  totalLosses: res.data.totalLosses,
                  userTrophies: res.data.userTrophies,
                  userBadges: res.data.userBadges,
                  totalEarnings: res.data.totalEarnings
              })
          }
        }).catch(err => {
          console.log(err)
        })
        
    }


  
  
  return (
    <>
      <div className={`grid grid-cols-12 gap-6 w-full h-[300px] `}>
        {/* FLAG */}
        <div className={"w-full flex justify-center col-span-4 "}>
          <div className = {clsx("w-full -mt-28 relative max-w-[350px] ")}>
            <div className = {clsx("absolute top-[2.5px] w-full h-full bg-[#6BB8E7]",style.clip)}></div>
            <div className={clsx("w-full h-full py-10 px-5 from-[#122e3a] bg-gradient-to-br to-[#0e1719] border-2 border-[#6BB8E7] absolute top-0 ",style.clip)}>
              <div className="flex flex-col gap-4 justify-center text-center">
                {/* Profile Name */}
                <p className="font-bold text-2xl">{state.user.avatar_unique_name}</p>
                {/* Code ID */}
                <p className="text-sm">Code ID : {state.user.code_id}</p>
                {/* Level */}
                <p className="text-sm text-[#8DB54B]">Level {state.user.level}</p>
                {/* Status */}
                <p className="text-sm text-[#58AFE6]">{state.user.is_online ? 'Online' : 'Offline'}</p>
                {/* EXP */}
                <div className="flex flex-col justify-center w-full gap-2">
                  <div className="flex flex-row justify-between">
                    <p className="font-bold">EXP:</p>
                    {<p className="text-sm"> 0/0 </p>}
                  </div>
                  {/* EXP Progress */}
                  <div className="w-full h-1.5 rounded-full overflow-hidden bg-black">
                    <div
                      className={`h-1.5 rounded-full from-[#96D6FF] bg-gradient-to-r to-[#448FF3] w-[0%]`}
                    >
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-start my-2">
                  <p className="whitespace-nowrap">Total earnings:</p>
                  <div className="text-right">
                    <p className="font-bold text-[#8DB54B] whitespace-nowrap">
                    {state.totalEarnings } BLC
                    </p>
                    <p className="font-bold whitespace-nowrap">= {state.totalEarnings} USD</p>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-start">
                  <p className="whitespace-nowrap">Matches played:</p>
                  <p className="font-bold ">{state.matchesPlayed ? state.matchesPlayed : 0}</p>
                </div>
                <div className="flex flex-row justify-between items-start">
                  <p className="whitespace-nowrap">Total wins:</p> 
                  <p className="font-bold ">{state.totalWins ? state.totalWins : 0}</p>
                </div>
                <div className="flex flex-row justify-between items-start">
                  <p className="whitespace-nowrap">Total losses:</p>
                  <p className="font-bold ">{state.totalLosses ? state.totalLosses : 0}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* AVATAR */}
        <div
          className="col-span-4 xl:px-10 flex flex-col items-center h-full cursor-pointer"
          onClick={() => setActiveTab("avatar")}
        >
          <div className="relative max-w-[330px] max-h-[440px] rounded-xl border-2 border-[#284C61] p-4">
            {/* Accessories */}
            <div className="absolute top-0 right-0 w-15 h-15 p-4 rounded-xl cursor-pointer  from-[#1B334B] bg-gradient-to-tl to-[#418AB8]">
              <img src={ICShirt} alt="shirt" className="h-11 w-11" />
            </div>
            <img
              src={state.user.avatar_image}
              alt="avatar"
              className="w-full object-contain text-center"
            />
            {/* Level */}
            <div className="absolute bottom-0 left-0 w-12 h-12 rounded-xl cursor-pointer from-[#131B24] bg-gradient-to-tr to-[#2E363F]">
              <p className="font-bold text-xl text-center leading-[44px]">{state.user.level}</p>
            </div>
          </div>
        </div>
        {/* Community */}
        <div className="col-span-4 shadow-[0_0_15px_5px_rgba(0,0,0,0.7)]">
          <div className="flex flex-col justify-center gap-8 shadow-2xl bg-[#0F181C] p-6">
            <p className="text-2xl font-bold text-center">Community</p>
            <div className="flex flex-row justify-between">
              <p className="">Posts</p>
              <p className="font-bold">{state.postCount ? state.postCount : 0}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="">Followers</p>
              <p className="font-bold">{state.followersCount ? state.followersCount : 0}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="">Following</p>
              <p className="font-bold">{state.followingCount ? state.followingCount : 0}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="">Friends</p>
              <p className="font-bold">{state.friendCount ? state.friendCount : 0}</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="">My sell orders</p>
              <p className="font-bold">0</p>
            </div>
            {userID === getUserID() && <button
              className="self-center px-10 h-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
              onClick={() => navigate("/profile-detail", {state: {id: userID}})}
            >
              PROFILE DETAILS
            </button>}
          </div>
        </div>
      </div>

      {/* Achievement */}
      <div className="mt-52 w-full shadow-[0_0_15px_5px_rgba(0,0,0,0.7)]">
        <div className="flex flex-row  h-[55px] from-[#1B334B] bg-gradient-to-l to-[#418AB8] border-l-[5px] border-[#95BE4C]">
          <p className="flex flex-1 items-center justify-center">Trophy</p>
          <p className="flex flex-1 items-center justify-center">Badge</p>
          <p className="flex flex-1 items-center justify-center">
            Favorite Game
          </p>
          <p className="flex flex-1 items-center justify-center">Clan</p>
          <p className="flex flex-1 items-center justify-center">
            MMR <img src={ICTrophy} alt="helper" className="w-4 h-4 ml-2" />
          </p>
          <p className="flex flex-1 items-center justify-center">Ranking</p>
        </div>
        <div className="flex flex-1 flex-row items-center h-[177px] bg-[#28282830]">
          <div
            className="flex flex-1 flex-col gap-6 items-center cursor-pointer"
            onClick={() => navigate("/profile-trophy", { state: { id: userID} })}
          >
            <img
              src={ICTrophy}
              alt="Trophy"
              className="w-[65px] h-[65px] object-cover rounded"
            />
            <p className="text-xl">{state.userTrophies ? state.userTrophies : 0}</p>
          </div>
          <div
            className="flex flex-1 flex-col gap-6 items-center cursor-pointer"
            onClick={() => navigate("/profile-badge", { state: { id: userID} })}
          >
            <img
              src={ICBadge}
              alt="Badge"
              className="w-[65px] h-[65px] object-cover rounded"
            />
            <p className="text-xl">{state.userBadges ? state.userBadges : 0}</p>
          </div>
          <div className="flex flex-1 flex-col gap-6 items-center">
            <img
              src={NoContent}
              alt="Favorite Game"
              className="w-[65px] h-[65px] p-1 object-cover rounded bg-black border-2 border-[#418AB8] border-solid "
            />
            {/* <p className="text-xl">-</p> */}
          </div>
          <div className="flex flex-1 flex-col gap-6 items-center">
            <img
              src={NoContent}
              alt="Clan"
              className="w-[65px] h-[65px] object-cover rounded"
            />
            {/* <p className="text-xl">-</p> */}
          </div>
          <div className="flex flex-1 flex-col gap-6 items-center">
            <div className="w-[65px] h-[65px] leading-[65px] rounded text-center text-2xl font-bold text-[#95BE4C]">
              0
            </div>
            <p className="text-xl">-</p>
          </div>
          <div className="flex flex-1 flex-col gap-6 items-center">
            <img
              src={ICSilverMember}
              alt="Ranking"
              className="w-[65px] h-[65px] object-cover rounded"
            />
            <p className="text-xl">-</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileTotal;
