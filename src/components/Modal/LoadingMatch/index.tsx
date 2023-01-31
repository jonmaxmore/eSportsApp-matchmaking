

import React, { useState, useEffect } from "react";
import "./style.css"
import { ReactComponent as Loading }  from "@Image/loaderNew.svg"
import { MinusIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { socket } from "@Utils/socket";
import { useSearchOppoMatchContext } from "@Context/SearchOppoMatch";

const LoadingMatch = ({ setLoadingMatchPopup, loadingMatchPopup ,gameName, matchID, socketLobbyRoom, teamID }: any) => {
    const navigate = useNavigate();
    const { searchOppoMatch, SetSearchOppo }: any = useSearchOppoMatchContext();

    useEffect( () => {
        socket.on("get_total_accepted_match_usercount", (data) => {
            if(data.isAllUserAccepted){
                setLoadingMatchPopup(false);
                navigate(`/matchmaking/matachlobby`, { state: { match_id : matchID, lobbyRoomID: socketLobbyRoom }});
            }
        });

        socket.on("get_not_acceptedTeam", (data) => {
          if(data.teamOneNotAcceptedId === teamID || data.teamTwoNotAcceptedId === teamID){
            setLoadingMatchPopup(false);
            socket.emit("leave_room", socketLobbyRoom);
            navigate("/matchmaking/singleteam", { state: { team_id: teamID, team_room_id: `team_room_${teamID}` } });
          }else{
            setLoadingMatchPopup(false);
            SetSearchOppo.setSearchOppoMatchTrue();
          }
      });
    }, [socket]);
    
    return (
        <div className="w-[600px] h-[400px] bg-primary-dark text-black">
        <div className="h-[55px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5">
          <p className="text-white text-center uppercase font-bold text-base">
            Matchmaking-{gameName}
          </p>
          {/* <button onClick={() => setLoadingMatchPopup(false)} className="bg-primary-light rounded-md p-1 absolute top-3 right-4">
            <MinusIcon className="text-white w-8" />
          </button> */}

        </div>
        <div className="flex flex-col items-center pt-12 gap-2">
          <div className="flex">
            <span className="text-white ">You will enter in lobby once all users accept the match.</span>
            <span className="text-white ">, please wait...</span>
          </div>
          <Loading className="w-52 h-52 fill-primary-sky "/>
        </div>
      </div>
    )
}

export default LoadingMatch;