import React from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";

const Unblock = ({ visible, setVisible, onSubmit = () => { } }: any) => {
    return (
        <Modal
            visible={visible}
            footer={null}
            title={null}
            closable={false}
            bodyStyle={{ padding: "0px" }}
            className="p-0 w-full h-[500px] wide:h-[800px] flex items-center justify-center"
        >
            <div className="relative bg-primary-dark text-white pb-8 w-[700px]">
                {/* Close */}
                <div
                    className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-r from-[#122e3a] to-[#0e1719] rounded-lg shadow-lg"
                    onClick={() => setVisible(false)}
                >
                    <XIcon className="text-bold w-[18px] h-[18px] font-bold text-white" />
                </div>
                {/* Title */}
                <div className="flex flex-col h-[64px] justify-center items-center text-center min-w-[600px] bg-gradient-to-r from-[#122e3a] to-[#0e1719]">
                    <p className="text-lg font-bold py-4">UNDER CONSTRUCTION</p>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center gap-[24px] overflow-auto px-[30px] py-[30px] w-full">
                    <div className="flex flex-col items-center justify-center w-full gap-2 px-6 py-10 ">
                        <div className="flex items-center gap-2">
                            <p className="text-base font-light">We sincerely apologize for the inconvenience. Our platform is currently </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-base font-light">undergoing scheduled maintenance and upgrades. Thank you for your patience.</p>
                        </div>
                    </div>
                    <button
                        className="w-[250px] px-10 h-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
                        onClick={async () => {
                            await setVisible(false);
                            await onSubmit();
                        }}
                    >
                        OKAY
                    </button>
                </div>
            </div>
        </Modal>
    );
};


export default Unblock;
