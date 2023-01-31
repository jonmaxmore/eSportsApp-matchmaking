import React, { useState } from "react";
import RedLoL from "@Image/Matchmaking/redlol.jpg"
import BlueLoL from "@Image/Matchmaking/bluelol.jpg"
import RedCrad from "./RedCrad";
import BlueCrad from "./BlueCrad";
import Hexagon from "@Image/Matchmaking/frame-hexagon.png"
import BgHexagon from "@Image/Matchmaking/bg-hexagon.png"
import { ReactComponent as Sword } from "@Image/Matchmaking/sword.svg";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import Wheelspin from "./WheelSpin";
import "./style.css"
import WinCard from "./Win";
import LoseCard from "./lose";


const MatachLobby = () => {

    const [ShowWheel, setShowWheel] = useState(false);
    const [win, setWin] = useState(false);
    const [lose, setLose] = useState(false);

    const navigate = useNavigate();
    return (
        <div
            style={{
                height: "calc(100vh - 110px)",
            }}
            className="pt-6 px-12 overflow-y-auto scroll"
        >
            <div className="grid grid-cols-11  2xl:grid-cols-11  grid-rows-5 h-[1700px] xl:h-[750px]">
                <div className=" w-full h-full col-span-3 row-span-3 pb-4">
                    <img src={RedLoL} className="w-full h-full object-cover " />
                </div>
                <div className=" w-full h-full col-span-8  row-span-2 flex justify-start">
                    <RedCrad />
                    <div className="w-16 h-[280px] bg-gradient-to-b from-[#e40000] to-[#5c0000] flex flex-col justify-center items-center">
                        <p className="text-3xl text-center">T<br />e <br />a<br />m</p>
                        <p className="text-[43px] text-center font-black">1</p>
                    </div>
                </div>


                <div className=" w-full h-full  col-span-5  row-span-1 relative">
                    <div className="absolute w-full h-full flex justify-start items-center px-8 z-40">
                        <span className="h-[15px] border-y-2 border-primary-green" style={{
                            width: "calc(50% - 34px)",
                        }}></span>
                        <span className="h-[15px] w-[68px] flex justify-center items-center " >
                            <Sword className=" w-10 h-10" />

                        </span>
                        <span className="h-[15px] border-y-2 border-primary-green" style={{
                            width: "calc(50% - 34px)",
                        }}></span>
                    </div>
                    <div className="absolute w-full h-full flex justify-center items-center z-0">
                        <img src={BgHexagon} className="absolute w-24 h-24 object-contain" />
                    </div>
                    <div className="absolute w-full h-full flex justify-center items-center z-0">
                        <img src={Hexagon} className="absolute w-24 h-24 object-contain" />
                    </div>



                </div>



                <div className=" w-full h-full col-span-3 row-span-3 relative pt-4">
                    <img src={BlueLoL} className="w-full h-full object-cover brightness-[0.25] " />
                    <div className="absolute w-full h-full  top-4 left-0 right-0 p-6 text-[18px] flex flex-col gap-6">
                        <div className="flex gap-3">
                            <span>Room Name: </span><span className="font-bold ">Kumachang's Room</span>
                        </div>
                        <div className="flex gap-3">
                            <span>Password: </span><span className="font-bold ">123456</span>
                        </div>
                        <div className="xl:flex block gap-3">
                            <span>Type: </span><span className="font-bold text-primary-sky">5vs5 Matchmaking </span>
                        </div>
                        <div className="flex gap-3">
                            <span>Players: </span><span className="font-bold ">10/10 </span>
                        </div>

                        <div className="xl:flex block gap-3">
                            <span>Individal: </span>
                            <div>
                                <p className="font-bold ">5$/person</p>
                                <p className="font-bold text-base text-primary-green">= 62.5 BLC</p>
                            </div>
                        </div>
                        <div className="xl:flex block  gap-3">
                            <span>Room: </span>
                            <div>
                                <p className="font-bold ">25 $ in total</p>
                                <p className="font-bold text-base text-primary-green">= 362.5 BLC</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full h-full col-span-8  row-span-2 flex items-end pt-6">

                    <div className="w-16 h-[280px] bg-gradient-to-b from-[#4785ad] to-[#1c364e] flex flex-col justify-center items-center">
                        <p className="text-3xl text-center">T<br />e <br />a<br />m</p>
                        <p className="text-[43px] text-center font-black">2</p>
                    </div>
                    <BlueCrad />

                </div>

            </div>
            <div className="flex justify-between items-center mt-4">

                {/* Test win button */}
                {/* <button className=" border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44  rounded-sm"
                    onClick={() => setWin(true)}

                >
                    test win
                </button> */}

                {/* Test lose button */}
                {/* <button className="bg-primary-sky/30 border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44 rounded-sm"
                    onClick={() => setLose(true)}
                >
                    test lose
                </button> */}
                
                <Modal visible={win} footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 bg-transparent w-full h-auto flex items-center justify-center">
                    <WinCard win={win} setWin={setWin} />
                </Modal>
                <Modal visible={lose} footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 bg-transparent w-full h-auto flex items-center justify-center">
                    <LoseCard lose={lose} setLose={setLose} />
                </Modal>

            </div>
            <div className="flex justify-between items-center mt-4">
                <button className=" border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44  rounded-sm"
                    onClick={() => navigate(`/home`)}

                >
                    leave room
                </button>
                <button className="bg-primary-sky/30 border-2 border-primary-sky text-white text-xl cursor-pointer mt-4  w-auto h-16 font-semibold uppercase py-2 px-20 xl:px-36 2xl:px-44 rounded-sm"
                    onClick={() => setShowWheel(true)}
                >
                    ready
                </button>
                <Modal visible={ShowWheel} footer={null} title={null} closable={false} bodyStyle={{ padding: "0px" }} className="p-0 bg-transparent w-full h-auto flex items-center justify-center">
                    <Wheelspin />
                </Modal>

            </div>
        </div>
    )
}

export default MatachLobby;