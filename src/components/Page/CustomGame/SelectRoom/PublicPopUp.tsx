import React from "react";
import { XIcon } from "@heroicons/react/outline";
import { Input } from "antd"
import "./style.css"
import {  useNavigate  } from "react-router-dom";


const PublicPopUp = ({ setShowPopup, roomName, betAmount, onConfirmHandler }: any) => {

    const navigate = useNavigate();

    console.log(onConfirmHandler)


    return (
        <div className="w-[650px] bg-primary-dark text-black">
            <div className="h-[75px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5 flex items-center justify-center ">
                <p className="text-white text-center uppercase font-bold text-base">
                    this is public room
                </p>
                <button onClick={() => { setShowPopup(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-4">
                    <XIcon className="text-white w-9" />
                </button>
            </div>
            <div className="flex flex-col items-center py-12 gap-2">
                <div>
                    <span className="text-white font-medium">Are you sure you want to join </span>
                    <span className="text-white font-medium">the </span>
                    <span className="text-primary-sky font-medium"> {roomName} room </span>
                    <span className="text-white font-medium"> with</span>
                    <span className="text-primary-sky font-medium"> {betAmount} USD </span>
                    <span className="text-primary-green font-medium">({betAmount } BLC) ?.</span>
                </div>
                <div>
                    <span className="text-white font-medium">If yes then enter password and join the room otherwise leave.</span>
                </div>
                {/* <div className="flex flex-col items-start w-full px-28 mt-10">
                    <p className="text-white uppercase text-lg font-bold ">password</p>
                    <Input 
                        className="w-full h-14 mt-4 text-lg text-white Enterpass bg-[#2e2e2e] border-l-4 rounded-none border-y-0 border-r-0 border-primary-green"
                        placeholder="please enter the room password..."
                        type="password"
                    />
                </div> */}
                <button
                    className="bg-primary-sky/30 mt-10 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => { 
                        onConfirmHandler();
                    }}
                >
                    Confirm
                </button>
            </div>


        </div>
    )
}

export default PublicPopUp;