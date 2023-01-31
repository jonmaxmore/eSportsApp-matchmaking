import React, { useState } from "react";
import "./styles.css";
import 'antd/dist/antd.css';
import clsx from "clsx";

import Tran from './Transaction/Tran';
import Emtpy from './Transaction/Empty';

import ModalBuyBLC from '../News/BuyBLC/ModalBuyBLC'

interface Props {
    ActivePop: (value: any) => void
}

const Setting = ({ ActivePop }: Props) => {

    const active = (value: string) => {
        if (ActiveTransaction === value) {
            return "border-4 border-[#94bd4b] bg-gradient-to-r from-[#142835] to-[#0b151e] ";
        } else {
            return "bg-primary-dark ";
        }
    };

    const SubContent = () => {
        if (ActiveTransaction === 'transaction') {
            return <Tran ActivePop={value => setActiveTransaction(value)} />
        }
        if (ActiveTransaction === 'emtpy') {
            return <Emtpy ActivePop={value => setActiveTransaction(value)} />
        }
        else {
            return <div>404</div>
        }
    };

    const [ActiveTransaction, setActiveTransaction] = useState('emtpy');

    const [isOpenBuyBLC, setOpenBuyBLC] = useState(false)

    return (
        <div style={{
            height: 'calc(100vh - 250px)'
        }} className=" w-full h-full shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] border border-black ">
            <div className="w-full py-6 border-l-4 border-[#94bd4b] flex items-center justify-items-center text-center
                                bg-gradient-to-r from-[#11323f] to-[#0d212a]">
                <p className="pl-6 text-[#fff] text-base font-semibold">BALANCE</p>
            </div>
            <div className=" flex items-center justify-center px-8">
                <div className="w-full h-fit my-8 shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] border border-black px-8">

                    <div className="w-full h-full flex justify-between items-center">
                        <div className="flex-col justify-center items-center mt-8">
                            <p className="text-left text-[#616666] text-base font-bold">Total balance</p>
                            <p className="text-left text-[#fff] text-xl font-bold">0 $</p>
                        </div>

                        <div className="flex justify-end items-center w-2/3">
                            <div className="w-1/2 mr-6 wide:w-1/3 h-12 border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer">
                                <p className="flex items-center text-center text-[#fff] text-base wide:text-lg font-bold " onClick={() => setOpenBuyBLC(true)}>TOP UP</p>
                            </div>
                            <div className="w-1/2 wide:w-1/3 h-12 border-2 border-[#6bb8e7] flex justify-center bg-black rounded-md cursor-pointer">
                                <p className="flex items-center text-center text-[#fff] text-base wide:text-lg font-bold ">WITHDRAW</p>
                            </div>
                        </div>

                    </div>

                    <div className="w-full h-full mt-3 border-t-2 border-[#333a3c]"></div>

                    <div className="w-full h-full flex justify-between items-center pt-3 pb-6">
                        <p className="text-center text-[#7eb231] text-sm wide:text-base font-bold">= 4912.8 BLC</p>
                        <p className="text-center text-[#fff] text-sm wide:text-base font-light">The amount of BLC is updated in real time</p>
                    </div>
                </div>
            </div>

            <div className="w-full py-6 border-l-4 border-[#94bd4b] flex items-center justify-items-center text-center
                                bg-gradient-to-r from-[#11323f] to-[#0d212a]">
                <p className="pl-6 text-[#fff] text-base font-semibold">TRANSACTION HISTORY</p>
            </div>

            <div className="h-8 w-full col-span-2 grid grid-cols-[repeat(10,_minmax(0,_1fr))] grid-rows-1 bg-[#242424] px-12">
                <div className=" col-span-2 text-center flex justify-start items-center text-[#fff] text-base font-bold">
                    Date</div>
                <div className=" col-span-2 text-center flex justify-start items-center text-[#fff] text-base font-bold">
                    ID</div>
                <div className=" col-span-2 text-center flex justify-start items-center text-[#fff] text-base font-bold">
                    Type</div>
                <div className=" col-span-2 text-center flex justify-start items-center text-[#fff] text-base font-bold">
                    Method</div>
                <div className=" col-span-2 text-center flex justify-end items-center text-[#fff] text-base font-bold">
                    Amount</div>
            </div>
            <ModalBuyBLC visible={isOpenBuyBLC} setVisible={setOpenBuyBLC} />
            <div style={{
                height: 'calc(100vh - 450px)'
            }} className=" w-full space-y-1 bg-primary-dark ">

                <div className={clsx(ActiveTransaction === '' ? "hidden" : "")}>
                    <SubContent />
                </div>


                <div className="pt-12 w-full h-16 flex justify-center items-center">
                    <div className={clsx("w-1/4 h-16 flex justify-center items-center bg-[#253d4c] rounded-md cursor-pointer ", active("transaction"))} onClick={() => setActiveTransaction("transaction")} >
                        <p className="text-[#fff] text-center text-sm font-semibold ">Transaction</p>
                    </div>

                    <div className={clsx("w-1/4 h-16 flex justify-center items-center bg-[#253d4c] rounded-md cursor-pointer ", active("emtpy"))} onClick={() => setActiveTransaction("emtpy")}>
                        <p className=" text-[#fff] text-center text-sm font-semibold ">Emtpy</p>
                    </div>
                </div>
            </div>

        </div>

    );
};
export default Setting;