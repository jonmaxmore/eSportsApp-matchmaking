import React, { useEffect, useState } from "react";
import { ReactComponent as Loading } from "@Image/loaderNew.svg"
import MaxAPI from "@api/MaxAPI";
import Showlive from "./showlive";

const MatchInProgress = ({ matchInProgressPopup, setMatchInProgressPopUp, gameName, ipserver,team,data,}: any) => {


  useEffect(() => {
    const id = setInterval(() => {
      MaxAPI.chackPlayLive()
        .then((res) => {
          if (res.data.success) {
            //setMatchInProgressPopUp(false)
           // setItem(res.data.live)

            //setShowlivef(true)
            
           // console.log(res.data);
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        })

    }, 1500);
    return () => clearInterval(id);
  }, []);
  const [item, setItem] =  useState("");
  const [timerClock, setTimerClock] = useState("00:00");
  const [lofdingg, setLofdingg] = useState(false);
  const [showlivef, setShowlivef] = useState(false);
  let gameWindow: any;
  const readyToplayHandler = async () => {

   // 

   if(ipserver == "dota2"){
    gameWindow = window.open(`steam://rungameid/570` , '_blank', 'width=1600,height=1024,center=true,frame=true');

    setTimeout(() => {
      setShowlivef(true)
      gameWindow.close();
      setMatchInProgressPopUp(false)
    }, 10000);

   }else {
    gameWindow = window.open(`steam://connect/13.212.69.180:27015` , '_blank', 'width=1600,height=1024,center=true,frame=true');

    setTimeout(() => {
      setShowlivef(true)
      gameWindow.close();
      setMatchInProgressPopUp(false)
    }, 10000);
   }

   


  }


  useEffect(() => {
    let timerCounter: any = null;
    var initialTime = Date.now();
    if (matchInProgressPopup) {
      timerCounter = setInterval(() => {
        checkTime();
      }, 1000);

      var checkTime = () => {
        var timeDifference = Date.now() - initialTime;
        var formatted = convertTime(timeDifference);
        setTimerClock(formatted);
      }

      const convertTime = (miliseconds: any) => {
        var totalSeconds = Math.floor(miliseconds / 1000);
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds - minutes * 60;
        return `${formatTime(minutes)}:${formatTime(seconds)}`;
      }

      const formatTime = (time: any) => {
        return String(time).padStart(2, '0')
      }

    } else {
      clearInterval(timerCounter);
      setTimerClock("00:00");
    }
    return () => clearInterval(timerCounter);
  }, [matchInProgressPopup])


  return (
    <>
    <button className="border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44 rounded-sm"
    
    onClick={readyToplayHandler}
    >START GAME</button>
    
    <Showlive
        item={gameName}
        visible={showlivef}
        setVisible={setShowlivef}
        team={team}
        data={data}
      />
    </>
  )
}

export default MatchInProgress;