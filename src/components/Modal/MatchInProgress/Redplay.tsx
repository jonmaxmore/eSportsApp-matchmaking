import React, { useState } from "react";
import Avatar from "@Image/Home/avatar.png";
import clanlogo from "@Image/clanlogo_demo.jpg";
import { ReactComponent as Loading } from "@Image/loaderNew.svg";
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

  return (
    <div className="grid grid-cols-3 xl:grid-cols-5 gap-4 h-full w-full px-5">
      return (
      <div>
        <div className="w-[650px] h-[250px] bg-[red] border-2 border-[#f64a51]  relative">
          <div className="absolute w-full h-full flex justify-center items-center z-0">
            <p className="font-bold text-[20px] text-white TextShadow">
             
            </p>

          
          </div>
        </div>
      </div>
      <button
              className="border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44 rounded-sm"
            //  onClick={null}
            >
              START GAME
            </button>
      );
    </div>
  );
};

export default Redplay;
