import React from "react";
import UserAPI from "@api/UserAPI";
import { XIcon } from "@heroicons/react/outline";

interface Props {
    setBlock : (show: boolean) => void;
    toUserId : any;
    avatarName: any;
}

const Block = ({ setBlock, toUserId, avatarName }: Props) => {
    const blockUser = (toUserId : any) => {
        const payload = {
            to_user_id: toUserId,
            is_blocked: true
        }
        UserAPI.blockUnblockUserAPI(payload)
        .then(res => {
            if(res.data.success) {
                setBlock(false);
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="w-[700px] bg-primary-dark text-black">
            <div className="h-[75px] bg-gradient-to-r from-primary-light to-primary-dark relative p-5 flex items-center justify-center ">
                <p className="text-white text-center uppercase font-bold text-base">
                Block all communication
                </p>
                <button onClick={() => { setBlock(false) }} className=" bg-gradient-to-br from-[#133546] to-[#0e212e] rounded-md p-1.5 absolute top-3 right-4">
                    <XIcon className="text-white w-9" />
                </button>
            </div>
            <div className="flex flex-col items-center py-12 gap-2">
                <div className="flex flex-col items-center ">
                    <div>
                        <span className="text-[#bdc0c1] font-normal ">Are you sure you want to block all communication with </span>
                        <span className="text-white font-bold"> {avatarName} ?</span>
                    </div>
                    <p className="text-[#bdc0c1] font-normal ">You won't be able to send or resive direct masseges, won't resive notifications about incoming</p>
                    <p className="text-[#bdc0c1] font-normal ">messages from them,and won't be able to see their profile or massages in the chat rooms. YOu can</p>
                    <p className="text-[#bdc0c1] font-normal ">unlock them in the settings.</p>
                </div>
                <button
                    className="bg-primary-sky/30 mt-10 w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => blockUser(toUserId) }
                >
                    block
                </button>
                <button
                    className=" w-80 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg"
                    onClick={() => { setBlock(false) }}
                >
                    CANCEL
                </button>
            </div>


        </div>
    )
}

export default Block;