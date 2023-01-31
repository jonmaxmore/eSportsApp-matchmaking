import React, { useEffect, useReducer, useState } from "react";
import bg from "@Image/Matchmaking/wallpaperLoL.jpg"
import clanlogo from "@Image/clanlogo_demo.jpg"
import Avatar from "@Image/Home/avatar.png"
import { PlusIcon, UserIcon, XIcon } from "@heroicons/react/solid";
import { Popover, Drawer, Modal } from "antd";
import clsx from "clsx";
import "./style.css"
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchMatchContext, useSearchMatchDispatch } from "@Context/SearchMatch";
import InviteFriend from "./Invitefriend";
import SelectAmount from "./selectAmount";
import UpdatedBetAmount from "../../../Modal/ChangedAmount";

import pinggood from "@Image/Matchmaking/ic_connection_good.png"
import pingmed from "@Image/Matchmaking/ic_connection_medium.png"
import pingweak from "@Image/Matchmaking/ic_connection_weak.png"
import GameAPI from "@api/MatchmakingAPI";
import lock from "@Image/Matchmaking/ic_lock.png"
import { socket } from "@Utils/socket";
import { getUserID } from "../../../../Token";
import LeaveHost from "@Components/Modal/ChangeHost";
import { useSearchOppoMatchContext } from "@Context/SearchOppoMatch";
// import { useSearchTimerContext } from "@Context/SearchTimer";
import AcceptGame from "@Components/Modal/Countdown";
import MessageAPI from "@api/MessageAPI";
import moment from "moment";



