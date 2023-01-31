import React from "react";
import { MinusIcon } from "@heroicons/react/outline"
import { useNavigate } from "react-router-dom";

interface Props {
  win: boolean;
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
  rewardAmount: any
}

const WinCard = ({ win, setWin, rewardAmount, userEarnAmount }: any) => {
  const navigate = useNavigate();

  return (
    <div className="w-[600px] h-[550px] bg-[#0a0a0a] text-black border-2 border-[#a6c764] shadow-[0_0px_10px_6px_rgba(137,165,81,0.7)] scale-75 tall:scale-100">
      <div className="h-[75px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5 flex items-center justify-center">
        <div className="text-white text-center relative uppercase font-bold text-xl border-y-2 px-10 border-primary-green  overflow-x-hidden shadow-[0px_0px_5px_1px_rgba(149,190,76,0.7)] "

          onClick={() => {

          }}
        >
          {/* shadow-[0px_0px_5px_1px_rgba(149,190,76,0.7),0_0px_5px_1px_rgba(149,190,76,0.7)] */}
          your team wins!
          <div 
          className = "absolute top-1.5 bottom-0 left-0 w-full h-2/4 border-x-2 border-primary-green "></div>
          <div className = "absolute top-0.5 bottom-0 left-2 w-[94%] h-[85%] border-x-2  border-primary-green "></div>
        </div>

      </div>
      <div className="flex flex-col items-center pt-20 gap-2">
        <div className = "relative h-8">
        <div className="source-beam top-4 -right-[210px] z-0"></div>
          <h1 className="text-white font-bold text-2xl shadow-[0_0px_4px_-5px_rgba(149,190,76,0.7)] absolute top-0 -right-[80px] z-40">Congratulations</h1>
          
        </div>

        <div className="flex mt-2">
          <span className="text-white ">Your team won the game. Your team total rewards are {rewardAmount} USD (exel. Individual bonus).</span>
        </div>
        <div className="flex mt-16 flex-col items-center uppercase ">
          <div>
            <span className="text-white text-lg font-bold tracking-wide"> you earned </span>
            <span className="text-primary-sky text-lg font-bold tracking-wide"> {userEarnAmount} USD </span>
            <span className="text-white text-lg font-bold tracking-wide">(incl. bonus) </span><br />
          </div>
          <p className="text-white text-lg font-bold tracking-wide"> from this match</p>
        </div>
        <button
          className="mt-4 bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
          onClick={() => {
            navigate("/matchmaking");
          }}
        >
          play again
        </button>
        <button
          className="mt-4  w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
          onClick={() => {
            setWin(false);
            navigate("/home")
          }}
        >
          leave
        </button>

      </div>


    </div>
  )

}

export default WinCard;