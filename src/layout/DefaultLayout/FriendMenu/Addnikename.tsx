import React from "react";
import { XIcon } from "@heroicons/react/outline";

interface Props {
    setShowNikename: (show: boolean) => void;
}

const AddnikeName = ({ setShowNikename }: Props) => {
    return (
        <div className="w-[600px] bg-primary-dark text-black">

            <div className="h-[75px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5 flex items-center justify-center ">
                <p className="text-white text-center uppercase font-bold text-base">
                ADD nikename
                </p>
                <button onClick={() => { setShowNikename(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-4">
                    <XIcon className="text-white w-9" />
                </button>
            </div>
            <div className="flex flex-col items-center py-12 gap-2">
                <div className="">
                    <span className="text-[#bdc0c1] font-medium ">Add an unique nickname to keep track of this friend</span>
                </div>
                <div className=" flex justify-start flex-col mt-6">
                    <p className = "text-white font-semibold">SirDominic</p>
                    <p className = "text-[#bdc0c1] mt-2">current nickname set up</p>
                    <div className="border-l-4 border-primary-green mt-2">
                        <input className="w-[400px] h-12 p-2 bg-[#2e2e2e] text-white" type="text" placeholder="Enter a nikename" />
                    </div>

                </div>
                <button
                    className="bg-primary-sky/30 mt-10 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => {  }}
                >
                    block
                </button>
                <button
                    className=" w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => { setShowNikename(false) }}
                >
                    CANCEL
                </button>
            </div>


        </div>
    )
}

export default AddnikeName;