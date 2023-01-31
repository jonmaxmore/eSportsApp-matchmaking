import React, { useEffect, useReducer, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import NotificationsAPI from "@api/NotificationsAPI";
import moment from "moment";
import { socket } from "@Utils/socket";
import GameAPI from "@api/MatchmakingAPI";
import { useSearchMatchDispatch } from "@Context/SearchMatch";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { getUserID } from "../../Token";

interface Props {
    setIsOpenNotification: (show: boolean) => void;
    notifications: any;
    setNotifications: any;
    setUnReadNotiCount: any;
    unReadNotiCount:any;
}

const Notification = ({ setIsOpenNotification, notifications,setNotifications, unReadNotiCount, setUnReadNotiCount }: Props) => {
    const [activeData, setActiveData] = useState({ activePage: 1, totalPage: 1, limit: 10 });
    // const [notifications, setNotifications] = useState([]);
    const context = useSearchMatchDispatch();
    const navigate = useNavigate();
    
    
    useEffect(() => {
        const id = setInterval(() => {
           
            //getUserNotifications(activeData);
    
        }, 1500);
        return () => clearInterval(id);
    }, []);
    // useEffect(() => {
    //     getUserNotifications(activeData);
    // },[activeData]);

    // const getUserNotifications = (data:any) => {
    //     NotificationsAPI.getUserNotifications(data)
    //     .then(res => {
    //         if (res.data.success) {
    //             setActiveData({ activePage: activeData.activePage, totalPage: res.data.totalCounts, limit: activeData.limit });
    //             setNotifications(res.data.notifications);
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    const clearIndividualNotiHandler = (id: number, index: number) => {
       
        NotificationsAPI.clearIndividualNotificationAPI(id)
        .then(res => {
            if (res.data.success) {
                const tempNotifications:any = _.cloneDeep(notifications);
                const updateNotification:any = tempNotifications[index];
                updateNotification.is_read = !updateNotification.is_read;
                tempNotifications.splice(index,1, updateNotification);
                setNotifications(tempNotifications);
                setUnReadNotiCount(unReadNotiCount - 1);
            }
        }).catch(err => {
            console.log(err)
     
        })
  
    }

    const clearAllNotificationHandler = () => {
        NotificationsAPI.clearNotifications()
        .then(res => {
            if (res.data.success) {
                setUnReadNotiCount(0);
                setNotifications([]);
            }
        }).catch(err => {
            console.log(err)
        })
    }


    console.log(notifications);
    const searchTeam = (team_room_id: any) => {
    if (team_room_id != "") {
        socket.emit("search_team", team_room_id);
    }
    };

    const joinMatchHandler = (team: any, game: any , from_user_id: any) => {
        const postData = {
          team_id: team.id,
          game_id: game.id,
          bet_amount: team.individual_amount,
          from_user_id: from_user_id
        }
    
        GameAPI.joinMatch(postData)
        .then(res => {
          if (res.data.success) { 
            const team_room_id = "team_room_"+team.id;
            searchTeam(team_room_id);
            // add data to context
            const contextData = {
              team_id: team.id,
              team_room_id: team_room_id, 
              is_team_fulfilled: false,
              betAmount: team.individual_amount,
              amountToBlc: team.individual_amount ,
              game_id: game.id,
              gameName: game.name_en,
              imageUrl: game.game_image_url,
              gameIcon: game.game_icon,
              numberOfPlayerPerTeam: game.number_of_participant_per_team
            }
            context._addSearchMatchDetails(contextData);
            // end
            const data = {
              team_room_id: team_room_id,
            }
            socket.emit("set_join_game_participant", data); 
            const room1 = {
                room_id: `${getUserID()}_${from_user_id}`,
                toUserID: from_user_id
            }
            const room2 = {
                room_id: `${from_user_id}_${getUserID()}`,
                toUserID: from_user_id
            }
            socket.emit("set_notification", room1); 
            socket.emit("set_notification", room2); 
            setIsOpenNotification(false);
            navigate("/matchmaking/lobbymyteam",{ state: { team_id: team.id, team_room_id: team_room_id } });
          } else {
            console.log(res.data);
          }
        }).catch(err => {
          console.log(err)
        })
      }
    return (
        <div className="w-[600px] h-full bg-primary-dark/90 backdrop-blur-sm text-black">
            <div className="h-[75px] bg-gradient-to-r from-[#1a394b] to-[#10202b] relative p-5 flex items-center justify-center ">
                <p className="text-white text-center uppercase font-bold text-base">
                    notification
                </p>
                <button onClick={() => { setIsOpenNotification(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-4 shadow-xl right-4">
                    <XIcon className="text-white w-9 stroke-[2.5px]" />
                </button>
            </div>
            <div className="h-[calc(100vh-340px)] w-full py-8 px-6 overflow-y-auto flex flex-col gap-8">
                
                 {notifications.length > 0  && notifications.map((value: any, index:any) => {
                    if(!value.is_read){
                     if(value.type == "AcceptFrientRequest" || value.type == "RejectFrientRequest"){
                        return <div key={index} className="w-full px-4 text-white flex justify-between border-b-[1px] pb-8" >
                                    <div className="flex items-start">
                                        <XIcon onClick={() => {clearIndividualNotiHandler(value.id, index)}} className="text-white w-5 stroke-[3px] mr-6 cursor-pointer" />
                                        <div className="font-semibold text-white w-[450px]">
                                            <span className="text-primary-sky">{value.notification_title}</span>
                                            <span className="ml-1">{value.notification_text} </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-[#616566] inline whitespace-nowrap">{moment(new Date(value.created_at)).fromNow()}</p>
                                </div>
                     } else if (value.type == "MatchInvitation"){
                        const team = value.Team;
                        const game = value.Team.Game;
                        const vs = `${game.number_of_participant_per_team}Vs${game.number_of_participant_per_team}`;

                         return <div key={index} className="w-full px-4 text-white flex justify-between border-b-[1px] pb-8" >
                                    <div className="flex items-start">
                                        <XIcon onClick={() => {clearIndividualNotiHandler(value.id, index)}} className="text-white w-5 stroke-[3px] mr-6 cursor-pointer" />
                                        <div className="font-semibold text-white w-[450px]">
                                            <span className="text-primary-sky">{value.notification_title}</span>
                                            <span className="ml-1">inviteed you for a </span>
                                            <span className="text-primary-green">{vs} {game.name_en}</span>
                                            <span className="ml-1">match for </span>
                                            <span className="text-primary-sky">{team.individual_amount}$</span>
                                            <span className="ml-1">Respond now! </span>
                                            {value.Team.status == "Playing" || value.Team.status == "Played" ? <div className="flex gap-8 text-white font-bold">This session expired!</div>
                                             : <div className="flex gap-8">
                                                <button
                                                    className="bg-primary-sky/30 mt-5 w-52 h-12 text-white font-bold rounded-sm border-2 border-primary-sky uppercase"
                                                    onClick={() => { joinMatchHandler(team, game , value.from_user_id); clearIndividualNotiHandler(value.id, index) }}
                                                >
                                                    accept
                                                </button>
                                                <button
                                                    className=" mt-5 w-52 h-12 text-white font-bold rounded-sm border-2 border-primary-sky uppercase "
                                                    onClick={() => { clearIndividualNotiHandler(value.id, index) }}
                                                >
                                                    Decline
                                                </button>
                                            </div>}
                                        </div>
                                    </div>
                                    <p className="text-sm text-[#616566] inline whitespace-nowrap">{moment(new Date(value.created_at)).fromNow()}</p>
                                </div>
                     } else if (value.type == "MatchInvitationAccept") {
                         return <div className="w-full px-4 text-white flex justify-between border-b-[1px] pb-8" >
                                    <div className="flex items-start">
                                        <XIcon onClick={() => {clearIndividualNotiHandler(value.id, index)}} className="text-white w-5 stroke-[3px] mr-6 cursor-pointer" />
                                        <div className="font-semibold text-white w-[450px]">
                                            <span className="text-primary-sky">{value.notification_title}</span>
                                            <span className="ml-1">{value.notification_text}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-[#616566] inline whitespace-nowrap">{moment(new Date(value.created_at)).fromNow()}</p>
                                </div>
                     }
                    }
                    
                }) }
                {/* <div className="w-full px-4 text-white flex justify-between border-b-[1px] pb-8" >
                    <div className="flex items-start">
                        <XIcon className="text-white w-5 stroke-[3px] mr-6 cursor-pointer" />
                        <div className="font-semibold text-white w-[450px]">
                            <span className="ml-1">Ticket #DX334OK :check out the result in your mailbox!</span>
                        </div>
                    </div>
                    <p className="text-sm text-[#616566] inline whitespace-nowrap">Just Now</p>

                </div>
                <div className="w-full px-4 text-white flex justify-between border-b-[1px] pb-8" >
                    <div className="flex items-start">
                        <XIcon className="text-white w-5 stroke-[3px] mr-6 cursor-pointer" />
                        <div className="font-semibold text-white w-[450px]">
                            <span className="text-primary-sky">SolidxSnake</span>
                            <span className="ml-1">asked to join your clan. Respond now</span>

                            <div className="flex gap-8">
                                <button
                                    className="bg-primary-sky/30 mt-5 w-52 h-12 text-white font-bold rounded-sm border-2 border-primary-sky uppercase"
                                    onClick={() => { }}
                                >
                                    accept
                                </button>
                                <button
                                    className=" mt-5 w-52 h-12 text-white font-bold rounded-sm border-2 border-primary-sky uppercase "
                                    onClick={() => { }}
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-[#616566] inline whitespace-nowrap">Just Now</p>

                </div>
                <div className="w-full px-4 text-white flex justify-between border-b-[1px] pb-8" >
                    <div className="flex items-start">
                        <XIcon className="text-white w-5 stroke-[3px] mr-6 cursor-pointer" />
                        <div className="font-semibold text-white w-[450px]">
                            <span className="text-primary-sky">SolidxSnake</span>
                            <span className="ml-1">accepted you to join thier clan.Say Hi now! </span>
                        </div>
                    </div>
                    <p className="text-sm text-[#616566] inline whitespace-nowrap">Just Now</p>

                </div>
                <div className="w-full px-4 text-white flex justify-between border-b-[1px] pb-8" >
                    <div className="flex items-start">
                        <XIcon className="text-white w-5 stroke-[3px] mr-6 cursor-pointer" />
                        <div className="font-semibold text-white w-[450px]">
                            <span className="text-primary-sky">SolidxSnake,Dayvee13,SolidXSnake and 6 other</span>
                            <span className="ml-1">has joined your custom game. Check it out now </span>
                        </div>
                    </div>
                    <p className="text-sm text-[#616566] inline whitespace-nowrap">Just Now</p>

                </div> */}


            </div>
            {notifications.length == 0 ? <div className="h-[calc(100vh-340px)] w-full py-8 px-6 overflow-y-auto flex flex-col gap-8 text-white text-center font-bold">No notification found.</div> 
            : <button className = "text-primary-green uppercase w-full mt-8 text-center font-semibold" onClick={clearAllNotificationHandler}>clear all notifications</button>}

            
        </div>
    )
}

export default Notification;