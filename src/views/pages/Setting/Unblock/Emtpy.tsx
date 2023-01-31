import React from "react";
import 'antd/dist/antd.css';

interface Props {
    ActivePop: (value: any) => void
}

const Setting = ({ ActivePop }: Props) => {

    return (
        <div className="w-full h-full">

            <div className="w-full py-6 border-l-4 border-[#94bd4b] flex items-center justify-items-center text-center
                                bg-gradient-to-r from-[#11323f] to-[#0d212a]">
                <p className="pl-6 text-[#fff] text-base font-semibold">BLOCKED USERS</p>
            </div>

            <div className="w-full flex justify-center items-center my-12">
                <p className="text-[#fff] text-xl font-semibold tracking-wider">No blocked users</p>
            </div>
            <div className="w-full flex justify-center items-center my-12">
                <p className="px-16 text-[#fff] text-center text-base font-light tracking-wider">Your blocked users list is empty. When you blocked someone on Battlelab. you can find their usernames and unblock here.</p>
            </div>

        </div>

    );
};
export default Setting;