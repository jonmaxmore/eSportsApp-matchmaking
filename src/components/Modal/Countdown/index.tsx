import React, { useEffect, useState } from "react";
import "./style.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";
import { useSearchMatchDispatch } from "@Context/SearchMatch";
import GameAPI from "@api/MatchmakingAPI";
import { socket } from "@Utils/socket";
import { Modal } from "antd";
import LoadingMatch from "../LoadingMatch";
import { useSearchOppoMatchContext } from "@Context/SearchOppoMatch";

interface Props{
    Countdown:boolean;
    SetCountdown: React.Dispatch<React.SetStateAction<boolean>>;
    mID: number;
    lRoomID: string;
}

const CountDown = ({Countdown,SetCountdown, mID, lRoomID}:Props) => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(true);
    const [TimeRemaining, setTimeRemaining] = useState("");
    const [ loadingMatchPopup, setLoadingMatchPopup] = useState(false);
    const context = useSearchMatchDispatch();
    const item = context.items;

    const betAmount = item.betAmount;
    const gameName = item.gameName;
    const gameImageUrl = item.imageUrl
    const playerPerTeam = item.numberOfPlayerPerTeam
    const team_id = item.team_id;
    const game_id =item.game_id;
    const [matchId, setMatchID] = useState(mID);
    const [lobbyRoomID, setLobbyRoomID] = useState(lRoomID);

    function onUpdate(remainingTime: number) {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        const zeroS = seconds < 10 ? "0" : "";
        const zeroM = minutes < 10 ? "0" : "";
        setTimeRemaining(`${zeroM}${minutes}:${zeroS}${seconds}`);
        if(`${zeroM}${minutes}:${zeroS}${seconds}` === '00:00'){
            GameAPI.checkTeamAcceptedFoundMatchAPI(matchId)
                .then(res => {
                    if(res.data.success){
                        if(res.data.teamOneNotAcceptedId === team_id || res.data.teamTwoNotAcceptedId === team_id){
                            setTimeout(() => {
                                SetCountdown(false);
                                const socketData = {
                                    lobby_room_id: lobbyRoomID,
                                    teamOneNotAcceptedId: res.data.teamOneNotAcceptedId,
                                    teamTwoNotAcceptedId: res.data.teamTwoNotAcceptedId
                                }
                                socket.emit("set_not_acceptedTeam", socketData)
                                socket.emit("leave_room", lobbyRoomID);
                                navigate("/matchmaking/singleteam", { state: { team_id: team_id, team_room_id: `team_room_${team_id}` } });
                            }, 500);
                        }
                    }else{
                        console.log(res.data.message);
                    }
                    }).catch(err => {
                        console.log(err)
                    });
        }
    }

    const acceptMatchhandler = (_matchId: number, _lobbyRoomID: string) => {
        const inputData = {
            team_id: team_id,
            game_id: game_id,
            matchID: _matchId
        }
        GameAPI.acceptOppoMatch(inputData)
        .then(res => {
            if(res.data.success){
                setIsActive(!isActive);
                SetCountdown(false);
                const socketData = {
                    lobby_room_id: _lobbyRoomID,
                    isAllUserAccepted: res.data.isAllUserAccepted
                }
                socket.emit("set_total_accepted_match_usercount", socketData);
                if(res.data.isAllUserAccepted){
                    navigate(`/matchmaking/matachlobby`, { state: { match_id : _matchId, lobbyRoomID: _lobbyRoomID }});
                }else{
                    setLoadingMatchPopup(true);
                }
            }else{
                console.log(res.data.message);
            }
            }).catch(err => {
                console.log(err)
            });
    }

    return (
        <div className="w-[610px] h-[722px] flex justify-center items-center tall:scale-100 scale-75   relative ">
            <div className=" w-full h-full absolute top-2 left-2 z-0 overflow-hidden hexagon3">
                <div className="a -translate-x-[47px] translate-y-2  ">
                    <CountdownCircleTimer
                        isPlaying={isActive}
                        duration={60}
                        colors={["#58afe6", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[60, 40, 30, 10]}
                        strokeWidth={225}
                        rotation="clockwise"
                        size={695}
                        trailStrokeWidth={0}
                        strokeLinecap="butt"
                        onUpdate={onUpdate}
                    >
                        {({ remainingTime }) => remainingTime}
                    </CountdownCircleTimer>
                </div>
            </div>
            <div className="w-full h-full bg-primary-green hexagon1 absolute top-0 bottom-0 left-0 z-0 right-0"></div>
            <div className="w-[104%] h-[104%]  backdrop-blur-md hexagon1 absolute -top-3 only:z-20 "></div>
            <div className="w-[515px] h-[593px] stokehexagon bg-primary-green   absolute top-[63px] bottom-0 left-14 right-0 flex items-center z-20 justify-center"></div>
            <div className="w-[515px] h-[593px]  hexagon absolute top-[63px] bottom-0 left-14 right-0 flex items-center z-10 justify-center">
                <div className=" w-[98%] h-[98%] hexagonImg flex items-end p-16 justify-center relative">
                    <img src={gameImageUrl}  className="w-full h-full object-cover absolute top-0 left-0 right-0 Opacitygradient" />
                    <div className="w-full h-full  flex items-center justify-end flex-col absolute ">
                        <p className="font-bold text-[40px] text-white uppercase">match found</p>
                        <div>
                            <span className="text-white">{playerPerTeam}vs{playerPerTeam} Matchmaking</span>
                            <span className="text-primary-sky"> {betAmount}$</span>
                        </div>
                        <p className="font-bold text-[50px] text-white TextShadow">{TimeRemaining}</p>

                    </div>

                </div>
            </div>
            <button
                className="w-72 h-14 bg-[#253d4c] flex justify-center items-center uppercase font-semibold text-xl text-white absolute z-50 border-2 bottom-14 border-primary-sky cursor-pointer"
                onClick={() => {
                    acceptMatchhandler(matchId, lobbyRoomID)
                }}
            >
                Accept
            </button>
            <Modal
                visible={loadingMatchPopup}
                centered
                footer={null}
                title={null}
                closable={false}
                bodyStyle={{ padding: "0px" }}
                className="p-0 w-full h-auto flex items-center justify-center"
            >
                <LoadingMatch 
                    setLoadingMatchPopup={setLoadingMatchPopup} 
                    loadingMatchPopup={loadingMatchPopup} 
                    gameName={gameName} 
                    matchID={matchId} 
                    socketLobbyRoom={lobbyRoomID}
                    teamID={team_id}
                />
            </Modal>
        </div>
    );
};

export default CountDown;
