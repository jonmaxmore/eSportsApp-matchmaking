import React, { useEffect, useState } from "react";
import { XIcon, CheckCircleIcon, UserAddIcon } from '@heroicons/react/solid';
import Avater from "@Image/Home/avatar.png";
import clsx from 'clsx';
import ModalSent from './sent';
import UserAPI from "@api/UserAPI";
import MessageAPI from "@api/MessageAPI";
import moment from "moment";
import { getUserID } from "../../../../Token";
import { socket } from "@Utils/socket";
import _ from "lodash";

interface Props {
    setInvite: React.Dispatch<React.SetStateAction<boolean>>
}

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
    UserParticipant: {};
    invite:boolean;
}

const InviteFriend = ({ setInvite, teamID }: any) => {

    const [isSent, setSent] = useState(false);
    const [activeData, setActiveData] = useState({ team_id: null, activePage: 1, totalPage: 1, limit: 10, search: "" });
    const [ onlineFriendData, setOnlineFriendData ] = useState([]);
    const [ offlineFriendData, setOfflineFriendData ] = useState([]);

    useEffect(() => {
        getInviteFriends(activeData)
    }, [])

    const getInviteFriends = (data: any) => {
    UserAPI.getInviteFriendListAPI(data)
        .then(res => {
        setActiveData({ team_id: null, activePage: activeData.activePage, totalPage: res.data.totalCounts, limit: activeData.limit, search: activeData.search });
        if(res.data.success){
            const online:any = res.data.online;
            online.map((ol:any) => {
                ol.invite = false
            })
            setOnlineFriendData(online);
            const offline:any = res.data.offline;
            offline.map((ofl:any) => {
                ofl.invite = false
            });
            setOfflineFriendData(offline);
        }else{
            setOnlineFriendData([]);
        }
        }).catch(err => {
        console.log(err)
        })
    }

    const onSendInvitation = async (recID: any, position: number) => {
        // setSent(true);
        const data = {
            teamID: teamID,
            senderID: getUserID(),
            receiverID: recID,
            in_for: "Friend",
            group_type: "Individual",
            time: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        MessageAPI.sendInvitation(data)
            .then(res => {
                if(res.data.success){
                    let chatGroupName = res.data.messageData.ChatGroup.chat_group_name;
                    let data = {
                        chat_group_name: chatGroupName,
                        messageData: res.data.messageData,
                        room_id: chatGroupName,
                        toUserID: recID
                    }
                    socket.emit("send_message", data);
                    socket.emit("set_notification", data); 
                    setSent(true);
                    const tempOnlineFriend:any = _.cloneDeep(onlineFriendData);
                    const editOnlineFriend:any = tempOnlineFriend[position];
                    editOnlineFriend.invite = true;
                    tempOnlineFriend.splice(position,1, editOnlineFriend);
                    setOnlineFriendData(tempOnlineFriend);
                }
            })
    }

    const ColorStatus = (status: boolean) => {
        switch (status) {
            case true:
                return "text-primary-sky";
            default:
                return "text-primary-green";
        }
    }


    const FriendList = ({value,position}: any) => {
        return (
            <div className=" flex justify-between items-center">

                <div className="flex items-centers">
                    <div className="p-[10px] w-[60px] flex justify-center items-center relative">
                        <img src={value.avatar_image} className="h-[60px] w-[40px]" />
                        <p className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-[#222C36] rounded-[5px]">{value.level}</p>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <p className="text-[12px] mb-[5px] font-bold">{value.avatar_unique_name}</p>
                        <p className={clsx("text-[11px] font-medium text-primary-sky", ColorStatus(value.is_online))}>{value.is_online ? "Online" : "Offline"}</p>

                    </div>
                </div>

                <div className="flex gap-[10px] items-center">
                    {value.UserParticipant || value.invite ?
                        <CheckCircleIcon className="w-8 h-8 text-primary-sky cursor-pointer" />
                        : <UserAddIcon className="w-8 h-8 text-white cursor-pointer"  
                     onClick={async () => {
                        await onSendInvitation(value.id, position);
                    }}/>}
                    <ModalSent avtarName={value.avatar_unique_name} visible={isSent} setVisible={setSent} />
                </div>
            </div>
        )

    }

    const OfflineFriendList = (value: FriendListProps) => {
        return (
            <div className=" flex justify-between items-center">

                <div className="flex items-centers">
                    <div className="p-[10px] w-[60px] flex justify-center items-center relative">
                        <img src={value.avatar_image} className="h-[60px] w-[40px]" />
                        <p className="absolute bottom-0 left-0 w-[20px] h-[20px] bg-[#222C36] rounded-[5px]">{value.level}</p>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <p className="text-[12px] mb-[5px] font-bold">{value.avatar_unique_name}</p>
                        <p className="text-[11px] font-medium text-slate-600">{value.status}</p>

                    </div>
                </div>
            </div>
        )

    }




    return (
        <div className="relative">
            <div className="w-full h-16 bg-gradient-to-r from-primary-light to-primary-dark border-l-4 border-primary-green text-white text-sm flex justify-between items-center p-4 uppercase font-bold">
                invite friends
                <div className="w-10 h-10 bg-primary-light flex justify-center cursor-pointer  items-center rounded-md" onClick={() => setInvite(false)}>
                    <XIcon className="w-7 h-7 text-white" />
                </div>
            </div>
            <div className="bg-[#0d1010] h-full font-light p-6 overflow-y-auto text-white  " style={{
                height: 'calc(100vh - 240px)',
            }}>
                <p className="text-[12px] mb-[10px] uppercase">
                    online friends ({onlineFriendData.length})
                </p>
                {onlineFriendData.map((value: any, index: number) => {
                    return (
                        <FriendList key={value.name} value={value} position={index} />
                    )
                })}
                <p className="text-[12px] mb-[10px] uppercase mt-6">
                    online friends ({offlineFriendData.length})
                </p>
                {offlineFriendData.map((value: FriendListProps) => {
                    return (
                        <OfflineFriendList key={value.name} {...value} />
                    )
                })}


            </div>
            <div className="absolute w-80 bg-[#253d4c] h-16 border-2 border-primary-sky cursor-pointer bottom-4 left-7 text-white font-bold uppercase text-xl flex  justify-center items-center "
                onClick={() => setInvite(false)}>
                cancel
            </div>
        </div>
    );
}

export default InviteFriend;