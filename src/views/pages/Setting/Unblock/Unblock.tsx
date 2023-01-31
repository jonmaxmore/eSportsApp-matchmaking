import React from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";

const Unblock = ({ visible, setToUserId, setVisible, onSubmit, avtarName }: any) => {
    
    const onSubmitHandler = () => {
        const postData : any = {
            to_user_id : setToUserId,
            is_blocked : false,
        }
        onSubmit(postData);
    }
    
    return (
        <Modal
            visible={visible}
            footer={null}
            title={null}
            closable={false}
            bodyStyle={{ padding: "0px" }}
            className="p-0 w-full h-auto flex items-center justify-center"
        >
            <div className="relative bg-[#0E1518] text-white">
                <div
                    className="absolute top-0 right-0 mt-5 mr-5 cursor-pointer flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-r from-[#122e3a] to-[#0e1719] rounded-lg shadow-lg"
                    onClick={() => setVisible(false)}
                >
                    <XIcon className="text-bold w-[18px] h-[18px] font-bold text-white" />
                </div>
                <div className="flex flex-col h-[84px] justify-center items-center text-center min-w-[600px] bg-gradient-to-r from-[#122e3a] to-[#0e1719]">
                    <p className="text-lg font-bold py-4">UNBLOCK</p>
                </div>

                <div className="flex flex-col items-center gap-[24px] overflow-auto px-[30px] py-[30px] w-full">
                    <div className="flex flex-col items-center justify-center w-full gap-2 px-6 py-10 ">
                        <div className="flex items-center gap-2">
                            <p className="text-base font-light">Are you sure you want to unblock <span className="text-white font-bold"> {avtarName}</span>. They will be able to see your profile,</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-base font-light">message, send you a message,invitation to match once you unblock them.</p>
                        </div>
                    </div>
                    <button
                        className="w-[250px] px-10 h-[60px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
                        onClick={async () => {
                            // await setVisible(false);
                            // await onSubmit();
                            onSubmitHandler();
                        }}
                    >
                        UNBLOCK
                    </button>

                    <button
                        className="w-[250px] px-10 h-[60px] bg-[#000] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
                        onClick={async () => {
                            await setVisible(false);
                        }}
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default Unblock;