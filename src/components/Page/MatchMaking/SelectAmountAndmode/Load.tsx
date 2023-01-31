import React, { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";
import { MinusIcon } from "@heroicons/react/solid";
import Logo from '@Image/About/logo.png'
import { Progress } from 'antd';
import ModalFinish from './Finish';

const Load = ({ visible, setVisible, onSubmit = () => { } }: any) => {

    const [isFinish, setFinish] = useState(false);
    return (
        <Modal
            visible={visible}
            footer={null}
            title={null}
            closable={false}
            bodyStyle={{ padding: "0px" }}
            className="p-0 w-full h-[500px] wide:h-[800px] flex items-center justify-center"
        >
            <div className="relative bg-primary-dark text-white pt-12 pb-8 px-8 w-[700px]">
                {/* Close */}
                <div className="w-full flex items-center justify-end top-2 right-[10px] absolute">
                    <button
                        className="mr-4 w-[96px] h-[56px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
                        onClick={async () => {
                            await setFinish(true);
                            await onSubmit();
                        }}
                    >
                        Finish
                    </button>
                    <ModalFinish visible={isFinish} setVisible={setFinish} />

                    <div
                        className="mr-2 cursor-pointer flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-r from-[#122e3a] to-[#0e1719] rounded-lg shadow-lg"
                        onClick={() => setVisible(false)}
                    >
                        <MinusIcon className="text-bold w-[18px] h-[18px] font-bold text-white" />
                    </div>

                    <div
                        className="ml-2 cursor-pointer flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-r from-[#122e3a] to-[#0e1719] rounded-lg shadow-lg"
                        onClick={() => setVisible(false)}
                    >
                        <XIcon className="text-bold w-[18px] h-[18px] font-bold text-white" />
                    </div>

                </div>

                <div className="w-full flex justify-center items-center">
                    <img src={Logo} alt="alt-load" className="h-[100px] w-auto " />
                </div>

                {/* Content */}
                <div className="flex flex-col items-center gap-[24px] overflow-auto px-[30px] w-full">
                    <div className="flex flex-col items-center justify-center w-full gap-2  ">
                        <div className="flex items-center gap-2 w-full">
                            <div className="flex justify-between gap-2 w-full">
                                <div>
                                    <p className="text-center text-lg font-extralight">Updating Battlelab...</p>
                                </div>
                                <div>
                                    <p className="text-center text-lg font-extralight">0.25 MB/4.69 GB</p>
                                </div>
                            </div>
                        </div>
                        <Progress percent={50} status="active" showInfo={false} className="w-full " />
                        <div className="flex justify-between gap-2 w-full pt-4">
                            <div className="w-full gap-2 ">
                                <p className="text-lefy text-lg font-extralight">Verifying insallation...</p>
                            </div>


                            <div className="flex justify-end w-full ">
                                <button
                                    className="w-[250px] h-[56px] bg-primary-dark rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
                                    onClick={async () => {
                                        await setVisible(false);
                                        await onSubmit();
                                    }}
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};


export default Load;
