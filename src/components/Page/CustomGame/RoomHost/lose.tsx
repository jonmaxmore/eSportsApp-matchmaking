import React from "react";
import {MinusIcon, XIcon } from "@heroicons/react/outline"
import {  useNavigate  } from "react-router-dom";

interface Props{
    lose:boolean;
    setLose: React.Dispatch<React.SetStateAction<boolean>>;
}


const LoseCard = ({lose,setLose, loseAmount}:any) => {

    const navigate = useNavigate();

    return (
        <div className="w-[700px] h-[350px] bg-[#0a0a0a] text-black scale-75 tall:scale-100">
          <div className="h-[55px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5">
            <p className="text-white text-center uppercase font-bold text-base"
              onClick={() => {
                
              }}
            >
              your team lost!
            </p>
            <button onClick={() =>{}} className="bg-primary-light rounded-md p-1 absolute top-3 right-4">
              <XIcon className="text-white w-8" onClick={() => {
                setLose(false);
              }}/>
            </button>
  
          </div>
          <div className="flex flex-col items-center pt-12 gap-2">
            <div className="flex">
              <span className="text-white ">Sorry to see that your team has lost the match. Your team lost </span>
              <span className="text-primary-sky ml-1.5 font-bold "> {loseAmount/2} USD </span>
              <span className="text-white ml-1"> to the opponent team.</span>
  
            </div>

            
            
            <button
              className="mt-16 bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
              onClick={() => {
                navigate("/customgame");
              }}
            >
              play again
            </button>
            <button
              className="mt-4  w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
              onClick={() => {
                setLose(false);
                navigate("/home")
              }}
            >
              leave
            </button>
          </div>
  
  
        </div>
    )

}

export default LoseCard;