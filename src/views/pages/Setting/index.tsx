import React, { useEffect, useReducer, useState } from "react";
import { XIcon } from '@heroicons/react/solid';
// import { Collapse, Select } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import "./styles.css";
import 'antd/dist/antd.css';
import clsx from "clsx";
import Account from "./Account"
import Notification from "./Notification"
import Blocked from "./Blocked"
import Linkid from "./Linkid"
import Update from "./Update"
import Transaction from "./Transaction"
import UserAPI from "@api/UserAPI";
import Logout from "./Logout";

// const { Panel } = Collapse;
// const { Option } = Select;

interface Props {
    ActivePop: (value: any) => void
}
const Setting = ({ ActivePop }: Props) => {
    const [logout, setLogout] = React.useState(false);

    const [state, setState] = useReducer(
        (state: any, newState: any) => ({ ...state, ...newState }),
        {
            user: {
                name: "",
                codeId: "",
                email: "",
                avtarName: "",
                img_url: "",
                level: 0,
                defaultLang: "EN"
            }
            
        }
    );

    useEffect(() => {
        getUser();
    }, [])

    const getUser = () => {

        UserAPI.getUserDetail()
            .then(res => {
                if (res.data.success) {
                    setState({
                        user: {
                            name: res.data.user.name,
                            codeId: res.data.user.code_id,
                            email: res.data.user.email,
                            avtarName: res.data.user.avatar_unique_name,
                            img_url: res.data.user.avatar_image,
                            level: res.data.user.level,
                            defaultLang: res.data.user.default_lang
                        }
                        
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }
    
    // const Menuse = (
    //     <Menu>
    //         <Menu.Item key="0">
    //             <a >English</a>
    //         </Menu.Item>
    //         <Menu.Item key="1">
    //             <a >Thai</a>
    //         </Menu.Item>
    //     </Menu>
    // );

    const active = (value: string) => {
        if (ActiveSide === value) {
            return "border-l-4 border-[#94bd4b] bg-[#003237]";
        } else {
            return "bg-[#0c191e]] ";
        }
    };


    const [ActiveSide, setActiveSide] = useState('account');

    const SubContent = () => {
        if (ActiveSide === 'account') {
            return <Account User={state.user} ActivePop={value => setActiveSide(value)} />
        }
        if (ActiveSide === 'notification') {
            return <Notification ActivePop={value => setActiveSide(value)} />
        }
        if (ActiveSide === 'blocked') {
            return <Blocked ActivePop={value => setActiveSide(value)} />
        }
        if (ActiveSide === 'transaction') {
            return <Transaction ActivePop={value => setActiveSide(value)} />
        }
        if (ActiveSide === 'linkid') {
            return <Linkid ActivePop={value => setActiveSide(value)} />
        }
        if (ActiveSide === 'update') {
            return <Update ActivePop={value => setActiveSide(value)} />
        }
        else {
            return <div>404</div>
        }
    };

    // const menu = (
    //     <Menu>
    //         <Menu.Item>
    //             <a target="_blank" rel="noopener noreferrer" >
    //                 Kumachan
    //             </a>
    //         </Menu.Item>
    //         <Menu.Item disabled>
    //             <a target="_blank" rel="noopener noreferrer" >
    //                 Akasuki
    //             </a>
    //         </Menu.Item>
    //     </Menu>
    // );



    return (
        <div className="flex justify-center animated bounceInLeft2 bounceInDown">
            <div className="w-full h-full bg-transparent"  >
                <div style={{
                    width: '100%',
                    height: 'calc(100vh - 150px)',
                    backgroundColor: 'transparent',
                }} className="relative ">
                    <XIcon className='absolute top-3 w-9 h-9 right-3 cursor-pointer z-50' onClick={() => ActivePop('')} />

                    <div className="bg-[#071e24] shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] border border-black w-full h-full flex justify-center items-center flex-col">
                        <p className="mt-8 mb-6 text-center text-[#fff] text-2xl font-extrabold animated ">SETTING</p>

                        <div className="flex justify-beetween w-full px-12">
                            <div className="h-[412px] wide:h-[600px] mr-12 w-1/3 bg-[#0c191e] shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] border border-black overflow-y-auto animated2 bounceInLeft2 bounceInDown">
                                <div className="mt-10 flex justify-center items-center">
                                    <p className=" flex justify-center items-center text-2xl font-semibold">{state.user.avtarName}</p>
                                    <CaretRightOutlined rotate={90} className="ml-4 flex justify-center items-center" />
                                </div>
                                <p className="mt-2 mb-10 flex justify-center items-center text-[#fff] text-sm font-normal">Code ID : {state.user.codeId}</p>

                                <div className={clsx("w-full h-16 flex items-center duration-500", active("account"))} onClick={() => setActiveSide("account")}>
                                    <p className="mx-6 w-full text-[#fff] text-base font-semibold flex justify-between ">ACCOUNT<DownOutlined rotate={270} className="flex items-center" /></p>
                                </div>
                                <div className={clsx("w-full h-16 flex items-center duration-500", active("notification"))} onClick={() => setActiveSide("notification")}>
                                    <p className="mx-6 w-full text-[#fff] text-base font-semibold flex justify-between">NOTIFICATION<DownOutlined rotate={270} className="flex items-center" /></p>
                                </div>
                                <div className={clsx("w-full h-16 flex items-center duration-500", active("blocked"))} onClick={() => setActiveSide("blocked")}>
                                    <p className="mx-6 w-full text-[#fff] text-base font-semibold flex justify-between">BLOCKED USERS<DownOutlined rotate={270} className="flex items-center" /></p>
                                </div>
                                <div className={clsx("w-full h-16 flex items-center duration-500", active("transaction"))} onClick={() => setActiveSide("transaction")}>
                                    <p className="mx-6 w-full text-[#fff] text-base font-semibold flex justify-between">TRANSACTION<DownOutlined rotate={270} className="flex items-center" /></p>
                                </div>
                                <div className={clsx("w-full h-16 flex items-center duration-500", active("linkid"))} onClick={() => setActiveSide("linkid")}>
                                    <p className="mx-6 w-full text-[#fff] text-base font-semibold flex justify-between">LINK ID TO MAIN GAME ID<DownOutlined rotate={270} className="flex items-center" /></p>
                                </div>
                                <div className={clsx("w-full h-16 flex items-center duration-500", active("update"))} onClick={() => setActiveSide("update")}>
                                    <p className="mx-6 w-full text-[#fff] text-base font-semibold flex justify-between">UPDATE BATTLELAB<DownOutlined rotate={270} className="flex items-center" /></p>
                                </div>
                                <div className="flex justify-center my-10 mx-6" onClick={() => { setLogout(true) }}>
                                    <div className=" w-[250px] h-16 border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer">
                                        <button className="flex items-center text-center text-[#fff] text-lg font-extrabold " >LOG OUT</button>
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                height: 'calc(100vh - 250px)'
                            }} className="w-2/3 shadow-[0_0_15px_5px_rgba(0,0,0,0.7)] border border-black bg-[#0c191e] overflow-y-auto animated3 bounceInLeft2 bounceInDown">
                                <div className={clsx(ActiveSide === '' ? "hidden" : ""," duration-500")}>
                                    <SubContent />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal visible={logout} footer={null} title={null} centered closable={false} bodyStyle={{ padding: "0px" }} className="p-0 w-full h-auto flex items-center justify-center">
                        <Logout setLogout={setLogout}/>
                    </Modal>
                </div>
            </div>
        </div>

    );
};
export default Setting;