import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { Input,Select } from "antd"
import "./style.css"
import { useNavigate } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";

interface Props {
    setShowPopup: (show: boolean) => void;
    betAmount: any;
    onUpdateBetAmount: any
}

const SelectAmount = ({ setShowPopup, betAmount, onUpdateBetAmount }: Props) => {

    const navigate = useNavigate();
    const [changedBetAmount, setChangedBetAmount] = useState(0);

    const ArrowDown = () => {
        return (
            <CaretDownOutlined className = " text-white text-lg" />
        )
    }
    return (
        <div className="w-[650px] bg-primary-dark text-black">
            <div className="h-[75px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5 flex items-center justify-center ">
                <p className="text-white text-center uppercase font-bold text-base">
                    select the amount
                </p>
                <button onClick={() => { setShowPopup(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-4">
                    <XIcon className="text-white w-9" />
                </button>
            </div>
            <div className="flex flex-col items-center py-12 gap-2">
                <div className="flex flex-col items-start w-full px-28">
                    <div className="flex justify-between w-full items-center">
                        <p className="text-white uppercase text-lg font-bold ">Change the amount($)</p>
                        <p className = "font-bold text-base text-primary-sky ">{betAmount} in total/person</p>
                    </div>
                    {/* <Select defaultValue="25" style={{ width: "100%",color: "#fff",borderRadius:"0px",height: "50px" }}
                     className = "Selecter  mt-4 border-y-0 border-r-0 border-l-4 border-primary-green "
                     suffixIcon = {<ArrowDown />}
                     dropdownClassName = "rounded-none bg-[#2e2e2e] text-white"
                     >
                         <Select.Option value="25" className = "text-white hover:text-black">25$</Select.Option>
                         <Select.Option value="50" className = "text-white hover:text-black">50$</Select.Option>
                         <Select.Option value="75" className = "text-white hover:text-black">75$</Select.Option>
                         <Select.Option value="100" className = "text-white hover:text-black" >100$</Select.Option>
                    </Select> */}
                    <Input
                        className="w-full h-14 mt-4 text-lg  text-white Enterpass bg-[#2e2e2e] border-l-4 rounded-none border-y-0 border-r-0 border-primary-green"
                        placeholder="Change Amount (USD)"
                        type="number"
                        name="bet_amount"
                        min={1}
                        value={changedBetAmount ? changedBetAmount : betAmount}
                        onChange={(e:any) => {setChangedBetAmount(e.target.value)}}
                    />
                    <div className="mt-3 flex items-start">
                        <InformationCircleIcon className=" mt-1 w-5  text-white" />
                        <span className="ml-2 text-white w-[395px]">This is the amount you want to bet  in this match. You can change this under your avatar in the room. When
                            your team win, you will get partially % of your share.
                        </span>
                    </div>
                </div>
                <button
                    className="bg-primary-sky/30 tracking-wider mt-10 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => {
                        onUpdateBetAmount(changedBetAmount)
                        setShowPopup(false);
                    }}
                >
                    confirm
                </button>
                <button
                    className="
                     mt-2 w-80 h-16 text-white font-bold tracking-wider rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => {
                        setShowPopup(false)
                    }}
                >
                    not now
                </button>
            </div>


        </div>
    )
}

export default SelectAmount;