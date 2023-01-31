import React from "react";
import { XIcon } from "@heroicons/react/outline";

interface Props {
    setShowInviteClan: (show: boolean) => void;
}

const Inviteclan = ({setShowInviteClan}:Props) => {
    return (
        <div className="w-[600px] bg-primary-dark text-black">
            <div className="h-[75px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5 flex items-center justify-center ">
                <p className="text-white text-center uppercase font-bold text-base">
                invite to clan
                </p>
                <button onClick={() => { setShowInviteClan(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-4">
                    <XIcon className="text-white w-9" />
                </button>
            </div>
            <div className="flex flex-col items-center py-12 gap-2">
                <div className="">
                    <span className="text-[#bdc0c1] font-normal ">An imvitaion has been notified to </span>
                    <span className="text-white font-bold">SirDominic.</span>
                    <span className="text-[#bdc0c1] font-normal "> Please wait for their response.</span>
                </div>
                <button
                    className="bg-primary-sky/30 mt-10 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => {  }}
                >
                    Got it
                </button>
            </div>


        </div>
    )
}

export default Inviteclan;