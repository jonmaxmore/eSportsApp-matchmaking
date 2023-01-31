import React from "react";
import { XIcon } from "@heroicons/react/outline"

const ChangeAmountAlert = ({ setChangeAmountPopup, newBetAmount }: any) => {

  return (
    <div className="w-[500px] bg-primary-dark text-black">
            <div className="h-[75px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5 flex items-center justify-center ">
                <p className="text-white text-center uppercase font-bold text-base">
                Alert
                </p>
                <button onClick={() => { setChangeAmountPopup(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-4">
                    <XIcon className="text-white w-9" />
                </button>
            </div>
            <div className="flex flex-col items-center py-12 gap-2">
                <div className="flex flex-col items-center text-center">
                    <div className="flex">
                        <span className="text-white ">The host hase changed the current bet amount to</span>
                        <span className="text-primary-sky ml-1.5 ">  {newBetAmount} USD.</span>
                    </div>
                    <div className="flex">
                        <span className="text-white ">If you are okay with that then click on okay otherwise you can leave.</span>
                    </div>
                </div>
                <button
                    className="bg-primary-sky/30 mt-10 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => {setChangeAmountPopup(false)} }
                >
                    Okay
                </button>
            </div>
        </div>
  )

}

export default ChangeAmountAlert;