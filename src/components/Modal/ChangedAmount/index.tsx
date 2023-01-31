import React, { useState } from "react";
import clsx from "clsx";
import { useSearchMatchContext } from "@Context/SearchMatch";
import { XIcon, MinusIcon } from "@heroicons/react/outline";
import { ReactComponent as Loadingicon } from "@Image/loading.svg";
import {  useNavigate  } from "react-router-dom";


interface Props{
    UpdateAmountPopup:any;
    SetUpdateAmountPopup: any;
    amount: any
}

const UpdatedAmount = ({UpdateAmountPopup,SetUpdateAmountPopup,amount}:Props) => {
    
    return (
        <div className="w-[600px] h-[450px] bg-primary-dark text-black">
          <div className="h-[55px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5">
            <p className="text-white text-center uppercase font-bold text-base">
              Bet Amount Updated
            </p>
            <button onClick={() => SetUpdateAmountPopup(false)} className="bg-primary-light rounded-md p-1 absolute top-3 right-4">
              <MinusIcon className="text-white w-8" />
            </button>
          </div>
          <div className="flex flex-col items-center pt-12 gap-2">
            <div className="flex  items-center p-5 ml-8 mt-5">
                {/* <p className="text-white ">We sincerely apologize for the inconvenience. 
              Our Platform is currenty undergoing scheduled maintenance and upgrades. Thank you for your patience.</p> */}
              {/* <span className="text-white "></span> */}
              <span className="text-white ">Your host has changed bet amount. new bet amount</span>
              <span className="text-primary-sky ml-1.5 "> {amount} $</span>
            </div>
            <button
              className="mt-20 bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
              onClick={() => {
                SetUpdateAmountPopup(false)
              }}
            >
              OKAY
            </button>
          </div>
        </div>
      )
}

export default UpdatedAmount;