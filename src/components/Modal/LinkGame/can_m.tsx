import React from "react";
import UserAPI from "@api/UserAPI";
import { XIcon } from "@heroicons/react/outline";


const Can_m = ({ visible,setvisible, title ,getdataplay }: any) => {


    const [showAddfriend, setShowAddfriend] = React.useState(false);
    const [showcan, setShowcan] = React.useState(false);


    const visibles = (getdataplay:any) => {
          
        console.log(getdataplay)

       // setvisible(false)

    }

    return (
        <div className="w-[700px] bg-primary-dark text-black">
            <div className="h-[75px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5 flex items-center justify-center ">
                <p className="text-white text-center uppercase font-bold text-base">
                Un-Link {title}
                </p>
                <button onClick={() => { setvisible(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-4">
                    <XIcon className="text-white w-9" />
                </button>
            </div>
            <div className="flex flex-col items-center py-12 gap-2">
                <div className="flex flex-col items-center ">
                    <div>
                        <span className="text-[#bdc0c1] font-normal ">Are you sure you want to unlink {title}? </span>
                        {/* <span className="text-white font-bold">  ?</span> */}
                    </div>
                </div>
                <button
                    className="bg-primary-sky/30 mt-10 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={visibles}
                >
                    OK
                </button>
                
            </div>


        </div>
    )
}

export default Can_m;