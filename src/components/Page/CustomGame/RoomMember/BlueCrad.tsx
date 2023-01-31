import React from 'react';
import Avatar from "@Image/Home/avatar.png";
import clanlogo from "@Image/clanlogo_demo.jpg";
import Moveposition from "@Image/CustomGame/MovePosition.png";
import { ReactComponent as Ping_good } from "@Image/CustomGame/ic_connection_good.svg";
import { ReactComponent as Ping_medium } from "@Image/CustomGame/ic_connection_medium.svg";
import { ReactComponent as Ping_weak } from "@Image/CustomGame/ic_connection_weak.svg";

const BlueCrad = () => {
    return (
        <div className="grid grid-cols-3 xl:grid-cols-5 gap-4 h-full pl-6 2xl:pl-12 pr-5 w-full" >


        <div>
            <div className="w-full h-[250px] bg-gradient-to-tl from-[#0d1d25] to-[#102f3b] border-2 border-primary-sky rounded-2xl relative ">
                <img src={Avatar} className="w-full h-full object-contain" />




                <div className="absolute top-2 flex left-0 w-full h-1 rounded-md justify-center p-1">
                    <img src={clanlogo}  className="w-6 h-6 mr-1 " />
                    <p className="font-medium text-lg shadow-[0_16px_15px_2px_#fff] ">
                        Kamachan
                    </p>
                </div>
                <div className="absolute bottom-24 flex left-0 w-full h-1 rounded-md justify-center  p-1">
                    <p className="text-[30px] font-semibold uppercase shadow-[0_25px_20px_5px_#fff]">
                        ready
                    </p>
                </div>
                <div className="absolute -bottom-1 -left-1 w-10 h-10 bg-primary-dark rounded-md font-bold text-center text-2xl p-1"> 12</div>
                <Ping_medium className="w-6 h-6 absolute bottom-2 right-3" />
            </div>
            <div className="flex flex-col items-center">
                <p className="font-bold text-lg text-center mt-1 bg-[#080d0f] rounded-md w-20">5 $</p >
                <p className="font-bold text-sm text-center text-primary-green">= 62.5 BLC</p>

            </div>
        </div>
        
        {/* Switch Card */}
        <div>
            <div className="w-full h-[250px]  bg-gradient-to-tl from-[#0d1d25] to-[#102f3b] border-2 border-primary-sky rounded-2xl relative flex justify-center items-center">
            <div className="w-24 h-24  rounded-full cursor-pointer">
                    <img src = {Moveposition} className="w-full h-full object-contain" />
            </div>

            </div>
            <div className="flex flex-col items-center">
                <p className="font-bold text-lg text-center mt-1 bg-[#080d0f] rounded-md w-20">0 $</p >
                <p className="font-bold text-sm text-center text-primary-green">= 0 BLC</p>

            </div>
        </div>
        {/* Not ready player card */}
        <div>
            <div className="w-full h-[250px] bg-gradient-to-tl from-[#0d1d25] to-[#102f3b] border-2 border-primary-sky rounded-2xl relative">
                <img src={Avatar} className="w-full h-full object-contain" />




                <div className="absolute top-2 flex left-0 w-full h-1 rounded-md justify-center p-1">
                    <img src={clanlogo}  className="w-6 h-6 mr-1 " />
                    <p className="font-medium text-lg shadow-[0_16px_15px_2px_#fff] ">
                        Kamachan
                    </p>
                </div>
                <div className="absolute -bottom-1 -left-1 w-10 h-10 bg-primary-dark rounded-md font-bold text-center text-2xl p-1"> 12</div>
                <Ping_weak className="w-6 h-6 absolute bottom-2 right-3" />
            </div>
            <div className="flex flex-col items-center">
                <p className="font-bold text-lg text-center mt-1 bg-[#080d0f] rounded-md w-20">5 $</p >
                <p className="font-bold text-sm text-center text-primary-green">= 62.5 BLC</p>

            </div>
        </div>

        <div>
            <div className="w-full h-[250px]  bg-gradient-to-tl from-[#0d1d25] to-[#102f3b] border-2 border-primary-sky rounded-2xl relative">
                <img src={Avatar} className="w-full h-full object-contain" />




                <div className="absolute top-2 flex left-0 w-full h-1 rounded-md justify-center p-1">
                    <img src={clanlogo}  className="w-6 h-6 mr-1 " />
                    <p className="font-medium text-lg shadow-[0_16px_15px_2px_#fff] ">
                        Kamachan
                    </p>
                </div>
                <div className="absolute bottom-24 flex left-0 w-full h-1 rounded-md justify-center  p-1">
                    <p className="text-[30px] font-semibold uppercase shadow-[0_25px_20px_5px_#fff]">
                        ready
                    </p>
                </div>
                <div className="absolute -bottom-1 -left-1 w-10 h-10 bg-primary-dark rounded-md font-bold text-center text-2xl p-1"> 12</div>
                <Ping_good className="w-6 h-6 absolute bottom-2 right-3" />
            </div>
            <div className="flex flex-col items-center">
                <p className="font-bold text-lg text-center mt-1 bg-[#080d0f] rounded-md w-20">5 $</p >
                <p className="font-bold text-sm text-center text-primary-green">= 62.5 BLC</p>

            </div>
        </div>

        <div>
            <div className="w-full h-[250px]  bg-gradient-to-tl from-[#0d1d25] to-[#102f3b] border-2 border-primary-sky rounded-2xl relative">
                <img src={Avatar} className="w-full h-full object-contain" />




                <div className="absolute top-2 flex left-0 w-full h-1 rounded-md justify-center p-1">
                    <img src={clanlogo}  className="w-6 h-6 mr-1 " />
                    <p className="font-medium text-lg shadow-[0_16px_15px_2px_#fff] ">
                        Kamachan
                    </p>
                </div>
                <div className="absolute bottom-24 flex left-0 w-full h-1 rounded-md justify-center  p-1">
                    <p className="text-[30px] font-semibold uppercase shadow-[0_25px_20px_5px_#fff]">
                        ready
                    </p>
                </div>
                <div className="absolute -bottom-1 -left-1 w-10 h-10 bg-primary-dark rounded-md font-bold text-center text-2xl p-1"> 12</div>
                <Ping_medium className="w-6 h-6 absolute bottom-2 right-3" />
            </div>
            <div className="flex flex-col items-center">
                <p className="font-bold text-lg text-center mt-1 bg-[#080d0f] rounded-md w-20">5 $</p >
                <p className="font-bold text-sm text-center text-primary-green">= 62.5 BLC</p>

            </div>
        </div>

    </div>
    );
}

export default BlueCrad;