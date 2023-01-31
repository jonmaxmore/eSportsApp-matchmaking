import React, { useState } from "react";
import clsx from "clsx";

import { Collapse, Select } from 'antd';
import { Menu, Input, Switch } from 'antd';
import avatar from '@Image/Ranking/avatar.png'
import lol from '@Image/Ranking/icon_lol.png'
import shield1st from "@Image/Ranking/ic-ranking_Gold.png"
import shield2nd from "@Image/Ranking/ic-ranking_Silver.png"
import shield3rd from "@Image/Ranking/ic-ranking_Copper.png"
import trophy3rd from "@Image/Ranking/ic-trophy_coppermember.png"
import trophy2nd from "@Image/Ranking/ic-trophy_silvermember.png"
import trophy1st from "@Image/Ranking/ic-trophy_goldmember.png"

import { XIcon } from '@heroicons/react/solid'
import { CaretDownOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';



interface Props {
    ActivePop: (value: any) => void
}


interface Data {
    shield?: any,
    rank: number,
    game: any,
    avatar: any,
    level: number,
    username: string,
    win: number,
    lose: number,
    totol: number,
    blc: number,
    member: any

}


const Ranking = ({ ActivePop }: Props) => {


    const DummyData: Data[] = [
        // {
        //     shield: shield1st,
        //     rank: 1,
        //     game: lol,
        //     avatar: avatar,
        //     level: 12,
        //     username: "Name PLayer",
        //     win: 10,
        //     lose: 10,
        //     totol: 1000,
        //     blc: 100,
        //     member: trophy1st
        // },
        // {
        //     shield: shield2nd,
        //     rank: 2,
        //     game: lol,
        //     avatar: avatar,
        //     level: 12,
        //     username: "Name PLayer",
        //     win: 10,
        //     lose: 10,
        //     totol: 1000,
        //     blc: 100,
        //     member: trophy1st

        // }, {
        //     shield: shield3rd,
        //     rank: 3,
        //     game: lol,
        //     avatar: avatar,
        //     level: 12,
        //     username: "Name PLayer",
        //     win: 10,
        //     lose: 10,
        //     totol: 1000,
        //     blc: 100,
        //     member: trophy1st

        // },
        // {
        //     rank: 4,
        //     game: lol,
        //     avatar: avatar,
        //     level: 12,
        //     username: "Name PLayer",
        //     win: 10,
        //     lose: 10,
        //     totol: 1000,
        //     blc: 100,
        //     member: trophy1st

        // },
        // {
        //     rank: 5,
        //     game: lol,
        //     avatar: avatar,
        //     level: 12,
        //     username: "Name PLayer",
        //     win: 10,
        //     lose: 10,
        //     totol: 1000,
        //     blc: 100,
        //     member: trophy2nd

        // },

        // {
        //     rank: 6,
        //     game: lol,
        //     avatar: avatar,
        //     level: 12,
        //     username: "Name PLayer",
        //     win: 10,
        //     lose: 10,
        //     totol: 1000,
        //     blc: 100,
        //     member: trophy2nd
        // },
        // {
        //     rank: 7,
        //     game: lol,
        //     avatar: avatar,
        //     level: 12,
        //     username: "Name PLayer",
        //     win: 10,
        //     lose: 10,
        //     totol: 1000,
        //     blc: 100,
        //     member: trophy2nd

        // }, {
        //     rank: 8,
        //     game: lol,
        //     avatar: avatar,
        //     level: 12,
        //     username: "Name PLayer",
        //     win: 10,
        //     lose: 10,
        //     totol: 1000,
        //     blc: 100,
        //     member: trophy3rd

        // },
        // {
        //     rank: 9,
        //     game: lol,
        //     avatar: avatar,
        //     level: 12,
        //     username: "Name PLayer",
        //     win: 10,
        //     lose: 10,
        //     totol: 1000,
        //     blc: 100,
        //     member: trophy3rd

        // },
        // {
        //     rank: 10,
        //     game: lol,
        //     avatar: avatar,
        //     level: 12,
        //     username: "Name PLayer",
        //     win: 10,
        //     lose: 10,
        //     totol: 1000,
        //     blc: 100,
        //     member: trophy3rd

        // },

    ]

    const ShieldRank = ({ data }: any) => {
        return (
            <div className={"relative"}>
                <img src={data?.shield} />
                <span>{data.rank}</span>
            </div>)
    }

    const Menuse = (
        <Menu>
            <Menu.Item key="0">
                <a >Leauge of Legend</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a >Dota2</a>
            </Menu.Item>
        </Menu>
    );

    const [fillter, setFillter] = useState("All");

    const active = (value: string) => {
        if (fillter === value) {
            return "bg-[#94bd4b] text-[#000]";
        } else {
            return "bg-[#0c1c24]";
        }
    };
    const ArrowDown = () => {
        return (
            <CaretDownOutlined className=" text-white text-lg" />
        )
    }

    const CardRank = ({ data }: any) => {
        const Ranker = () => {
            if (data.rank > 3) {
                return (
                    <div className="text-center flex justify-center items-center text-[#fff] text-4xl font-extrabold">
                        <span>{data.rank}</span>
                    </div>)
            }
            else {
                return (
                    <div className={"relative h-14 w-14 text-center flex justify-center items-center text-[#fff] text-4xl font-extrabold"}>
                        <img src={data?.shield} />
                        <div className="absolute ">
                            <span>{data.rank}</span>
                        </div>
                    </div>)
            }
        }


        return (
            <div className="h-24 col-span-2 grid grid-cols-[repeat(16,_minmax(0,_1fr))]  bg-primary-dark shadow-[0_0_15px_5px_rgba(0,0,0,0.5)]   " >
                <div className="col-span-2 text-center flex justify-center items-center">
                    <Ranker />
                </div>

                <div className="col-span-2 text-center  flex justify-center items-center bg-primary-dark ">
                    <img src={data.game} className="h-18 w-18 object-contain" />
                </div>
                <div className="col-span-2 text-center flex justify-center items-center  ">
                    <div className={"relative h-14 w-14 text-center flex justify-center items-center text-[#fff] text-base font-light"}>
                        <img src={data.avatar} className="object-contain relative" />
                        <p className="absolute bottom-[-10px] left-[-10px] w-[20px] h-[20px] bg-[#222C36] rounded-[5px]">{data.level}</p>
                    </div>
                </div>
                <div className="col-span-2 text-center flex justify-center items-center text-[#fff] text-sm wide:text-lg font-extrabold">
                    {data.username}
                </div>
                <div className="col-span-2 text-center flex justify-center items-center text-blue-300 text-base wide:text-2xl font-extrabold">
                    {data.win}
                </div>
                <div className="col-span-2 text-center flex justify-center items-center text-blue-300 text-base wide:text-2xl font-extrabold">
                    {data.lose}
                </div>
                <div className="col-span-2 text-center flex justify-center items-center">
                    <div className='flex-end justify-center flex-col'>
                        <div className="text-center text-lg wide:text-3xl font-extrabold text-[#fff]">{data.totol} $</div>
                        <div className="text-right text-sm wide:text-base font-extrabold text-[#94bd4b]">= {data.blc} BLC</div>
                    </div>
                </div>
                <div className="col-span-2 text-center flex justify-center items-center">
                    <img src={data.member} className="h-10 w-10 wide:h-14 wide:w-14 object-contain" />
                </div>
            </div>
        )
    }



    return (

        <div className="flex justify-center">
            <div className="h-full w-full">
                    <div className="p-6 w-full h-18 border-l-4 border-[#94bd4b] flex space-x-4 items-center justify-items-center text-center
                                bg-gradient-to-r from-[#142835] to-[#0d212a]">
                        <p className="text-[#fff] text-lg font-bold">MY POSITION IN THE RANKING</p>
                    </div>

                    <div className="h-24 col-span-2 grid grid-cols-[repeat(16,_minmax(0,_1fr))] grid-rows-1 shadow-[0_0_15px_5px_rgba(0,0,0,0.5)] ">
                        <div className="col-span-2 text-center flex justify-center items-center ">
                            <div className={"relative h-14 w-14 text-center flex justify-center items-center text-[#fff] text-4xl font-extrabold"}>
                                <img src={shield1st} />
                                <div className="absolute ">
                                    <span>1</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 text-center  flex justify-center items-center">
                            <img src={lol} className="h-18 w-18 object-contain" />
                        </div>
                        <div className="col-span-2 text-center flex justify-center items-center  ">
                            <div className={"relative h-14 w-14 text-center flex justify-center items-center text-[#fff] text-base font-light"}>
                                <img src={avatar} className="object-contain relative" />
                                <p className="absolute bottom-[-10px] left-[-10px] w-[20px] h-[20px] bg-[#222C36] rounded-[5px]">12</p>
                            </div>
                        </div>
                        <div className="col-span-2 text-center flex justify-center items-center text-[#fff] text-sm wide:text-lg font-extrabold">
                            Name PLayer
                        </div>
                        <div className="col-span-2 text-center flex justify-center items-center text-blue-300 text-base wide:text-2xl font-extrabold">
                            100
                        </div>
                        <div className="col-span-2 text-center flex justify-center items-center text-blue-300 text-base wide:text-2xl font-extrabold">
                            16
                        </div>
                        <div className="col-span-2 text-center flex justify-center items-center">
                            <div className='flex-end justify-center flex-col'>
                                <div className="text-center text-lg wide:text-3xl font-extrabold text-[#fff]">98,256 $</div>
                                <div className="text-right text-sm wide:text-base font-extrabold text-[#94bd4b]">= 4,912.8 BLC</div>
                            </div>
                        </div>
                        <div className="col-span-2 text-center flex justify-center items-center">
                            <img src={trophy1st} className="h-10 w-10 wide:h-14 wide:w-14 object-contain" />
                        </div>
                    </div>

                    <div className="relative">
                        <div className="p-6 w-full h-18 border-l-4 border-[#94bd4b] flex space-x-4 items-center text-center 
                                bg-gradient-to-r from-[#142835] to-[#0d212a] justify-between">
                            <p className="text-[#fff] text-lg font-bold ">Top 100</p>

                            <div className="flex justify-end items-center space-x-3">
                                <p className={clsx("p-[2px_30px] rounded-[20px] cursor-pointer text-[#fff] font-bold text-lg", active("All"))} onClick={() => setFillter("All")}>All times</p>
                                <p className={clsx("p-[2px_30px] rounded-[20px] cursor-pointer text-[#fff] font-bold text-lg", active("Montly"))} onClick={() => setFillter("Montly")}>Montly</p>
                                <p className={clsx("p-[2px_30px] rounded-[20px] cursor-pointer text-[#fff] font-bold text-lg", active("Weekly"))} onClick={() => setFillter("Weekly")}>Weekly</p>
                                <p className={clsx("p-[2px_30px] rounded-[20px] cursor-pointer text-[#fff] font-bold text-lg", active("Daily"))} onClick={() => setFillter("Daily")}>Daily</p>
                            </div>
                        </div>
                    </div>


                    <div className="h-10 grid grid-cols-[repeat(16,_minmax(0,_1fr))] bg-[#242424] shadow-[0_0_15px_5px_rgba(0,0,0,0.5)]">
                        <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
                            Rank
                        </div>
                        <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
                            Game
                        </div>
                        <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
                            Avatar
                        </div>
                        <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
                            Username
                        </div>
                        <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
                            Wins
                        </div>
                        <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
                            Losses
                        </div>
                        <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
                            Total earnings
                        </div>
                        <div className="col-span-2 text-center  flex justify-center items-center text-[#fff] text-sm wide:text-lg font-semibold">
                            Member
                        </div>
                    </div>

                    <div style={{
                        height: 'calc(100vh - 555px)'
                    }} className="setting-scroll w-full overflow-y-auto space-y-1 bg-primary-dark shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] ">

                        {DummyData.map(item => {
                            return <CardRank data={item} />
                        })}
                    </div>
                </div>
            </div>
    );
};
export default Ranking;
