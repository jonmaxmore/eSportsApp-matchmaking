import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { ReactComponent as Maillogo } from "@Image/mail.svg";
import "./style.css"
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { TrashIcon } from "@heroicons/react/solid";
import { Modal } from "antd";

interface Props {
    isOpentext: boolean,
    setIsOpentext: (value: React.SetStateAction<boolean>) => void
}


const Mail = ({ setIsOpentext, isOpentext }: Props) => {
    return (
        <Modal
            visible={isOpentext}
            footer={null}
            title={null}
            closable={false}
            bodyStyle={{ padding: "0px" }}
            onCancel={() => { setIsOpentext(false) }}
            className="p-0 w-full h-auto flex items-center justify-center"
        >
            <div className="w-[750px] bg-primary-dark text-black shadow-[0_0_15px_5px_rgba(0,0,0,0.7)]">
                <div className=" bg-gradient-to-t from-[#121b21] to-[#17252f] relative py-2 px-6 flex items-center justify-start border-l-4 border-primary-green">
                    <button className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 shadow-lg"

                        onClick={(e) => {
                            console.log(isOpentext)
                            setIsOpentext(false)
                        }}
                    >
                        <ChevronLeftIcon className="text-white w-9" />
                    </button>
                    <p className="text-white ml-4 text-lg ">Dear sir/madam Design faster with Eclipse dashbord system for Figma</p>
                    <button className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-2 right-4 shadow-lg"
                        onClick={() => {
                            console.log(setIsOpentext(false))
                            setIsOpentext(true)
                        }}
                    >
                        <XIcon className="text-white w-9" />
                    </button>
                </div>
                <div className="pt-6 px-8 pb-12 bg-[#0b0b0b] relative">
                    <div className="absolute top-6 right-6 bg-gradient-to-br from-[#133546] to-[#0e212e] cursor-pointer p-1 flex items-center justify-center rounded-md shadow-lg" >
                        <TrashIcon className="w-4 text-white" onClick={() => { setIsOpentext(false) }} />
                    </div>
                    <div className="flex gap-6 items-end">
                        <p className="text-white font-semibold">Kumachan</p>
                        <p className="text-white text-sm ">05-01-2022 </p>
                        <p className="text-white text-sm ml-6">DX3340K </p>
                        <p className="text-white text-sm ml-6">Account </p>
                        <p className="text-primary-green text-sm ml-6">Sent </p>
                    </div>
                    <p className="text-white text-sm mt-6 border-b-[1px] pb-4">If you're working an a feam and read to collabarate on more than three files. upgrading to our Professional plan may be for you</p>

                    <div className="flex gap-6 items-end mt-8">
                        <p className="text-white font-semibold">Battlelab suppoet</p>
                        <p className="text-white text-sm ">07-01-2022 </p>
                        <p className="text-white text-sm ml-6">DX3340K </p>
                        <p className="text-white text-sm ml-6">Account </p>
                        <p className="text-primary-green text-sm ml-6">Reviewing </p>
                    </div>
                    <p className="text-white text-sm mt-6  pb-4">
                        1100+ variants of 80 components served as Figma dashbord libary for data-driven web application. Powered by auto-layout. Supercharged by figma's variants.
                        <br /><br />
                        Eclipse UI kit is easy to customize. Contains 74 detailed desktop & mobile templates for quick start. This well-organized libary either helps to Figma and take your UI design skill to the next lavel!
                        <br /><br />
                        2k of previous customers already accelerated with Setproduct resources for designers, developers and startups!
                    </p>

                </div>

            </div>
        </Modal>
    )
}

export default Mail;