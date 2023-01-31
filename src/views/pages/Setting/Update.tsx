import React, { useState } from "react";
// import { Collapse, Select } from 'antd';
import "./styles.css";
import 'antd/dist/antd.css';
// import Update from "../Update/index"
import { Switch } from 'antd';

import ModalUpdatenow from '../Update/Updatenow';

// const { Panel } = Collapse;
// const { Option } = Select;

interface Props {
    ActivePop: (value: any) => void
}
const Setting = ({ ActivePop }: Props) => {
    // const [ActiveSide, setActiveSide] = useState('update');
    const [isUpdatenow, setUpdatenow] = useState(false)
    // const SubContent = () => {
    //     if (ActiveSide === 'update') {
    //         return <Update ActivePop={value => setActiveSide(value)} />
    //     }
    //     else {
    //         return <div>404</div>
    //     }
    // };

    function onChange(checked: any) {
        console.log(`switch to ${checked}`);
    }

    return (
        <div className="w-full h-full">

            <div className="w-full py-6 px-6 border-l-4 border-[#94bd4b] flex items-center justify-items-center text-center
                                bg-gradient-to-r from-[#11323f] to-[#0d212a]">
                <p className=" text-[#fff] text-base font-semibold">UPDATE BATTLELAB</p>
            </div>

            <div className="pt-8  w-full px-12">
                <p className=" mt-6 text-[#fff] text-base font-bold">LAST UPDATE</p>
                <p className=" mt-3 text-[#fff] text-base font-extralight">The last update was installed on 22 August 2021 at 13.55</p>

                <div className="w-full mt-6 border-b-2 border-[#333a3c]"></div>
                <div className="flex justify-between mt-10 ">
                    <p className=" text-[#fff] text-sm font-bold">AUTO DOWNLOAD OVER WI-FI</p>
                    <div className="flex items-center justify-center check">
                        <Switch defaultChecked onChange={onChange} className="bg-[#989898]" />
                    </div>
                </div>
                <p className=" mt-3 text-[#fff] text-base font-extralight">Download software updates automatically when connected to a Wi-Fi network.</p>
                <div className="w-full mt-6 border-b-2 border-[#333a3c]"></div>
                <div className="my-10">
                    <p className=" text-[#fff] text-base font-bold">UPDATE VER.0.01</p>
                    <p className=" mt-3 text-[#fff] text-base font-extralight">There is a new update availble. Would you like to update it now?</p>
                </div>
                <div className="flex justify-center my-10">
                    <div className=" w-1/2 h-16 border-2 border-[#6bb8e7] flex justify-center bg-[#0f191c] rounded-md cursor-pointer" onClick={() => setUpdatenow(true)}>
                        <p className="flex items-center text-center text-[#fff] text-xl font-extrabold ">UPDATE NOW</p>
                    </div>
                </div>
                <ModalUpdatenow visible={isUpdatenow} setVisible={setUpdatenow} />
                <div className="flex items-center my-10">
                    <div style={{
                        height: '230px'
                    }} className="w-full pl-10 pr-16 bg-[#10191d]] border border-black shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] overflow-y-auto setting-scroll">
                        <p className="mt-6 text-[#fff] text-xl font-extrabold ">New Battlelab Update v.0.7</p>
                        <p className="mt-4 text-[#66696b] text-base font-medium ">Fri, January 21,2021</p>
                        <p className="mt-6 text-[#fff] text-base font-xs font-light ">Today's update includes Lorem lpsun is simply dummy text of the printing and typesetting industy.
                            Lorem lpsum has been the industy's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <p className="mt-6 text-[#fff] text-base font-medium ">Update Details</p>
                        <p className="mt-2 text-[#fff] text-base font-light ">-Fix bug lorem ipsum</p>
                        <p className="mt-2 text-[#fff] text-base font-light ">-Add lorem ipsum dummy text of the printing</p>
                        <p className="mt-2 mb-6 text-[#fff] text-base font-light ">-Adjust lorem ipsum dummy text</p>
                    </div>
                </div>
            </div>

        </div>

    );
};
export default Setting;