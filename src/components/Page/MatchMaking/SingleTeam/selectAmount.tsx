import React, { useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd"
import { XIcon } from "@heroicons/react/outline";
import { useSearchMatchContext } from "@Context/SearchMatch";

type Price = {
    dollar: string;
    blc: string;
};

interface Props {
    SetShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}



const Single = ({SetShowPopup}:Props) => {
    const navigate = useNavigate();
    const { searchMatch, SetSearch }: any = useSearchMatchContext();

    const Data: Price[] = [
        {
            dollar: "1",
            blc: "12.50",
        },
        {
            dollar: "5",
            blc: "62.5",
        },
        {
            dollar: "10",
            blc: "125",
        },
        {
            dollar: "20",
            blc: "250",
        },
        {
            dollar: "50",
            blc: "625",
        },
        {
            dollar: "100",
            blc: "1,250",
        },
        {
            dollar: "200",
            blc: "2,500",
        },
        {
            dollar: "500",
            blc: "6,250",
        },
        {
            dollar: "1000",
            blc: "12,500",
        },
    ];
    const [selected, setSelected] = useState<number>(-1);
    function Searching() {
        SetSearch.setSearchMatchTrue();
        navigate(`/home`)

    }
    const CardPriceBronze = (data: Price, index: number) => {

        const select = selected == index ?
            "bg-gradient-to-b from-primary-sky border-primary-sky shadow-[0px_0px_7px_2px] shadow-border-primary-sky/50"
            : " border-[#b46f1f] shadow-[0px_0px_4px_2px] shadow-[#b46f1f]/70";

        return (
            <div className={clsx(select, " h-14 border-2  px-12 cursor-pointer ")}
                onClick={() => { setSelected(index) }}
                key={index}
            >
                <p className="text-center text-xl text-white font-bold uppercase">{data.dollar}$</p>
                <p className="text-center text-primary-green uppercase font-semibold">
                    ={data.blc} Swordz
                </p>
            </div>
        );
    };

    const CardPriceSliver = (data: Price, index: number) => {
        const select = selected == index ?
            "bg-gradient-to-b from-primary-sky border-primary-sky shadow-[0px_0px_7px_2px] shadow-border-primary-sky/50"
            : " border-[#acacac] shadow-[0px_0px_4px_2px] shadow-[#acacac]/70";
        return (
            <div className={clsx(select, " h-14 border-2  px-12 cursor-pointer")}
                onClick={() => { setSelected(index) }}
                key={index}
            >
                <p className="text-center text-xl text-white font-bold uppercase">{data.dollar}$</p>
                <p className="text-center text-primary-green uppercase font-semibold">
                    ={data.blc} Swordz
                </p>
            </div>
        );
    };


    const CardPriceGold = (data: Price, index: number) => {
        const select = selected == index ?
            "bg-gradient-to-b from-primary-sky border-primary-sky shadow-[0px_0px_7px_2px] shadow-border-primary-sky/50"
            : " border-[#edab04] shadow-[0px_0px_4px_2px] shadow-[#edab04]/70";
        return (
            <div className={clsx(select, " h-14 border-2  px-12 cursor-pointer")}
                onClick={() => { setSelected(index) }}
                key={index}
            >
                <p className="text-center text-xl text-white font-bold uppercase">{data.dollar}$</p>
                <p className="text-center text-primary-green uppercase font-semibold">
                    ={data.blc} Swordz
                </p>
            </div>
        );
    }

    return (

        <div className="w-[650px] h-[520px] bg-primary-dark text-black">
            <div className="h-[55px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5">
                <p className="text-white text-center uppercase font-bold text-base">
                    confirm with this amount?
                </p>
                <button onClick={() => SetShowPopup(false)} className="bg-primary-light rounded-md p-1 absolute top-3 right-4" 
                >
                    <XIcon className="text-white w-8" onClick={() => {
                        SetShowPopup(false)
                    }}/>
                </button>

            </div>
            <div className="flex flex-col items-center pt-12 gap-2">
                <div>
                    <span className="font-medium text-white/60"> Select the amount of BLC you would like to bet for the game </span>
                </div>
                <div className="grid grid-cols-3 grid-rows-3 gap-x-8 gap-y-4 mt-8 mb-8">
                    {Data.map((data, index) => {
                        if (index < 3) {
                            return (
                            <div key={index}>
                                <CardPriceBronze {...data}  {...index}/>
                            </div>
                        )
                        } else if (index < 6) {
                            return (
                                <div key={index}>
                                    <CardPriceSliver {...data}  {...index}/>
                                </div>
                            )

                        } else {
                            return (
                                <div key={index}>
                                    <CardPriceGold {...data}  {...index}/>
                                </div>
                            )
                        }
                    })}
                </div>
                <button
                    className="bg-primary-sky/30 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    
                >
                    confirm
                </button>
                <button
                    className="mt-2 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => SetShowPopup(false)}
                >
                    CANCEL
                </button>
            </div>


        </div>



    )
}

export default Single;