const LobbyMyTeam = () => {
    const { searchMatch, SetSearch }: any = useSearchMatchContext();
    const { searchOppoMatch, SetSearchOppo }: any = useSearchOppoMatchContext();
    // const { searchTimer, SetSearchTimer }: any =  useSearchTimerContext();
    const [invite, setInvite] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [UpdateAmountPopup, SetUpdateAmountPopup] = useState(false);
    const [LeaveHostPopup, SetLeaveHostPopup] = useState(false);

    const [updatedBetAmount, setUpdatedBetAmount] = useState(0);

    const navigate = useNavigate();

    const location = useLocation();
    const stateData: any = location.state;
    const team_id = stateData.team_id;
    const team_room_id = stateData.team_room_id;

    const [state, setState] = useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }),
        {
            team: {
                Game: {
                    id: null,
                    number_of_participant_per_team: 0
                }
            },
            teamParticipants: [],
            game: "",
            oppoReadyUserCount: 0
        }
    );

    const [matchID, setMatchID ] = useState(0);
    const [lobbyRoomID, setLobbyRoomID] = useState("");
    const [Countdown, SetCountdown] = useState(false);

    const [amount, setAmount] = useState(0);
    const [dollarToBLC, setDollarToBLC] = useState(0);
    const [buttonName, setButtonName] = useState("Ready");
    const context = useSearchMatchDispatch();
    const item = context.items;
    const betAmount = item.betAmount;
    const gameName = item.gameName;
    console.log(item.game_id)
    useEffect(() => {
        getMyTeamParticipants(team_id);
    },[]);

    useEffect(() => {
        socket.on("get_join_game_participant", (data) => {
            console.log("get joined participant"); 
            
            getMyTeamParticipants(team_id);
        });

        socket.on("get_readytoOppoSearch_createTeam", (data) => {
            getMyTeamParticipants(team_id);
        });

        socket.on("get_update_bet_amount", (data) => {
            // console.log("data.amount",data.amount);
            // console.log("state.team.team_amount",state.team.individual_amount);

            // if(data.amount != state.team.individual_amount ){
                const postData = {
                    team_id: data.team_id,
                    game_id: data.game_id,
                }
                GameAPI.notReadyToSearchOppoTeam(postData)
                .then(res => {
                    if(res.data.success){
                        const socketData = {
                            team_room_id:"team_room_"+data.team_id, 
                        }
                        socket.emit("set_readytoOppoSearch_createTeam", socketData);
                        setUpdatedBetAmount(data.amount);
                        SetUpdateAmountPopup(true);
                        getMyTeamParticipants(team_id); 
                        setButtonName("Ready");
                        
                    }else{
                        console.log(res.data.message);
                    }
                    }).catch(err => {
                    console.log(err)
                    });
            // }
        });

        socket.on("get_host_leave", (data) => {
            if(data.is_host_leave){
                SetLeaveHostPopup(true);
            }
            getMyTeamParticipants(team_id);
            
        });

        socket.on("get_team_search", (data) => {
            // SetSearchTimer.setSearchTimerTrue();
            SetSearchOppo.setSearchOppoMatchTrue();
        });
    }, [socket]);

    useEffect(() => {
        socket.on("get_countdown_cancel_search", (data) => {
            console.log("get_countdown_cancel_search",data );
            
            if(data.is_match_fulfilled){
                SetSearchOppo.CancelOppoSearch();
                setMatchID(data.match_id);
                setLobbyRoomID(data.lobby_room_id);
                SetCountdown(true); 
            }
        });
    }, [socket])

    const getMyTeamParticipants = (team_id: number) => {

        GameAPI.getCreatedTeam(team_id)
      .then(res => {
        if (res.data.success) {
            setState({
                team: res.data.team,
                teamParticipants: res.data.teamParticipant,
                game: res.data.team.Game,
                oppoReadyUserCount: res.data.oppoReadyUserCount
            })
        } else {
          console.log(res.data.message);
        }
      }).catch(err => {
        console.log(err)
      })

    }


    const onSendInvitation = async (type: string) => {
        const data = {
            teamID: team_id,
            in_for: type,
            group_type: "Group",
            time: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        MessageAPI.sendInvitation(data)
            .then(res => {
                if(res.data.success){
                    let chatGroupName = res.data.messageData.ChatGroup.chat_group_name;
                    let data = {
                        chat_group_name: chatGroupName,
                        messageData: res.data.messageData
                    }
                    socket.emit("send_message", data);
                    // setSent(true)
                    // getInviteFriends(activeData)
                }
            })
    }

    const content = () => {
        return (
            state.team.host_id == getUserID() && <div className="w-24 h-24 bg-[#182c36] m-0 flex flex-col justify-center items-center shadow-xl rounded-full">
                <div className="flex items-center">
                    <UserIcon className="w-7 h-10 text-white" />
                    <XIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-primary-sky uppercase text-xl font-semibold">kick</span>
            </div>
        )
    }

    function Searching() {
        SetSearch.setSearchMatchTrue();
        navigate(`/home`)

    }


    const Share = () => {
        return (
            <div className="  px-4 py-3 w-44 h-24 bg-primary-dark relative">
                <p className="font-white cursor-pointer normal-case text-base font-medium border-b-[2px] border-[#3C4042] mb-2 pb-3 text-left" onClick={ () => { onSendInvitation("World")}} style={{ color: "#fff" }}>Share to world</p>
                {/* <p className="font-white  cursor-pointer normal-case text-base font-medium text-start text-left" style={{ color: "#fff" }} onClick={ () => { onSendInvitation("Clan")}}>  Share to clan</p> */}

            </div>
        )
    }

    const leaveRoomhandler = () => {
        const inputData = {
            team_id: state.team.id,
            game_id: state.team.Game.id
        }
        GameAPI.leaveCreatedTeamMatch(inputData)
        .then(res => {
            if(res.data.success){
                const data = { 
                    team_room_id: team_room_id, 
                    team_id: state.team.id,
                    game_id: state.team.Game.id,
                    is_host_leave: res.data.is_host_leave
                }
                socket.emit("set_host_leave", data);
                // socket.disconnect(); 
                navigate(`/matchmaking/selectamount`,{ state: { id: state.team.Game.id } })
            }else{
                console.log(res.data.message);
            }
            }).catch(err => {
            console.log(err)
            });
    }

    const updateBetAmountHandler = () => {
        const postData = {
            team_id: state.team.id,
            game_id: state.team.Game.id,
            amount: amount
        }

        GameAPI.updateBetAmountToTeam(postData)
        .then(res => {
            if(res.data.success){
                console.log(res.data.message);
                const data = {
                    team_room_id:"team_room_"+state.team.id,
                    amount: amount,
                    team_id: state.team.id,
                    game_id: state.team.Game.id,
                }
                socket.emit("set_update_bet_amount", data)
            }else{
                console.log(res.data.message);
            }
            }).catch(err => {
            console.log(err)
            });
    }

    const readyToSearchoppohandler = (postData: any) => {
        GameAPI.readyToOppoSearchTeam(postData)
        .then(res => {
            if(res.data.success){
                console.log(res.data.message);
            }else{
                console.log(res.data.message);
            }
            }).catch(err => {
            console.log(err)
            });
    }

    const searchMatchLobby = (lobby_room_id: any) => {
        if (lobby_room_id != "") {
            socket.emit("search_match", lobby_room_id);
        }
    };

    const participantReadyHandler = () => {
        const postData = {
            team_id: state.team.id,
            game_id: state.team.Game.id,
        }

        if(buttonName == "Ready"){

            readyToSearchoppohandler(postData);

            const trdata = {
                team_room_id: team_room_id,
            }
            socket.emit("set_readytoOppoSearch_createTeam", trdata)
            getMyTeamParticipants(state.team.id);
            setButtonName("Cancel");

            GameAPI.searchOpponentTeam(postData)
            .then(res => {
                if (res.data.success) {
                    console.log("on member ready ", res.data);
                    const lobby_room_id = "match_lobby_"+res.data.match.id;
                    searchMatchLobby(lobby_room_id);
                    const data = {
                        lobby_room_id:lobby_room_id,
                        team_room_id: team_room_id,
                        match_id: res.data.match.id,
                        is_match_fulfilled: res.data.is_match_fulfilled,
                        status: true
                    }
                   
                    socket.emit("set_countdown_cancel_search", data);

                } else {
                    console.log(res.data.message);
                }
            }).catch(err => {
                console.log(err)
            })
            
        }else{
            GameAPI.notReadyToSearchOppoTeam(postData)
            .then(res => {
                if(res.data.success){
                    const data = {
                        team_room_id:"team_room_"+state.team.id,
                    }
                    socket.emit("set_readytoOppoSearch_createTeam", data)
                    getMyTeamParticipants(team_id);
                    setButtonName("Ready");
                }else{
                    console.log(res.data.message);
                }
                }).catch(err => {
                console.log(err)
                });
        }
    }

    const onReadyToSearchMatch = async () =>  {
        
        const postData = {
            team_id: state.team.id,
            game_id: state.team.Game.id,
        }

        readyToSearchoppohandler(postData);

        GameAPI.searchOpponentTeam(postData)
            .then(res => {
                if (res.data.success) {
                    console.log("on ready host",res.data);
                    
                    // console.log("match id ", res.data.match.id);
                    const lobby_room_id = "match_lobby_"+res.data.match.id;
                    searchMatchLobby(lobby_room_id);
                    const data = {
                        lobby_room_id:lobby_room_id,
                        team_room_id: team_room_id,
                        match_id: res.data.match.id,
                        is_match_fulfilled: res.data.is_match_fulfilled,
                        status: true
                    }
                    socket.emit("set_team_search", data);
                    
                    socket.emit("set_countdown_cancel_search", data);
                    // SetSearchTimer.setSearchTimerTrue();
                    SetSearchOppo.setSearchOppoMatchTrue();
                    
                    if(res.data.is_match_fulfilled){
                        setMatchID(res.data.match.id);
                        setLobbyRoomID(lobby_room_id);
                        
                        setTimeout( () => {
                            SetSearchOppo.CancelOppoSearch();
                            SetCountdown(true);
                        },2000)
                    }

                } else {
                    console.log(res.data.message);
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const remainingTeamUsers = Array(state.team.Game.number_of_participant_per_team-state.teamParticipants.length).fill(0);
    const locketUsers = Array((5-state.teamParticipants.length) - remainingTeamUsers.length).fill(0);
   
    return (
        <div
            style={{
                height: "calc(100vh - 140px)",
            }}
            className="pt-6 px-12 overflow-y-auto"
        >
            <div
                style={{
                    backgroundImage: `url(${state.team.Game.cover_image_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "250px",
                    width: "100%",
                    position: "relative",
                }}
            >
                <div className="w-full h-full bg-gradient-to-r from-black flex justify-between items-end p-10">
                    <div>
                        <div className="flex gap-4 ">
                            <p className="text-2xl text-white">Type:</p>
                            <p className="text-2xl text-primary-sky font-bold">{state.team.Game.number_of_participant_per_team}vs{state.team.Game.number_of_participant_per_team} Matchmaking</p>
                        </div>
                        <div className="flex gap-4 mt-6 ">
                            <p className="text-2xl text-white">Room:</p>
                            <div>
                                <p className="text-2xl text-white font-bold">{amount ? `${amount*state.team.Game.number_of_participant_per_team} USD in total` : `${state.team.team_amount} USD in total`} </p>
                                { amount ? <p className=" text-primary-green text-base font-bold">= {(amount*state.team.Game.number_of_participant_per_team)} BLC</p> : <p className=" text-primary-green text-base font-bold">= {state.team.team_amount} BLC</p>} 
                            </div>
                        </div>
                        {state.team.host_id == getUserID() && <button className="bg-primary-sky/30 border-2 border-primary-sky text-white text-base cursor-pointer mt-4 mb-10 w-64 h-30 font-semibold uppercase py-2 px-4 rounded-sm"
                            onClick={() => setShowPopup(true)}
                        >
                            Select the amount
                        </button>}
                        <Modal visible={showPopup} footer={null} title={null} centered closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
                            <SelectAmount SetShowPopup={setShowPopup} amount={amount} setAmount={setAmount} dollarToBLC={dollarToBLC} setDollarToBLC={setDollarToBLC} updateBetAmountHandler={updateBetAmountHandler}/>
                        </Modal> 
                        <Modal visible={UpdateAmountPopup} footer={null} title={null} centered closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
                            <UpdatedBetAmount SetUpdateAmountPopup={SetUpdateAmountPopup} UpdateAmountPopup={UpdateAmountPopup} amount={updatedBetAmount} />
                        </Modal>
                        <Modal visible={LeaveHostPopup} footer={null} title={null} centered closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
                            <LeaveHost  LeaveHostPopup={LeaveHostPopup} SetLeaveHostPopup={SetLeaveHostPopup}/>
                        </Modal>
                    </div>
                    {/* <div className="relative">
                        <Popover content={content} trigger={"click"} >
                            <div className=" border-2  border-primary-sky text-white text-xl cursor-pointer w-52 h-30 font-bold uppercase py-3 px-2 rounded-sm">
                                share match
                            </div>
                        </Popover>
                        <div className=" absolute -bottom-1 px-4 py-3 -left-[155px] w-44 h-24 bg-primary-dark">
                            <p className="font-white cursor-pointer normal-case text-base font-medium border-b-[2px] border-[#3C4042] mb-2 pb-3 text-left">Share to world</p>
                            <p className="font-white  cursor-pointer normal-case text-base font-medium text-start text-left"> Share to clan</p>

                        </div>

                    </div> */}
                    <Popover content={Share} trigger={"click"} placement="left" getPopupContainer={trigger => trigger} >
                        <div className="relative border-2 text-center border-primary-sky text-white text-xl cursor-pointer w-52 h-30 font-bold uppercase py-3 px-2 rounded-sm">
                            share match
                        </div>
                    </Popover>



                </div>

            </div>

            <div className=" mt-8 w-full h-auto">
                <div className="grid grid-cols-3 xl:grid-cols-5 gap-4 h-full mb-14" >

                    {state.teamParticipants.map((participant:any, index:number) => {
                        if (participant.is_host == true) {
                            return <div key={index}>
                            <div className="w-full h-[340px] bg-primary-sky/30 border-2 border-primary-sky rounded-2xl relative">
                                <img src={participant.User.avatar_image} className="w-full h-full object-contain" />
                                <div className="absolute top-2 flex left-0 w-full h-1 rounded-md justify-center p-1">
                                    {/* <img src={clanlogo}  className="w-10 h-10 mr-1 " /> */}
                                    <p className="font-medium text-2xl shadow-[0_16px_15px_2px_#fff] ">
                                        {participant.User.avatar_unique_name}
                                    </p>
                                </div>
                                <div className="absolute bottom-24 flex left-0 w-full h-1 rounded-md justify-center  p-1">
                                    <p className="text-[35px] font-semibold uppercase shadow-[0_25px_20px_5px_#fff]">
                                        host
                                    </p>
                                </div>
                                <div className="absolute -bottom-1 -left-1 w-10 h-10 bg-primary-dark rounded-md font-bold text-center text-2xl p-1"> {participant.User.level}</div>
                                <img src={pinggood} className="absolute -bottom-[-5px] -right-[-5px] w-10 h-10 object-contain p-1" /> 
    
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-bold text-2xl text-center mt-1 bg-[#080d0f] rounded-md w-25">{amount ? `${amount} USD` : `${participant.bet_amount} USD`}</p >
                                <p className="font-bold text-base text-center text-primary-green">= {amount ? `${amount }` : `${participant.bet_amount }`} BLC</p>
    
                            </div>
    
                        </div>
                        } else {
                            return <Popover content={content} trigger={"click"} >
                            <div key={index}>
                                <div className="w-full h-[340px] bg-primary-sky/30 border-2 border-primary-sky rounded-2xl relative">
                                    <img src={participant.User.avatar_image} className="w-full h-full object-contain" />
    
    
    
    
                                    <div className="absolute top-2 flex left-0 w-full h-1 rounded-md justify-center p-1">
                                        {/* <img src={clanlogo} className="w-10 h-10 mr-1 " /> */}
                                        <p className="font-medium text-2xl shadow-[0_16px_15px_2px_#fff] ">
                                            {participant.User.avatar_unique_name}
                                        </p>
                                    </div>
                                    <div className="absolute bottom-24 flex left-0 w-full h-1 rounded-md justify-center  p-1">
                                        <p className="text-[35px] font-semibold uppercase shadow-[0_25px_20px_5px_#fff]">
                                            {participant.status == "ReadyToOppoSearch" ? "ready" : ""}
                                        </p>
                                    </div>
                                    <div className="absolute -bottom-1 -left-1 w-10 h-10 bg-primary-dark rounded-md font-bold text-center text-2xl p-1"> {participant.User.level}</div>
                                    <img src={pinggood} className="absolute -bottom-[-5px] -right-[-5px] w-10 h-10 object-contain p-1" /> 
    
                                </div>
                                <div className="flex flex-col items-center">
                                <p className="font-bold text-2xl text-center mt-1 bg-[#080d0f] rounded-md w-25">{amount ? `${amount} USD` : `${participant.bet_amount} USD`}</p >
                                <p className="font-bold text-base text-center text-primary-green">= {amount ? `${amount }` : `${participant.bet_amount }`} BLC</p>
    
                                </div>
                            </div>
                        </Popover>
                        }
                    })}
                    {remainingTeamUsers.map( (data:any, index:number) => {
                        return <div key={index} className="mt-4 xl:mt-0">
                        <div className="w-full h-[340px] bg-primary-sky/30 border-2 border-primary-sky  rounded-2xl flex justify-center items-center"
                            style={{
                                zIndex: "999 !important",
                                opacity: "1"
                            }}
                            onClick={() => {
                                setInvite(true)
                            }}
                        >
                            <div className="w-36 h-36 bg-primary-dark/90 flex items-center justify-center rounded-full">
                                <PlusIcon className="text-white/50 w-24 " />
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                        <p className="font-bold text-2xl text-center mt-1 bg-[#080d0f] rounded-md w-25">{amount ? `${amount} USD` : `${betAmount} USD`}</p >
                                <p className="font-bold text-base text-center text-primary-green">= {amount ? `${amount }` : `${betAmount }`} BLC</p>
                        </div>
                    </div>
                    })}
                    {locketUsers.map((lockU:any, key:number) => {
                        return (
                            <div key={key}>
                                <div className="w-full h-[340px]  bg-primary-sky/30 border-2 border-primary-sky rounded-2xl relative flex items-center justify-center">
                                    <div className="w-full h-full bg-primary-sky clip-path flex items-center justify-center absolute z-[0]" >
                                    </div>
                                    <div className="flex items-center justify-center w-24 h-24 z-[99]">
                                        <div className="bg-[#0d1d26] rounded-full w-full h-full flex items-center justify-center">
                                            <img src={lockU} className="w-20 h-20 object-contain " />
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        )
                    })}

                </div>
                <div className="w-full flex justify-between">
                    <button className=" border-2 border-primary-sky text-white text-base cursor-pointer mt-4 mb-10 w-64 h-30 font-semibold uppercase py-2 px-4 rounded-sm"
                        onClick={() => leaveRoomhandler()} 

                    >
                        leave room
                    </button>
                    {state.team.host_id == getUserID() && <button className={clsx("bg-primary-sky/30 border-2 border-primary-sky text-white text-base cursor-pointer mt-4 mb-10 w-64 h-16 font-semibold uppercase py-2 px-4 rounded-sm",
                    state.oppoReadyUserCount != state.team.Game.number_of_participant_per_team-1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer")}
                        onClick={() => { onReadyToSearchMatch(); }}
                        // disabled={state.oppoReadyUserCount != state.team.Game.number_of_participant_per_team}
                    >
                        ready and start
                    </button>}
                    {state.team.host_id != getUserID() && <button className={clsx("bg-primary-sky/30 border-2 border-primary-sky text-white text-base cursor-pointer mt-4 mb-10 w-64 h-16 font-semibold uppercase py-2 px-4 rounded-sm")}
                        onClick={() => { participantReadyHandler() }}
                    >
                        {buttonName}
                    </button>}
                    <Drawer title={false} closable={false} placement="right" onClose={() => setInvite(false)} visible={invite}
                        className="p-0 overflow-hidden"
                        width={340} zIndex={40}
                    >
                        <InviteFriend teamID={team_id} betAmount={betAmount} setInvite={setInvite} />


                    </Drawer>
                </div>

            </div>
            <Modal
                visible={Countdown}
                footer={null}
                title={null}
                closable={false}
                bodyStyle={{ padding: "0px" }}
                className="p-0 w-full h-auto flex items-center justify-center"
            >
                <AcceptGame SetCountdown={SetCountdown} Countdown={Countdown} mID={matchID} lRoomID={lobbyRoomID}/>
            </Modal>
        </div>
    );
}

export default LobbyMyTeam;