import React from "react";
import 'antd/dist/antd.css';

interface Data {
    date: string,
    id: string,
    type: string,
    method: string,
    amount: number
}

interface Props {
    ActivePop: (value: any) => void
}
const Setting = ({ ActivePop }: Props) => {

    const DummyData: Data[] = [
        {
            date: "02/01/2021",
            id: "XT4567ER",
            type: "Deposit",
            method: "Credit card",
            amount: 100
        },
        {
            date: "02/01/2021",
            id: "XT4567ER",
            type: "Deposit",
            method: "Credit card",
            amount: 100

        }, {
            date: "02/01/2021",
            id: "XT4567ER",
            type: "Deposit",
            method: "Credit card",
            amount: 100

        },
        {
            date: "02/01/2021",
            id: "XT4567ER",
            type: "Deposit",
            method: "Credit card",
            amount: 100

        },
        {
            date: "02/01/2021",
            id: "XT4567ER",
            type: "Deposit",
            method: "Credit card",
            amount: 100

        },

    ]

    const CardRank = ({ data }: any) => {

        return (
            <div className="w-full h-full">
            <div className="h-16 wide:h-24 w-full px-12 col-span-2 grid grid-cols-[repeat(10,_minmax(0,_1fr))]  bg-primary-dark shadow-[0_5px_15px_5px_rgba(0,0,0,0.7)] " >
                <div className="col-span-2 text-center flex justify-start items-center text-[#fff] text-sm wide:text-base font-light">
                    {data.date}
                </div>
                <div className=" col-span-2 text-center flex justify-start items-center text-[#fff] text-sm wide:text-base font-light">
                    {data.id}
                </div>
                <div className=" col-span-2 text-center flex justify-start items-center text-[#fff] text-sm wide:text-base font-light">
                    {data.type}
                </div>
                <div className=" col-span-2 text-center flex justify-start items-center text-[#fff] text-sm wide:text-base font-light">
                    {data.method}
                </div>
                <div className=" col-span-2 text-center flex justify-end items-center text-sm wide:text-base font-light text-[#94bd4b]">
                    $ {data.amount}
                </div>
            </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full">
            <div className=" w-full space-y-1 bg-primary-dark shadow-sm shadow-black ">

                {DummyData.map(item => {
                    return <CardRank data={item} />
                })}
            </div>
        </div>
    );
};
export default Setting;