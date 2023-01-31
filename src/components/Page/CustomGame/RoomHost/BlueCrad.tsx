import React, { useState } from 'react';
import Avatar from "@Image/Home/avatar.png";
import clanlogo from "@Image/clanlogo_demo.jpg";
import Moveposition from "@Image/CustomGame/MovePosition.png";
import { ReactComponent as Ping_good } from "@Image/CustomGame/ic_connection_good.svg";
import { ReactComponent as Ping_medium } from "@Image/CustomGame/ic_connection_medium.svg";
import { ReactComponent as Ping_weak } from "@Image/CustomGame/ic_connection_weak.svg";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/outline";
import { UserIcon, XIcon, } from "@heroicons/react/solid";
import SelectAmount from './SelectAmount';
import { Popover, Drawer } from 'antd';
import InviteFriend from "./Invitefriend";
import lock from "@Image/Matchmaking/ic_lock.png"
import { getUserID } from '../../../../Token';


const BlueCrad = ({ team, teamID, gameParticipantPerTeam, betAmount }: any) => {
    const remainingTeamUsers = Array(gameParticipantPerTeam - team.length).fill(0);
    const lockedUsers = Array((5-team.length) - remainingTeamUsers.length).fill(0);
    const [showPopup, setShowPopup] = useState(false);
    const [invite, setInvite] = useState(false);

    const content = () => {
        return (
            <div className="w-24 h-24 bg-[#182c36] m-0 flex flex-col justify-center items-center shadow-xl cursor-pointer rounded-full">
                <div className="flex items-center">
                    <UserIcon className="w-7 h-10 text-white" />
                    <XIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-primary-sky uppercase text-xl font-semibold">kick</span>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-3 xl:grid-cols-5 gap-4 h-full pl-6 2xl:pl-12 pr-5 w-full" >

            {team.map((participant:any, index:number) => {
                return (
                <Popover key={`blueCard_${participant.User.avatar_unique_name}`} content={content} trigger={"click"} getPopupContainer={trigger => trigger}>
                    <div className="relative">
                        <div className="w-full h-[250px] bg-gradient-to-tl from-[#0d1d25] to-[#102f3b] border-2 border-primary-sky rounded-2xl relative ">
                            <img src={participant.User.avatar_image} className="w-full h-full object-contain" />
                            <div className="absolute top-2 flex left-0 w-full h-1 rounded-md justify-center p-1">
                                {/* <img src={clanlogo} className="w-6 h-6 mr-1 " /> */}
                                <p className="font-medium text-lg shadow-[0_16px_15px_2px_#fff] ">
                                    {participant.User.avatar_unique_name}
                                </p>
                            </div>
                            <div className="absolute bottom-24 flex left-0 w-full h-1 rounded-md justify-center  p-1">
                                <p className="text-[30px] font-semibold uppercase shadow-[0_25px_20px_5px_#fff]">
                                    {participant.status == "ReadyToGamePlay" ? "ready" : ""}
                                </p>
                            </div>
                            <div className="absolute -bottom-1 -left-1 w-10 h-10 bg-primary-dark rounded-md font-bold text-center text-2xl p-1">{participant.User.level}</div>
                            <Ping_medium className="w-6 h-6 absolute bottom-2 right-3" />
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="font-bold text-lg text-center mt-1 bg-[#080d0f] rounded-md w-20">{participant.bet_amount} USD</p >
                            <p className="font-bold text-sm text-center text-primary-green">= {participant.bet_amount  } BLC</p>
                        </div>
                    </div>
                </Popover>
                )
            })}
            
            {remainingTeamUsers.map( (data:any, index:number) => {
                return (
                    <div key={`remainUser_${index}`}>
                    <div className="w-full h-[250px]  bg-gradient-to-tl from-[#0d1d25] to-[#102f3b] border-2 border-primary-sky rounded-2xl relative flex justify-center items-center">
                        <div className="w-24 h-24  rounded-full cursor-pointer bg-black/30 flex justify-center items-center"
                            onClick={() => {
                                setInvite(true)
                            }}
                        >
                            <PlusIcon className="text-white/50 w-14 " />
                        </div>
    
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="font-bold text-lg text-center mt-1 bg-[#080d0f] rounded-md w-20">{betAmount} USD</p >
                        <p className="font-bold text-sm text-center text-primary-green">= {betAmount } BLC</p>
    
                    </div>
                </div>
                )
            })}
            {lockedUsers.map((lockU:any, key:number) => {
                return (
                    <div key={`lockedUserBlue_${key}`}>
                        <div className="w-full h-[250px]  bg-primary-sky/30 border-2 border-primary-sky rounded-2xl relative flex items-center justify-center">
                            <div className="w-full h-full bg-primary-sky clip-path flex items-center justify-center absolute z-[0]" >
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
            <Drawer title={false} closable={false} placement="right" onClose={() => setInvite(false)} visible={invite}
                className="p-0 overflow-hidden"
                width={340} zIndex={40}
            >
                <InviteFriend setInvite={setInvite} teamID={teamID}/>
            </Drawer>

        </div>
    );
}

export default BlueCrad;