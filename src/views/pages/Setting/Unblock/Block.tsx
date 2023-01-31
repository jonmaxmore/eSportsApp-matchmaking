import React, { useState } from "react";
import 'antd/dist/antd.css';
import ModalUnblock from './Unblock';
import UserAPI from "../../../../api/UserAPI";
import _ from "lodash";

interface Props {
    blockedUsers : [];
    setBlockedUsers: (value: any) => void;
    ActivePop: (value: any) => void;
}
const Setting = ({ blockedUsers, setBlockedUsers, ActivePop }: Props) => {
    const [isUnblock, setUnblock] = useState(false);
    const [toUserId, setToUserId] = useState("");
    const [position, setPosition] = useState(0);
    const [avtarName, setAvtarName] = useState('');

    const updateBlockedUserStatus = (data : any) => {
        UserAPI.blockUnblockUserAPI(data)
        .then((res) => {
            if (res.data.success) {
                const tempBlockedUsers:any = _.cloneDeep(blockedUsers);
                const editBlockedUsers:any = tempBlockedUsers[position];
                editBlockedUsers.friend.is_blocked = false;
                tempBlockedUsers.splice(position,1, editBlockedUsers);
                setBlockedUsers(tempBlockedUsers);
                setUnblock(false);
            }
            else {
                // setValidationMessage(res.data.message);
            }
        })
        .catch(function (error) {
            console.log("error ", error);
        });
    };

    const CardRank = ({ data , position}: any) => {
        return (
            <div className="w-full h-auto ">
                <div className="w-full my-8 border-t-2 border-[#333a3c]"></div>
                <div className=" mt-10 w-full wide:w-2/3 h-10  flex items-center justify-between text-center">
                    <div className="flex justify-center items-center ">
                        <div className={"relative h-14 w-14 text-center flex justify-center items-center text-[#fff] text-base font-light"}>
                            <img src={data.avatar_image} alt="avatarimage" className="object-contain relative" />
                            <p className="absolute bottom-[-10px] left-[-10px] w-[20px] h-[20px] bg-[#222C36] rounded-[5px]">{data.level}</p>
                        </div>
                        <div className="flex-col justify-center items-center pl-6">
                            <p className="mb-2 text-left text-[#fff] text-base font-bold">{data.avatar_unique_name}</p>
                            <p className="text-left text-[#575a5b] text-base font-normal">{data.is_online ? 'Online' : 'Offline'}</p>
                        </div>
                    </div>
                    <div className="w-28 wide:w-36 h-12 border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer" 
                        onClick={ () => { setPosition(position); setAvtarName(data.avatar_unique_name); setUnblock(true); setToUserId(data.id) }}>
                        <p className="flex items-center text-center text-[#fff] text-lg font-bold " >UNBLOCK</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="w-full h-full">
            <ModalUnblock visible={isUnblock} setToUserId={toUserId} setVisible={setUnblock} onSubmit={updateBlockedUserStatus} avtarName={avtarName}/>

            <div className="w-full py-6 border-l-4 border-[#94bd4b] flex items-center justify-items-center text-center
                bg-gradient-to-r from-[#11323f] to-[#0d212a]">
                <p className="pl-6 text-[#fff] text-base font-semibold">ACCOUNT SETTINGS</p>
            </div>
            <div className="w-full px-12">
                {/* <div className=" mt-10 w-full wide:w-2/3 h-10  flex items-center justify-between text-center">
                    <div className="flex justify-center items-center ">
                        <div className={"relative h-14 w-14 text-center flex justify-center items-center text-[#fff] text-base font-light"}>
                            <img src={avatar} className="object-contain relative" />
                            <p className="absolute bottom-[-10px] left-[-10px] w-[20px] h-[20px] bg-[#222C36] rounded-[5px]">12</p>
                        </div>
                        <div className="flex-col justify-center items-center pl-6">
                            <p className="mb-2 text-left text-[#fff] text-base font-bold">Dayvee13</p>
                            <p className="text-left text-[#575a5b] text-base font-normal">Offline</p>
                        </div>
                    </div>
                    <div className="w-28 wide:w-36 h-12 border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer" onClick={() => setUnblock(true)}>
                        <p className="flex items-center text-center text-[#fff] text-lg font-bold " >UNBLOCK</p>
                    </div>
                </div> */}
                {blockedUsers.map((item: any, index: number) => {
                     if (item?.friend?.is_blocked) {
                        return <CardRank data={item} position={index}/>
                     }
                })}
            </div>

        </div>

    );
};
export default Setting;