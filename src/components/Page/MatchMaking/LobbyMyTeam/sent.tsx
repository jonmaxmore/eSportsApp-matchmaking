import React, { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";

const Sent = ({ avtarName, visible, setVisible, onSubmit = () => { } }: any) => {




    
    return (
        <Modal
            visible={visible}
            centered
            footer={null}
            title={null}
            closable={false}
            bodyStyle={{ padding: "0px" }}
            className="p-0 w-full flex items-center justify-center"
        >
            <div className="relative bg-primary-dark text-white pb-4 w-[550px]">
                {/* Close */}
                <div
                    className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-r from-[#122e3a] to-[#0e1719] rounded-lg shadow-lg"
                    onClick={() => setVisible(false)}
                >
                    <XIcon className="text-bold w-[18px] h-[18px] font-bold text-white" />
                </div>
                {/* Title */}
                <div className="flex flex-col h-[64px] justify-center items-center text-center min-w-[550px] bg-gradient-to-r from-[#122e3a] to-[#0e1719]">
                    <p className="text-lg font-bold py-4">INVITATION HAS BEEN SENT</p>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center gap-[24px] overflow-auto px-[30px] py-[30px] w-full">
                    <div className="flex flex-col items-center justify-center w-full gap-2 py-4 ">
                        <div className="flex items-center gap-2">
                            <p className="text-base font-light">Your invitation to </p>
                            <p className="text-base font-bold text-primary-sky ">{avtarName}</p>
                            <p className="text-base font-light">has been sent. Please wait for their reponse</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-base font-light">shortly. Meanwhile, You can keep inviting other people.</p>
                        </div>
                    </div>
                    <button
                        className="w-[225px] px-10 h-[48px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
                        onClick={async () => {
                            await setVisible(false);
                            await onSubmit();
                        }}
                    >
                        GOT IT
                    </button>
                </div>
            </div>
        </Modal>
    );
};


export default Sent;
