import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { ReactComponent as Maillogo } from "@Image/mail.svg";
import "./style.css"
import { Input } from "antd";
import clsx from "clsx";
import { SearchIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import { TrashIcon } from "@heroicons/react/solid";
import ReactPaginate from 'react-paginate';
import item01 from "@Image/items/mock_item1.png";
import item02 from "@Image/items/mock_item2.png";
import item03 from "@Image/items/mock_item3.png";
import { Modal } from "antd";
import item04 from "@Image/items/mock_item4.png";


interface Props {
    isOpenReward: boolean,
    setIsOpenReward: React.Dispatch<React.SetStateAction<boolean>>;
}


const RewardMail = ({ setIsOpenReward, isOpenReward }: Props) => {
    return (
        <Modal
            visible={isOpenReward}
            footer={null}
            title={null}
            centered = {true}
            bodyStyle={{ padding: "0px" }}
            className="p-0 w-full h-auto flex items-center justify-center"
        >


            <div className="w-[750px] bg-primary-dark text-black shadow-[0_0_15px_5px_rgba(0,0,0,0.7)]"
                onClick={() => {
                    setIsOpenReward(false)
                    console.log("close")

                }}>
                <div className=" bg-gradient-to-t from-[#121b21] to-[#17252f] relative py-2 px-6 flex items-center justify-start border-l-4 border-primary-green">
                    <button onClick={() => {
                        setIsOpenReward(false)
                        console.log("close")

                    }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5  shadow-lg">
                        <ChevronLeftIcon className="text-white w-9" />
                    </button>
                    <p className="text-white ml-4 text-lg ">Dear sir/madam Design faster with Eclipse dashbord system for Figma</p>
                    <button onClick={() => { setIsOpenReward(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-2 right-4 shadow-lg">
                        <XIcon className="text-white w-9" />
                    </button>
                </div>
                <div className="pt-6 px-8 pb-12 bg-[#0b0b0b] relative">
                    <div className="absolute top-6 right-6 bg-gradient-to-br from-[#133546] to-[#0e212e] cursor-pointer p-1 flex items-center justify-center rounded-md shadow-lg" >
                        <TrashIcon className="w-4 text-white" />
                    </div>
                    <div className="flex gap-6 items-end">
                        <p className="text-white font-semibold">Kumachan</p>
                        <p className="text-white text-sm ">05-01-2022 </p>
                        <p className="text-white text-sm ml-6">DX3340K </p>
                        <p className="text-white text-sm ml-6">Account </p>
                        <p className="text-primary-green text-sm ml-6">Reviewing </p>
                    </div>
                    <p className="text-white text-lg mt-6 uppercase">NEW season starting</p>
                    <p className="text-white text-base mt-2 pb-4">You reached the following Rank in the Arena's last season!</p>
                    <div className="flex justify-center mt-12 gap-8">
                        <div className="w-24 h-24 bg-gradient-to-t from-[#111921] to-[#14242d]">
                            <img src={item02} alt="item" className="w-24 h-24 object-contain" />
                        </div>
                        <div className="w-24 h-24 bg-gradient-to-t from-[#111921] to-[#14242d]">
                            <img src={item01} alt="item" className="w-24 h-24 object-contain" />
                        </div>
                        <div className="w-24 h-24 bg-gradient-to-t from-[#111921] to-[#14242d]">
                            <img src={item03} alt="item" className="w-24 h-24 object-contain" />
                        </div>
                        <div className="w-24 h-24 bg-gradient-to-t from-[#111921] to-[#14242d]">
                            <img src={item04} alt="item" className="w-24 h-24 object-contain" />
                        </div>
                    </div>
                    <div className="mt-20 flex justify-center">
                        <button
                            className="bg-primary-sky/30  w-96 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                            onClick={() => { setIsOpenReward(false) }}
                        >
                            confirm
                        </button>
                    </div>


                </div>

            </div>
        </Modal>
    )
}

export default RewardMail;