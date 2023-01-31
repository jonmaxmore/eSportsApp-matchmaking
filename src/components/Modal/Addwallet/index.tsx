

import React,{useState} from "react";
import { XIcon,MinusIcon } from "@heroicons/react/outline";
import Logo from "@Image/LG-battleLab.png"
import { Checkbox, Radio } from "antd"
import coinbaselogo from "@Image/coinbase.png"
import metamasklogo from "@Image/metamask.png"
import walletconnectlogo from "@Image/wallet_connect.png"
import trustwalletlogo from "@Image/trust_wallet.png"
import "./style.css"
import clsx from "clsx";


interface Props {
    setOpenAddwallet: (show: boolean) => void;
}

const Block = ({ setOpenAddwallet }: Props) => {

    const [isSelected, setIsSelected] = useState(0);
    const Selected = (value: number) => {
        if(value === isSelected){
            console.log("value", value)
            return "border-4 border-primary-sky bg-primary-sky/30"
        }else{
            return "bg-[#121a1c]"
        }
        
    }
    return (
        <div className="w-[1000px] bg-primary-dark text-black relative">

            <button onClick={() => { setOpenAddwallet(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-6">
                <XIcon className="text-white w-9" />
            </button>
            <button onClick={() => { setOpenAddwallet(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-20">
                <MinusIcon className="text-white w-9" />
            </button>
            <div className="w-full flex justify-center items-center ">
                <img src={Logo} alt="logo" className="w-[350px] object-contain mt-4 " />
            </div>
            <div className="flex flex-col items-center pb-12 gap-2">
                <div className="flex flex-col items-center text-white">
                    <p className="text-[#bdc0c1] font-normal ">Connect battlelab to your crypto wallet.</p>

                    <div className="flex items-center mt-4">
                        <Checkbox className="checked" value={""} />
                        <p className="ml-6">I agree to </p>
                        <p className="ml-1 underline">Terms & Condition</p>
                        <p className="ml-1" >and </p>
                        <p className="ml-1 underline">Privacy Policy</p>
                    </div>
                </div>
                <Radio.Group className = "w-full h-full" onChange={(item) => {
                    console.log(item.target.value)
                    setIsSelected(item.target.value)
                }}>
                    <div className="grid grid-cols-2 gap-10 w-full mt-6 px-32">
                        <div className={clsx("h-36 w-full  shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] py-3 px-6 relative",Selected(1))}>
                            <div className="text-white font-bold text-lg tracking-wide">MetaMask</div>
                            <div className={clsx("flex w-full h-full  items-center absolute top-3 right-0 px-6 ")}>
                                <Radio value={1} className = "radio2"></Radio>
                                <img src={metamasklogo} alt="logo" className="w-[200px] ml-4 object-contain" />
                            </div>
                        </div>
                        <div className={clsx("h-36 w-full  shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] py-3 px-6 relative",Selected(2))}>
                            <div className="text-white font-bold text-lg tracking-wide">WalletConnect</div>
                            <div className="flex w-full h-full  items-center absolute top-3 right-0 px-6 ">
                                <Radio value={2} className = "radio2"></Radio>
                                <img src={walletconnectlogo} alt="logo" className="w-[280px] ml-4 object-contain" />
                            </div>
                        </div>
                        <div className={clsx("h-36 w-full  shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] py-3 px-6 relative",Selected(3))}>
                            <div className="text-white font-bold text-lg tracking-wide">TrustWallet</div>
                            <div className="flex w-full h-full  items-center absolute top-3 right-0 px-6 ">
                                <Radio value={3} className = "radio2"></Radio>
                                <img src={trustwalletlogo} alt="logo" className="w-[200px] ml-4 object-contain" />
                            </div>
                        </div>
                        <div className={clsx("h-36 w-full  shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] py-3 px-6 relative",Selected(4))}>
                            <div className="text-white font-bold text-lg tracking-wide">Coinbase Wallet</div>
                            <div className="flex w-full h-full  items-center absolute top-3 right-0 px-6 ">
                                <Radio value={4} className = "radio2"></Radio>
                                <img src={coinbaselogo} alt="logo" className="w-[200px] ml-4 object-contain" />
                            </div>
                        </div>
                    </div>
                </Radio.Group>
                <button
                    className="bg-primary-sky/30 mt-10 px-32 h-14 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => { }}
                >
                    connect to wallet
                </button>
            </div>


        </div>
    )
}

export default Block;