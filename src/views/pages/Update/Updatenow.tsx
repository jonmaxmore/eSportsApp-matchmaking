import React, { useState } from "react";
import { Modal } from "antd";
import { XIcon } from "@heroicons/react/solid";
import { MinusIcon } from "@heroicons/react/solid";
import Logo from '@Image/About/logo.png'
import ModalLoad from './Load';


const Updatenow = ({ visible, setVisible, onSubmit = () => { } }: any) => {

    const [isLoad, setLoad] = useState(false);

    const onUpdateNowHandler = () => {
        window.open(`https://battlelab.gg`
                , '_blank', 'width=1024,height=765,center=true');
    }

    return (
        <Modal
            visible={visible}
            footer={null}
            title={null}
            closable={false}
            bodyStyle={{ padding: "0px" }}
            className="p-0 w-full h-[500px] wide:h-[800px] flex items-center justify-center"
        >
            <div className="relative bg-primary-dark text-white h-[500px] wide:h-full wide:w-[700px] pt-16 px-8 overflow-y-auto">
                {/* Close */}
                <div className="w-full flex items-center justify-end top-2 right-[10px] absolute">
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
                    <img src={Logo} alt="alt-load-update" className="h-[100px] w-auto " />
                </div>

                {/* Content */}
                <div className="flex flex-col items-center gap-[24px] overflow-auto px-[30px] w-full">
                    <div className="flex flex-col items-center justify-center w-full gap-2   ">
                        <div className="flex items-center gap-2">
                            <p className="text-center text-lg font-light">There is an update for Battlelab client.</p>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                            <p className="text-center text-lg font-light">Would you like to restart Battlelab now to apply the update?</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-center text-lg font-light">You can also updatte this patch from the settings.</p>
                        </div>
                    </div>

                    <div className="flex justify-between w-full mt-6">
                        <button
                            className="mr-4 w-full h-[56px] bg-[#253D4C] rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
                            onClick={async () => {
                                // await setLoad(true);
                                // await onSubmit();
                                onUpdateNowHandler()
                            }}
                        >
                            UPDATE NOW
                        </button>
                        <ModalLoad visible={isLoad} setVisible={setLoad} />
                        <button
                            className="ml-4 w-full h-[56px] bg-primary-dark rounded border-2 border-[#6BB8E7] text-lg font-bold tracking-widest"
                            onClick={async () => {
                                await setVisible(false);
                                await onSubmit();
                            }}
                        >
                            NOT NOW
                        </button>
                    </div>

                    <div style={{
                        height: '385px'
                    }} className="w-full px-12 mt-6 mb-12 bg-primary-dark border border-black shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] overflow-y-auto setting-scroll">
                        <div>
                            <p className="mt-6 text-[#fff] text-lg font-extrabold ">New Battlelab Update v.0.7</p>
                            <p className="mt-4 text-[#66696b] text-base font-medium ">Fri, January 21,2021</p>
                            <p className="mt-6 text-[#fff] text-base font-xs font-extralight ">Today's update includes Lorem lpsun is simply dummy text of the printing and typesetting industy.
                                Lorem lpsum has been the industy's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <p className="mt-6 text-[#fff] text-base font-medium ">Update Details</p>
                            <p className="mt-2 text-[#fff] text-base font-extralight ">-Fix bug lorem ipsum</p>
                            <p className="mt-2 text-[#fff] text-base font-extralight ">-Add lorem ipsum dummy text of the printing</p>
                            <p className="mt-2 text-[#fff] text-base font-extralight ">-Adjust lorem ipsum dummy text</p>
                            <p className="mt-2 text-[#fff] text-base font-extralight ">-Add lorem ipsum dummy text of the printing</p>
                            <p className="mt-2 mb-6 text-[#fff] text-base font-extralight ">-Adjust lorem ipsum dummy text</p>
                        </div>

                        <div>
                            <p className="mt-6 text-[#fff] text-lg font-extrabold ">New Battlelab Update v.0.7</p>
                            <p className="mt-4 text-[#66696b] text-base font-medium ">Fri, January 21,2021</p>
                            <p className="mt-6 text-[#fff] text-base font-xs font-extralight ">Today's update includes Lorem lpsun is simply dummy text of the printing and typesetting industy.
                                Lorem lpsum has been the industy's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <p className="mt-6 text-[#fff] text-base font-medium ">Update Details</p>
                            <p className="mt-2 text-[#fff] text-base font-extralight ">-Fix bug lorem ipsum</p>
                            <p className="mt-2 text-[#fff] text-base font-extralight ">-Add lorem ipsum dummy text of the printing</p>
                            <p className="mt-2 mb-6 text-[#fff] text-base font-extralight ">-Adjust lorem ipsum dummy text</p>
                        </div>
                    </div>

                </div>
            </div>
        </Modal>
    );
};


export default Updatenow;
