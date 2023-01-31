import React, { useEffect, useReducer, useState } from "react";
import bg from "@Image/Matchmaking/wallpaperLoL.jpg"
import pinggood from "@Image/Matchmaking/ic_connection_good.png"
import pingmed from "@Image/Matchmaking/ic_connection_medium.png"
import pingweak from "@Image/Matchmaking/ic_connection_weak.png"
import lock from "@Image/Matchmaking/ic_lock.png"
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
import GameAPI from "@api/MatchmakingAPI";
import { socket } from "@Utils/socket";
import { getName, getUserID } from "../../../../Token";
import AcceptGame from "@Components/Modal/Countdown";
import { useSearchOppoMatchContext } from "@Context/SearchOppoMatch";
// import { useSearchTimerContext } from "@Context/SearchTimer";

interface Player {
    avatar: any,
    clanlogo: any,
    name: string,
    status: boolean,
    level: number,
    amount: number,
    blc: number,
    ping: any,
}

const LobbyMyTeam = () => {
    const { searchMatch, SetSearch }: any = useSearchMatchContext();
    const { searchOppoMatch, SetSearchOppo }: any = useSearchOppoMatchContext();
    // const { searchTimer, SetSearchTimer }: any =  useSearchTimerContext();

    const context = useSearchMatchDispatch();
    const [invite, setInvite] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()
    const stateData: any = location.state;
    const team_id = stateData.team_id;
    const team_room_id = stateData.team_room_id


    //console.log(stateData)

    const [state, setState] = useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }),
        {
            team: {
                Game: {}
            },
            teamParticipants: [],
            game: ""
        }
    );

    const [matchID, setMatchID ] = useState(0);
    const [lobbyRoomID, setLobbyRoomID] = useState("");
    const [Countdown, SetCountdown] = useState(false);
    const [MatchPopup, SetMatchPopup] = useState(false);

    
    useEffect(() => {
        getFoundTeamDetailAndParticipants(team_id)
      }, [])

    useEffect(() => {
        socket.on("get_ready_user", (data) => {
            getFoundTeamDetailAndParticipants(team_id)
        });

        socket.on("get_cancel_to_search_match", (data) => {
            SetSearchOppo.CancelOppoSearch();
            getFoundTeamDetailAndParticipants(team_id)
        });

        socket.on("get_countdown_cancel_search", (data) => {
            if(data.is_match_fulfilled){
                SetSearchOppo.CancelOppoSearch();
                setMatchID(data.match_id);
                setLobbyRoomID(data.lobby_room_id);
                SetCountdown(true);
            }
        });
    }, [socket]);
    
    const getFoundTeamDetailAndParticipants = (id: number) => {
        GameAPI.getTeamsParticipants(id)
            .then(res => {

            if(res.data.success){
                setState({
                    team: res.data.team,
                    teamParticipants: res.data.teamParticipant,
                    game: res.data.team.Game
                })
            }else{
                console.log(res.data.message);
            }
            }).catch(err => {
            console.log(err)
            });
    }

    
    const content = () => {
        return (
            <div className="w-24 h-24 bg-[#182c36] m-0 flex flex-col justify-center items-center shadow-xl rounded-full">
                <div className="flex items-center">
                    <UserIcon className="w-7 h-10 text-white" />
                    <XIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-primary-sky uppercase text-xl font-semibold">kick</span>
            </div>
        )
    }
   
   
    const co = (dataco:any) => {


        
     // console.log(dataco)
    //  console.log(dataco)
    }


    const searchMatchLobby = (lobby_room_id: any) => {
        if (lobby_room_id != "") {
            socket.emit("search_match", lobby_room_id);
        }
    };

    const onReadyToSearchMatch = async () =>  {
        const postData = {
            team_id: state.team.id,
            game_id: state.team.Game.id,
           // match_id:
        }

        readyToSearchoppohandler(postData);

        GameAPI.searchOpponentTeam(postData)
            .then(res => {
                if (res.data.success) {
                    const lobby_room_id = "match_lobby_"+res.data.match.id;
                    searchMatchLobby(lobby_room_id);
                    const data = {
                        lobby_room_id:lobby_room_id,
                        team_room_id: team_room_id,
                        match_id: res.data.match.id,
                        is_match_fulfilled: res.data.is_match_fulfilled,
                        status: true
                    }
                    // getFoundTeamDetailAndParticipants(team_id)
                    // socket.emit("is_ready_to_oppo_search", data);
                    socket.emit("set_countdown_cancel_search", data);
                    socket.emit("ready_to_search", data);
                    // SetSearchTimer.setSearchTimerTrue();
                    SetSearchOppo.setSearchOppoMatchTrue();
                    // SetSearch.setSearchMatchTrue();
                    // SetMatchPopup(true)
                    if(res.data.is_match_fulfilled){
                        setMatchID(res.data.match.id);
                        setLobbyRoomID(lobby_room_id);
                        
                        setTimeout( () => {
                            // SetSearch.CancelSearch();
                            SetSearchOppo.CancelOppoSearch();
                            co(res.data)
                            SetCountdown(true);
                            // navigate(`/matchmaking/matachlobby`, { state: { match_id : res.data.match.id }});
                        },2000)
                    }

                } else {
                    console.log(res.data.message);
                }
            }).catch(err => {
                console.log(err)
            })
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

    const leaveRoomhandler = () => {
        const inputData = {
            team_id: state.team.id,
            game_id: state.team.Game.id,
            for: "Team"
        }

        GameAPI.leaveRoomOrTeam(inputData)
        .then(res => {
            if(res.data.success){
                const data = {
                    team_room_id: team_room_id,
                    team_id: state.team.id,
                    game_id: state.team.Game.id
                }
                socket.emit("leaved_team", data);
                socket.emit("leave_room", team_room_id);
                // socket.disconnect();
                // socket.connect();
                navigate(`/matchmaking/selectamount`,{ state: { id: state.team.Game.id ,timegame_item:1} })
            }else{
                console.log(res.data.message);
            }
            }).catch(err => {
            console.log(err)
            });
    }

    const Share = () => {
        return (
            <div className="  px-4 py-3 w-44 h-24 bg-primary-dark">
                <p className="font-white cursor-pointer normal-case text-base font-medium border-b-[2px] border-[#3C4042] mb-2 pb-3 text-left" style={{ color: "#fff" }}>Share to world</p>
                <p className="font-white  cursor-pointer normal-case text-base font-medium text-start text-left" style={{ color: "#fff" }}> Share to clan</p>

            </div>
        )
    }

    const CardPlayer = (data: any) => {
        return (
            <div>
                <div className="w-full h-[340px] bg-gradient-to-tl from-[#0d1d25] to-[#102f3b] border-2 border-primary-sky rounded-2xl relative">
                    <img src={data.User.avatar_image} className="w-full h-full object-contain" />





                    <div className="absolute top-2 flex left-0 w-full h-1 rounded-md justify-center p-1">
                        {/* <img src={clanlogo}  className="w-10 h-10 mr-1 " /> */}
                        <p className="font-medium text-2xl shadow-[0_16px_15px_2px_#fff] ">
                            {data.User.avatar_unique_name}
                        </p>
                    </div>
                    <div className="absolute bottom-24 flex left-0 w-full h-1 rounded-md justify-center  p-1">
                        <p id={`user_${data.User.id}`}  className="text-[35px] font-semibold uppercase shadow-[0_25px_20px_5px_#fff] hide">
                            {data.status == "ReadyToOppoSearch" ? "ready" : ""}
                            {/* {ready ? "ready" :  ""} */}
                        </p>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-10 h-10 bg-primary-dark rounded-md font-bold text-center text-2xl p-1"> {data.User.level}</div>
                    <img src={pinggood} className="absolute -bottom-[-5px] -right-[-5px] w-10 h-10 object-contain p-1" />

                </div>
                <div className="flex flex-col items-center">
                    <p className="font-bold text-2xl text-center mt-1 bg-[#080d0f] rounded-md w-25">{data.bet_amount} </p >
                    <p className="font-bold text-base text-center text-primary-green">= {data.bet_amount } Swordz</p>

                </div>
            </div>
        )
    }


    // // var lockedUser += '<html>';
    //     for (let index = 1; index <= 5-state.teamParticipants.length; index++) {
    //         let lockedUser = <div><div className="w-full h-[340px]  bg-primary-sky/30 border-2 border-primary-sky rounded-2xl relative flex items-center justify-center"><div className="w-full h-full bg-primary-sky clip-path flex items-center justify-center absolute z-[0]" ></div><div className="flex items-center justify-center w-24 h-24 z-[99]"><div className="bg-[#0d1d26] rounded-full w-full h-full flex items-center justify-center"><img src={lock} className="w-20 h-20 object-contain " /></div></div></div></div>;
    //     }
    const locketUsers = Array(5-state.teamParticipants.length).fill(0);

    return (
        <div
            style={{
                height: "calc(100vh - 110px)",
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
                        <div className="flex gap-4 mt-8 ">
                            <p className="text-2xl text-white">Individial:</p>
                            <div>
                                <p className="text-2xl text-white font-bold">{state.team.individual_amount} Swordz</p>
                               
                            </div>
                        </div>
                        <div className="flex gap-4 mt-6 ">
                            <p className="text-2xl text-white">Room:</p>
                            <div>
                                <p className="text-2xl text-white font-bold">{state.team.team_amount} Swordz  in total</p>
                                <p className=" text-primary-green text-base font-bold">= {state.team.team_amount } Swordz</p>
                            </div>
                        </div>
                        <Modal visible={showPopup} footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
                            <SelectAmount SetShowPopup={setShowPopup} />
                        </Modal>
                    </div>
                </div>

            </div>

            <div className=" mt-8 w-full h-auto">
                <div className="grid grid-cols-3 xl:grid-cols-5 gap-4 h-full mb-14" >
                    {state.teamParticipants.map((participant:any, index:number) => {
                        return (
                            <div key={index} className="w-full h-full">
                                <CardPlayer {...participant} />
                            </div>
                        )
                    })}
                    {locketUsers.map((lockU:any, key:number) => {
                        return (
                            <div key={key}>
                                <div className="w-full h-[340px]  bg-gradient-to-tl from-[#0d1d25] to-[#102f3b] border-2 border-primary-sky rounded-2xl relative flex items-center justify-center">
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
                </div>

                <div className="w-full flex justify-between">
                    <button className=" border-2 border-primary-sky text-white text-base cursor-pointer mt-4 mb-10 w-96 h-30 font-semibold uppercase py-2 px-4 rounded-sm"
                        onClick={() => { leaveRoomhandler(); }}

                    >
                        leave room
                    </button>
                    <button className="bg-primary-sky/30 border-2 border-primary-sky text-white text-base cursor-pointer mt-4 mb-10 w-96 h-16 font-semibold uppercase py-2 px-4 rounded-sm"
                        onClick={() => { onReadyToSearchMatch() }}
                    >
                        ready
                    </button>
                    <Drawer title={false} closable={false} placement="right" onClose={() => setInvite(false)} visible={invite}
                        className="p-0 overflow-hidden"
                        width={340} zIndex={40}
                    >
                        <InviteFriend setInvite={setInvite} />


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