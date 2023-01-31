

import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import "./style.css"
import clsx from "clsx";
import moment from "moment";

interface Props {
    setOpenNewsReadMore: (show: boolean) => void;
    bannerData:any;
}

const Block = ({ setOpenNewsReadMore,bannerData }: Props) => {


    const [isSelected, setIsSelected] = useState(0);
    const Selected = (value: number) => {
        if (value === isSelected) {
            console.log("value", value)
            return "border-4 border-primary-sky bg-primary-sky/30"
        } else {
            return "bg-[#121a1c]"
        }

    }
    
    return (
        <div className="w-[850px] bg-primary-dark text-black relative">
            <button onClick={() => { setOpenNewsReadMore(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-6">
                <XIcon className="text-white w-9" />
            </button>
            {/* <button onClick={() => { setOpenNewsReadMore(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-20">
                <MinusIcon className="text-white w-9" />
            </button> */}
            <div className="bg-gradient-to-t from-black/60 to-black/10 pb-5 pt-12 px-10">
                                        <span className={clsx("uppercase text-[14px] text-white font-[400]")}>{bannerData.type.toUpperCase()}</span>
                                        <p className="uppercase font-bold mt-3 text-3xl text-white tracking-wide">
                                            {bannerData.title_en}
                                        </p>
                                        <p className="uppercase font-bold mt-2 text-2xl text-white tracking-wide">
                                            Date : {moment(bannerData.date).format('MM/DD/YYYY')}
                                        </p>
                                        <p className="text-white mt-4 tracking-widest text-lg">
                                            {bannerData.description_en}
                                        </p>
                                    </div>
            {/* <div className="w-full flex justify-center items-center">
                <div className="mt-10">
                    <span className="battlelab-inner-title">{bannerData.title_en}</span>
                </div>
            </div>
            <div className="flex flex-col items-center pb-12 gap-2 mt-3">
                <div className="flex flex-col items-center text-white">
                    <p className="text-[#bdc0c1] font-normal inner-font-text">
                    {bannerData.description_en}
                    </p>
                </div>

            </div> */}
        </div>
    )
}

export default Block;