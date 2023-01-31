import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { ReactComponent as Maillogo } from "@Image/mail.svg";
import "./style.css"
import { Input, Modal } from "antd";
import clsx from "clsx";
import { SearchIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import ReactPaginate from 'react-paginate';
import Textmail from "./textmail";
import Rewardmail from "./Rewardmail";
interface Props {
    setOpenMail: (value: boolean) => void;
}


const Mail = ({ setOpenMail }: Props) => {

    const [isOpentext, setIsOpentext] = useState(false);
    const [isOpenReward, setIsOpenReward] = useState(false);

    return (
        <div className="w-[800px] bg-primary-dark text-black">
            <div className=" bg-gradient-to-r from-[#12323e] to-[#0e1e2a] relative py-5 px-12 flex items-center justify-start border-l-4 border-primary-green">
                <Maillogo className="w-7 maillogo fill-primary-sky text-primary-sky " />
                <p className="text-white text-left ml-6 uppercase font-bold text-base ">
                    Mail system
                </p>
                <button onClick={() => { setOpenMail(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-2 right-4">
                    <XIcon className="text-white w-9" />
                </button>
            </div>
            <div className="px-12 py-6">
                <div className="flex w-full justify-between items-center">
                    <button
                        className="bg-primary-sky/30  px-16 h-14 text-white font-bold rounded-sm border-4 border-primary-sky uppercase text-lg"
                        onClick={() => { }}
                    >
                        Remove all read mails
                    </button>
                    <Input
                        bordered={false}
                        prefix={<SearchIcon className="w-7 h-7" />}
                        placeholder="Search"
                        className={clsx(
                            " text-white w-80 h-14 px-4 searchroom rounded-lg border-0 bg-gradient-to-r from-[#1c323f] to-[#121e26]"
                        )}
                    />
                </div>
                <div className="w-full grid grid-cols-6 bg-[#262626] pt-1 pb-1 text-white pl-10 mt-6">
                    <p>Date</p>
                    <p>ID</p>
                    <p>Type</p>
                    <p>Status</p>
                    <p className="flex justify-center items-center">Description</p>
                </div>

                <div className="">
                    <div className="w-full grid grid-cols-6 bg-[#262626] pt-1 pb-1 text-white pl-10 mt-6">No mail yet.</div>
                    {/* <div className="w-full h-20 grid grid-cols-6 bg-[#121a1c] pt-1 pb-1 text-white pl-10 text-ellipsis cursor-pointer shadow-[0_5px_15px_3px_rgba(0,0,0,0.7)]"
                        onClick={() => { 
                            console.log(isOpentext)
                            setIsOpentext(true) }}
                    >
                        <p className="flex justify-start items-center">07-01-2022</p>
                        <p className="flex justify-start items-center uppercase font-extrabold">dx334ok</p>
                        <p className="flex justify-start items-center">Account</p>
                        <p className="flex justify-start items-center text-primary-green font-medium">Reviewing</p>
                        <div className="flex justify-between col-span-2 items-center text-ellipsis w-full pr-4">
                            <p className=" text-ellipsis w-full inline whitespace-nowrap overflow-hidden pr-20">Dear sir/madam Design faster with Elipse dashbord system </p>
                            <ChevronRightIcon className="w-7 h-7 stroke-3" />
                        </div>
                            <Textmail setIsOpentext={setIsOpentext} isOpentext={isOpentext} />
                    </div> */}
                    {/* <div className="w-full h-20 grid grid-cols-6 bg-[#18516d] pt-1 pb-1 text-white pl-10 text-ellipsis  cursor-pointer shadow-[0_5px_15px_3px_rgba(0,0,0,0.7)]"
                        onClick={() => { setIsOpenReward(true) }}
                    >
                        <p className="flex justify-start items-center">07-01-2022</p>
                        <p className="flex justify-start items-center uppercase font-extrabold">dx334ok</p>
                        <p className="flex justify-start items-center">Account</p>
                        <p className="flex justify-start items-center text-primary-green font-medium">Not yet opened</p>
                        <div className="flex justify-between col-span-2 items-center text-ellipsis w-full pr-4">
                            <p className=" text-ellipsis w-full inline whitespace-nowrap overflow-hidden">You got a reward! </p>
                            <ChevronRightIcon className="w-7 h-7 stroke-3" />
                        </div>
                        <Rewardmail setIsOpenReward={setIsOpenReward} isOpenReward={isOpenReward} />
                    </div>
                    <div className="w-full h-20 grid grid-cols-6 bg-[#343839] pt-1 pb-1 text-white pl-10 text-ellipsis cursor-pointer shadow-[0_5px_15px_3px_rgba(0,0,0,0.7)]">
                        <p className="flex justify-start items-center">07-01-2022</p>
                        <p className="flex justify-start items-center uppercase font-extrabold">dx334ok</p>
                        <p className="flex justify-start items-center">Account</p>
                        <p className="flex justify-start items-center text-[#4f4f50] font-medium">Reviewed</p>
                        <div className="flex justify-between col-span-2 items-center text-ellipsis w-full pr-4">
                            <p className=" text-ellipsis w-full inline whitespace-nowrap overflow-hidden pr-20">Dear sir/madam Design faster with Elipse dashbord system </p>
                            <ChevronRightIcon className="w-7 h-7 stroke-3" />
                        </div>
                    </div>
                    <div className="w-full h-20 grid grid-cols-6 bg-[#121a1c] pt-1 pb-1 text-white pl-10 text-ellipsis cursor-pointer shadow-[0_5px_15px_3px_rgba(0,0,0,0.7)]">
                        <p className="flex justify-start items-center">07-01-2022</p>
                        <p className="flex justify-start items-center uppercase font-extrabold">dx334ok</p>
                        <p className="flex justify-start items-center">Account</p>
                        <p className="flex justify-start items-center text-[#4f4f50] font-medium">Processed</p>
                        <div className="flex justify-between col-span-2 items-center text-ellipsis w-full pr-4">
                            <p className=" text-ellipsis w-full inline whitespace-nowrap overflow-hidden pr-20">Dear sir/madam Design faster with Elipse dashbord system </p>
                            <ChevronRightIcon className="w-7 h-7 stroke-3" />
                        </div>
                    </div>
                    <div className="w-full h-20 grid grid-cols-6 bg-[#121a1c] pt-1 pb-1 text-white pl-10 text-ellipsis cursor-pointer shadow-[0_5px_15px_3px_rgba(0,0,0,0.7)]">
                        <p className="flex justify-start items-center">07-01-2022</p>
                        <p className="flex justify-start items-center uppercase font-extrabold">dx334ok</p>
                        <p className="flex justify-start items-center">Account</p>
                        <p className="flex justify-start items-center text-[#4f4f50] font-medium">Processed</p>
                        <div className="flex justify-between col-span-2 items-center text-ellipsis w-full pr-4">
                            <p className=" text-ellipsis w-full inline whitespace-nowrap overflow-hidden pr-20">Dear sir/madam Design faster with Elipse dashbord system </p>
                            <ChevronRightIcon className="w-7 h-7 stroke-3" />
                        </div>
                    </div>
                    <div className="w-full h-20 grid grid-cols-6 bg-[#343839] pt-1 pb-1 text-white pl-10 text-ellipsis cursor-pointer shadow-[0_5px_15px_3px_rgba(0,0,0,0.7)]">
                        <p className="flex justify-start items-center">07-01-2022</p>
                        <p className="flex justify-start items-center uppercase font-extrabold">dx334ok</p>
                        <p className="flex justify-start items-center">Account</p>
                        <p className="flex justify-start items-center text-[#4f4f50] font-medium">Reviewed</p>
                        <div className="flex justify-between col-span-2 items-center text-ellipsis w-full pr-4">
                            <p className=" text-ellipsis w-full inline whitespace-nowrap overflow-hidden pr-20">Dear sir/madam Design faster with Elipse dashbord system </p>
                            <ChevronRightIcon className="w-7 h-7 stroke-3" />
                        </div>
                    </div> */}



                    <ReactPaginate
                        previousLabel={<ChevronLeftIcon className="text-white w-10 h-10 p-2 bg-gradient-to-b rounded-md shadow-xl stroke-[3px] from-[#102c37] t-[#0e232c] " />}
                        nextLabel={<ChevronRightIcon className="text-white w-10 h-10 p-2 bg-gradient-to-b rounded-md shadow-xl stroke-[3px] from-[#102c37] t-[#0e232c] " />}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={1}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        containerClassName="pagination flex"
                        activeClassName={"active"}
                    />
                </div>
            </div>
        </div>
    )
}

export default Mail;