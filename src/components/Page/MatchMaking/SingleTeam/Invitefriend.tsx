import React from 'react';
import { XIcon,CheckCircleIcon,UserAddIcon } from '@heroicons/react/solid';
import Avater from "@Image/Home/avatar.png";
import clsx from 'clsx';

interface Props {
    setInvite: React.Dispatch<React.SetStateAction<boolean>>
}
interface FriendListProps {
    img: any;
    name: string;
    lavel: number;
    status: string;
    inTeam: boolean;
}

const InviteFriend = ({setInvite}:Props) => {

    const OnlineFriend = [{
        img: Avater,
        lavel: 12,
        name: "Nguyen Van A2",
        status: "Online",
        inTeam: false
    },
    {
        img: Avater,
        lavel: 12,
        name: "Nguyen Van A2",
        status: "Online",
        inTeam: true
    },{
        img: Avater,
        lavel: 12,
        name: "Nguyen Van A3",
        status: "DOTA2",
        inTeam: true
    },{
        img: Avater,
        lavel: 12,
        name: "Nguyen Van A4",
        status: "Leauge of Legends",
        inTeam: false
    },]
    const OfflineFriend = [{
        img: Avater,
        lavel: 12,
        name: "Nguyen Van A5",
        status: "offline",
        inTeam: true
    },
    {
        img: Avater,
        lavel: 12,
        name: "Nguyen Van A6",
        status: "offline",
        inTeam: false
    },
    {
        img: Avater,
        lavel: 12,
        name: "Nguyen Van A7",
        status: "offline",
        inTeam: false
    },
    {
        img: Avater,
        lavel: 12,
        name: "Nguyen Van A8",
        status: "offline",
        inTeam: false
    },]

    const ColorStatus = (status: string) => {
        switch (status) {
            case "Online":
                return "text-primary-sky";
            default:
                return "text-primary-green";
        }
    }
    


    const FriendList = (value: FriendListProps) => {
        return (
            <div className = " flex justify-between items-center">
            
                <div  className = "flex items-centers">
                    <div className = "p-[10px] w-[60px] flex justify-center items-center relative">
                        <img src={value.img}  className = "h-[60px] w-[40px]" />
                        <p  className = "absolute bottom-0 left-0 w-[20px] h-[20px] bg-[#222C36] rounded-[5px]">{value.lavel}</p>
                    </div>
                    <div className = "flex flex-col items-start justify-center">
                        <p className = "text-[12px] mb-[5px] font-bold">{value.name}</p>
                        <p className = {clsx("text-[11px] font-medium text-primary-sky",ColorStatus(value.status))}>{value.status}</p>

                    </div>
                </div>

                <div className = "flex gap-[10px] items-center">
                    {value.inTeam ? 
                    <CheckCircleIcon className = "w-8 h-8 text-primary-sky cursor-pointer"/>
                     : <UserAddIcon className = "w-8 h-8 text-white cursor-pointer"/>}

                </div>
            </div>
        )

    }

    const OfflineFriendList = (value: FriendListProps) => {
        return (
            <div className = " flex justify-between items-center">
            
                <div  className = "flex items-centers">
                    <div className = "p-[10px] w-[60px] flex justify-center items-center relative">
                        <img src={value.img}   className = "h-[60px] w-[40px]" />
                        <p  className = "absolute bottom-0 left-0 w-[20px] h-[20px] bg-[#222C36] rounded-[5px]">{value.lavel}</p>
                    </div>
                    <div className = "flex flex-col items-start justify-center">
                        <p className = "text-[12px] mb-[5px] font-bold">{value.name}</p>
                        <p className = "text-[11px] font-medium text-slate-600">{value.status}</p>

                    </div>
                </div>
            </div>
        )

    }




    return (
        <div className = "relative">
            <div className = "w-full h-16 bg-gradient-to-r from-primary-light to-primary-dark border-l-4 border-primary-green text-white text-sm flex justify-between items-center p-4 uppercase font-bold">
                invite friends
                <div className = "w-10 h-10 bg-primary-light flex justify-center cursor-pointer  items-center rounded-md" onClick={() => setInvite(false)}>
                    <XIcon className = "w-7 h-7 text-white"/>
                </div>
            </div>
            <div className = "bg-[#0d1010] h-full font-light p-6 overflow-y-auto text-white  " style = {{
                height: 'calc(100vh - 240px)',
            }}>
                <p className = "text-[12px] mb-[10px] uppercase">
                    online friends (5)
                </p>
                {OnlineFriend.map((value: FriendListProps,index) => {
                    return (
                        <div key={index}><FriendList key={value.name} {...value} /></div>
                        
                    )
                })}
                <p className = "text-[12px] mb-[10px] uppercase mt-6">
                    online friends (5)
                </p>
                {OfflineFriend.map((value: FriendListProps,index) => {
                    return (
                        <div key={index}><OfflineFriendList key={value.name} {...value} /></div>
                    )
                })}
                
                
            </div>
            <div className = "absolute w-80 bg-[#253d4c] h-16 border-2 border-primary-sky cursor-pointer bottom-4 left-7 text-white font-bold uppercase text-xl flex  justify-center items-center "
             onClick = {() => setInvite(false)}>
                cancel
            </div>
        </div>
    );
}

export default InviteFriend;