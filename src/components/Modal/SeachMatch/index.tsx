import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useSearchMatchContext, useSearchMatchDispatch } from "@Context/SearchMatch";
import { XIcon, MinusIcon } from "@heroicons/react/outline";
import { ReactComponent as Loading }  from "@Image/loaderNew.svg"
import {  useNavigate  } from "react-router-dom";
import { socket } from "@Utils/socket";
import { useStopwatch } from "react-timer-hook";
import GameAPI from "@api/MatchmakingAPI";
import { useSearchOppoMatchContext } from "@Context/SearchOppoMatch";


interface Props{
    MatchPopup:boolean;
    SetMatchPopup: React.Dispatch<React.SetStateAction<boolean>>;
    SetCountdown: React.Dispatch<React.SetStateAction<boolean>>;
}



const CardConfirm = ({MatchPopup,SetMatchPopup,SetCountdown}:Props) => {

  const navigate = useNavigate();
    const { searchOppoMatch, SetSearchOppo }: any = useSearchOppoMatchContext();
    const [timerClock, setTimerClock] = useState("00:00");

    const context = useSearchMatchDispatch();
    const item = context.items;
    const betAmount = item.betAmount;
    const gameName = item.gameName;
    const team_id = item.team_id;
    const game_id = item.game_id;

    const cancelSearchHandler = () => {
      
      const inputData = {
        team_id: team_id,
        game_id: game_id,
        team_room_id: "team_room_"+team_id,
        for: "Match"
      }

    GameAPI.cancelSearchTeamOrMatch(inputData)
    .then(res => {
        if(res.data.success){
            SetSearchOppo.CancelOppoSearch();
            socket.emit("set_cancel_to_search_match", inputData);
            // navigate("/matchmaking/singleteam", { state: { team_id: team_id, team_room_id: inputData.team_room_id } })
          }else{
            console.log(res.data.message);
        }
        }).catch(err => {
        console.log(err)
        });
    }

    useEffect(() => {
      let timerCounter:any = null;
      var initialTime = Date.now();
      if(searchOppoMatch){
        timerCounter = setInterval( () => {
          checkTime();
        },1000); 

        var checkTime = () => {
          var timeDifference = Date.now() - initialTime;
          var formatted = convertTime(timeDifference);
          setTimerClock(formatted);
        }
    
        const convertTime = (miliseconds: any) =>  {
          var totalSeconds = Math.floor(miliseconds/1000);
          var minutes = Math.floor(totalSeconds/60);
          var seconds = totalSeconds - minutes * 60;
          return `${formatTime(minutes)}:${formatTime(seconds)}`;
        }

        const formatTime = (time: any) => {
          return String(time).padStart(2, '0')
        }
        
      }else {
        clearInterval(timerCounter);
        setTimerClock("00:00");
      }
      return () => clearInterval(timerCounter);
    },[searchOppoMatch])
    

    return (
        <div className="w-[600px] h-[450px] bg-primary-dark text-black">
          <div className="h-[55px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5">
            <p className="text-white text-center uppercase font-bold text-base">
              Matchmaking-{gameName}
            </p>
            <button onClick={() => SetMatchPopup(false)} className="bg-primary-light rounded-md p-1 absolute top-3 right-4">
              <MinusIcon className="text-white w-8" />
            </button>
  
          </div>
          <div className="flex flex-col items-center pt-12 gap-2">
            <div className="flex">
              <span className="text-white ">One moment, we are looking for the right team for you. You bet for</span>
              <span className="text-primary-sky ml-1.5 "> {betAmount} swordz</span>
  
            </div>
            <div className="flex mt-2 items-center">
              <span className="text-white ">Match Estimated time: </span>
              <span className="text-white font-bold ml-1.5 text-3xl  " id="time"> {timerClock}</span>
  
            </div>
            {/* animate-[spin_3s_linear_infinite] */}
            <Loading className="w-52 h-52 fill-primary-sky "/>
            <button
              className="mt-4 bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
              onClick={() => {
                cancelSearchHandler()
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      )
}

export default CardConfirm;