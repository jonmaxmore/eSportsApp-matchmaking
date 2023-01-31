import React from "react";
import { XIcon } from "@heroicons/react/outline";
import "./style.css"
import {  useNavigate  } from "react-router-dom";


const HostLeavePopup = ({ setShowPopup, roomName, betAmount }: any) => {

    const navigate = useNavigate();

    const onOkayHandler = () => {
        setShowPopup(false);
        navigate('/customgame');
    }
    return (
        <div className="w-[650px] bg-primary-dark text-black">
            <div className="h-[75px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5 flex items-center justify-center ">
                <p className="text-white text-center uppercase font-bold text-base">
                    Host Leaved
                </p>
                <button onClick={() => { setShowPopup(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-4">
                    <XIcon className="text-white w-9" />
                </button>
            </div>
            <div className="flex flex-col items-center py-12 gap-2">
                <div>
                    <span className="text-white font-medium">The </span>
                    <span className="text-primary-sky font-medium"> {roomName} room </span>
                    <span className="text-white font-medium">for </span>
                    <span className="text-primary-sky font-medium"> {betAmount} USD </span>
                    <span className="text-primary-green font-medium">({betAmount } BLC)</span>
                    <span className="text-white font-medium">created by the host is leaved. </span>
                </div>
                <div>
                    <span className="text-white font-medium">So, The room is dismissed. You can go with others room on custom game.</span>
                </div>
                <button
                    className="bg-primary-sky/30 mt-10 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => { 
                        onOkayHandler()
                    }}
                >
                    Confirm
                </button>
            </div>


        </div>
    )
}

export default HostLeavePopup;