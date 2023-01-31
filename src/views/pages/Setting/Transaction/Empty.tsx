import React from "react";
import 'antd/dist/antd.css';

interface Props {
    ActivePop: (value: any) => void
}
const Setting = ({ ActivePop }: Props) => {

    return (
        <div className="w-full h-full">
            <div className="w-full flex justify-center items-center pt-12">
                <p className="text-[#fff] text-lg font-semibold tracking-wider">No transaction yet</p>
            </div>
            <div className="w-full flex justify-center items-center py-8">
                <p className="px-16 text-[#fff] text-center text-base font-light tracking-wider">After your first transaction you will be able to view it here.</p>
            </div>

        </div>

    );
};

export default Setting;