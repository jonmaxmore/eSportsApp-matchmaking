import React, { useState } from "react";
import clsx from "clsx";
import { useSearchMatchContext } from "@Context/SearchMatch";
import { XIcon, MinusIcon } from "@heroicons/react/outline";
import { ReactComponent as Loadingicon } from "@Image/loading.svg";
import {  useNavigate  } from "react-router-dom";


interface Props{
    MatchPopup:boolean;
    SetMatchPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const ComingSoon = ({MatchPopup,SetMatchPopup,}:Props) => {
  const navigate = useNavigate();
    return (
        <div className="w-[600px] h-[450px] bg-primary-dark text-black">
          <div className="h-[55px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5">
            <p className="text-white text-center uppercase font-bold text-base">
              Under Construction
            </p>
           
          </div>
          <div className="flex flex-col items-center pt-12 gap-2">
            <div className="flex  items-center p-5 ml-8 mt-5">
                <p className="text-white ">We sincerely apologize for the inconvenience. 
              Our Platform is currenty undergoing scheduled maintenance and upgrades. Thank you for your patience.</p>
              {/* <span className="text-white "></span> */}
            </div>
            <button
              className="mt-20 bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
              onClick={() => {navigate(`/matchmaking`);SetMatchPopup(false)}}
            >
              OKAY
            </button>
          </div>
        </div>
      )
}

export default ComingSoon;