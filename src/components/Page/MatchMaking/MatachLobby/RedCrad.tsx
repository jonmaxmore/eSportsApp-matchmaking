import React, { useState } from 'react';
import Avatar from "@Image/Home/avatar.png";
import clanlogo from "@Image/clanlogo_demo.jpg";

import lock from "@Image/Matchmaking/ic_lock.png"
import pinggood from "@Image/Matchmaking/ic_connection_good.png"
import pingmed from "@Image/Matchmaking/ic_connection_medium.png"
import pingweak from "@Image/Matchmaking/ic_connection_weak.png"
//import console from 'console';


const RedCrad = ({ team ,data}: any) => {

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
    const locketUsers = Array(5-team.length).fill(0);
    
    return (
        <div className="grid grid-cols-3 xl:grid-cols-5 gap-4 h-full w-full px-5" >
            
            {team.map((participant:any, index:number) => {
                return (
                    <div key={index}>
                        <div className="w-full h-[250px] bg-[#3b1014] border-2 border-[#f64a51] rounded-2xl relative">
                            <img src={participant.User.avatar_image} className="w-full h-full object-contain" />
                            <div className="absolute top-2 flex left-0 w-full h-1 rounded-md justify-center p-1">
                                {/* <img src={clanlogo} className="w-6 h-6 mr-1 " /> */}
                                <p className="font-medium text-lg shadow-[0_25px_20px_10px_#98221a ">
                                    {participant.User.avatar_unique_name}
                                </p>
                            </div>
                            <div className="absolute bottom-24 flex left-0 w-full h-1 rounded-md justify-center  p-1">
                                <p className="text-[30px] font-semibold uppercase shadow-[0_25px_20px_10px_#98221a]">
                                    {participant.status == "ReadyToGamePlay" ? "ready" : ""}
                                </p>
                            </div>
                            <div className="absolute -bottom-1 -left-1 w-10 h-10 bg-primary-dark rounded-md font-bold text-center text-2xl p-1"> {participant.User.level}</div>
                            <img src={pinggood} className="absolute -bottom-[-5px] -right-[-5px] w-10 h-10 object-contain p-1" />

                        </div>
                        <div className="flex flex-col items-center">
                            <p className="font-bold text-lg text-center mt-1 bg-[#080d0f] rounded-md w-20">{participant.bet_amount} swordz</p >
                            <p className="font-bold text-sm text-center text-primary-green">= {participant.bet_amount } swordz</p>

                        </div>
                    </div>
                )
            })}
            {locketUsers.map((lockU:any, key:number) => {
                return (
                    <div>
                        <div className="w-full h-[250px] bg-[#3b1014] border-2 border-[#f64a51] rounded-2xl relative flex items-center justify-center ">
                            <div className="w-full h-full bg-[#f64a51] clip-path flex items-center justify-center absolute z-[0]" >
                            </div>
                            <div className="flex items-center justify-center w-24 h-24 z-[99]">
                                <div className="bg-[#0d1d26] rounded-full w-full h-full flex items-center justify-center">
                                    <img src={lock} className="w-20 h-20 object-contain " />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default RedCrad;