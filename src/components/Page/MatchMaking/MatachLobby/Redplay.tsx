import React, { useState } from "react";
import Avatar from "@Image/Home/avatar.png";
import clanlogo from "@Image/clanlogo_demo.jpg";
import { ReactComponent as Loading } from "@Image/loaderNew.svg"
import lock from "@Image/Matchmaking/ic_lock.png";
import pinggood from "@Image/Matchmaking/ic_connection_good.png";
import pingmed from "@Image/Matchmaking/ic_connection_medium.png";
import pingweak from "@Image/Matchmaking/ic_connection_weak.png";
//import console from 'console';

const Redplay = ({ team, data }: any) => {
  const item_chack22 = data;
  // // console.log(data.match.totalPlayer);
  //  const locketUsers = Array( item_chack22-1-team.length).fill(0)

  // if(data.match.totalPlayer == 2){
  //     const locketUsers = Array(5-team.length).fill(0);
  // }else{
  //     const locketUsers = Array(5-team.length).fill(0);
  // }

  // if(data.match.totalPlayer == 2 ){

  //     SetlocketUsers(Array( 1-team.length).fill(0))
  // }
  const locketUsers = Array(1 - team.length).fill(0);

  return (
    <div className="grid grid-cols-3 xl:grid-cols-5 gap-4 h-full w-full px-5">
      {team.map((participant: any, index: number) => {
        return (
          <div key={index}>
            <div className="w-[650px] h-[250px] bg-[#3b1014] border-2 border-[#f64a51] rounded-2xl relative">
              <div className="absolute w-full h-full flex justify-center items-center z-0">
                <p className="font-bold text-[20px] text-white TextShadow">
                  conneting...
                  <Loading className="w-20 h-20 fill-success-sky TextShadow" />
                </p>
              </div>
            </div>
          </div>
        );
      })}
      {locketUsers.map((lockU: any, key: number) => {
        return (
          <div>
            <div className="w-full h-[250px] bg-[#3b1014] border-2 border-[#f64a51] rounded-2xl relative flex items-center justify-center ">
              <div className="w-full h-full bg-[#f64a51] clip-path flex items-center justify-center absolute z-[0]"></div>
              <div className="flex items-center justify-center w-24 h-24 z-[99]">
                <div className="bg-[#0d1d26] rounded-full w-full h-full flex items-center justify-center">
                  <img src={lock} className="w-20 h-20 object-contain " />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Redplay;
