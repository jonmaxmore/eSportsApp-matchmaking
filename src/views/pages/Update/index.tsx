import React, { useEffect, useState } from "react";

import "./styles.css";
import { XIcon } from '@heroicons/react/solid';
// import { Collapse, Select } from 'antd';
import ModalUpdatenow from './Updatenow';
import UpdatesAPI from "@api/UpdateAPI";
import moment from "moment";
// const { Panel } = Collapse;
// const { Option } = Select;

interface Props {
    ActivePop: (value: any) => void
}


const Update = ({ ActivePop }: Props) => {
    const [isUpdatenow, setUpdatenow] = useState(false)
    const [activeData, setActiveData] = useState({ activePage: 1, limit: 10, device_type: "Desktop" });
    const [updates, setUpdates] = useState([] as any)

    useEffect( () => {
        getAppAllUpdatesList(activeData)
    }, [activeData])

    const getAppAllUpdatesList = (data: any) => {
        UpdatesAPI.getApplicationsAllUpdatesAPI(data)
        .then(res => {
            if (res.data.success) {
                setUpdates(res.data.updates);
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="flex justify-center animated bounceInLeftfaq">
            <div className="w-full h-full bg-transparent mx-6 revers-rounded"  >
                <div style={{
                    width: '100%',
                    height: 'calc(100vh - 150px)',
                    backgroundColor: 'transparent',
                }} className="relative drop-shadow-[0px_0px_15px_rgba(0,0,0,0.7)] ">
                    <XIcon className='absolute -top-6 w-9 h-9 right-3 cursor-pointer z-50' onClick={() => ActivePop('')} />

                    <ModalUpdatenow visible={isUpdatenow} setVisible={setUpdatenow} />


                    <div className="w-full h-full">
                        <p className="mt-10 text-center text-[#fff] text-3xl font-extrabold animated bounceInLeftfaq">UPDATE</p>

                        <div className="flex justify-center items-center w-full pt-6">
                            <div className="w-1/2 wide:w-1/2 h-12 border-2 border-[#6bb8e7] flex justify-center items-center bg-[#253d4c] rounded-md cursor-pointer" onClick={() => setUpdatenow(true)}>
                                <p className="flex items-center text-center text-[#fff] text-lg font-bold " >Update now</p>
                            </div>
                        </div>

                        <div style={{
                            height: 'calc(100vh - 220px)'
                        }} className="setting-scroll w-full overflow-y-auto mt-4 space-y-6  pb-10 animated3 bounceInLeftfaq">


                            {updates.length > 0  && updates.map((update: any, index: number) => {
                                return (
                                    <div className="flex justify-center items-center my-10">
                                        <div className="w-full h-fit mx-12 bg-[#0c191c]] border border-black shadow-[0_0_15px_5px_rgba(0,0,0,0.7)]  ">
                                            <div className="flex justify-between mx-10 my-10">
                                                <p className="text-center text-[#fff] text-xl font-extrabold ">{update.title_en}</p>
                                                <p className="text-center text-[#b0b4b4] text-sm font-medium ">{moment(update.date).format('MM/DD/YYYY')}</p>
                                            </div>
                                            <div className="flex justify-center items-center ">
                                                <div className="w-full h-fit mx-10 mb-10 bg-[#151d20]] border border-[#0e171c] shadow-[0_0_10px_3px_rgba(0,0,0,0.3)] ">
                                                    <p className="mt-6 mx-10 text-[#fff] text-sm font-xs font-light ">{update.description_en}</p>
                                                    {/* <p className="mt-2 mx-10 text-[#fff] text-sm font-xs font-light ">standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                                    <p className="mt-6 mx-10 text-[#fff] text-sm font-medium ">Update Details</p>
                                                    <p className="mt-2 mx-10 text-[#fff] text-sm font-light ">-Fix bug lorem ipsum</p>
                                                    <p className="mt-2 mx-10 text-[#fff] text-sm font-light ">-Add lorem ipsum dummy text of the printing</p>
                                                    <p className="mt-2 mb-6 mx-10 text-[#fff] text-sm font-light ">-Adjust lorem ipsum dummy text</p> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            


                            {/* <div className="flex justify-center items-center my-10">
                                <div className="w-full h-fit mx-12 bg-[#10191d]] border border-black shadow-[0_0_15px_5px_rgba(0,0,0,0.7)]  ">
                                    <div className="flex justify-between mx-10 my-10">
                                        <p className="text-center text-[#fff] text-xl font-extrabold ">New Battlelab Update v.0.6</p>
                                        <p className="text-center text-[#b0b4b4] text-sm font-medium ">Fri, October 15,2021</p>
                                    </div>
                                    <div className="flex justify-center items-center ">
                                        <div className="w-full h-fit mx-10 mb-10 bg-[#171e20]] border border-black shadow-[0_0_10px_3px_rgba(0,0,0,0.3)] ">
                                            <p className="mt-6 mx-10 text-[#fff] text-sm font-medium ">Update Details</p>
                                            <p className="mt-2 mx-10 text-[#fff] text-sm font-light ">-Fix bug lorem ipsum</p>
                                            <p className="mt-2 mx-10 text-[#fff] text-sm font-light ">-Add lorem ipsum dummy text of the printing</p>
                                            <p className="mt-2 mx-10 text-[#fff] text-sm font-light ">-Adjust lorem ipsum dummy text</p>
                                            <p className="mt-2 mx-10 text-[#fff] text-sm font-light ">-Change lorem ipsum to new lorem ipsum</p>
                                            <p className="mt-2 mb-6 mx-10 text-[#fff] text-sm font-light ">-Player can now play lorem ipsum in this version</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className="flex justify-center items-center my-10">
                                <div className="w-full h-fit mx-12 bg-[#10191d]] border border-black shadow-[0_0_15px_5px_rgba(0,0,0,0.7)]  ">
                                    <div className="flex justify-between mx-10 my-10">
                                        <p className="text-center text-[#fff] text-xl font-extrabold ">New Battlelab Update v.0.6</p>
                                        <p className="text-center text-[#b0b4b4] text-sm font-medium ">Fri, October 15,2021</p>
                                    </div>
                                    <div className="flex justify-center items-center ">
                                        <div className="w-full h-fit mx-10 mb-10 bg-[#171e20]] border border-black shadow-[0_0_10px_3px_rgba(0,0,0,0.3)] ">
                                            <p className="mt-6 mx-10 text-[#fff] text-sm font-medium ">Update Details</p>
                                            <p className="mt-2 mx-10 text-[#fff] text-sm font-light ">-Fix bug lorem ipsum</p>
                                            <p className="mt-2 mx-10 text-[#fff] text-sm font-light ">-Add lorem ipsum dummy text of the printing</p>
                                            <p className="mt-2 mx-10 text-[#fff] text-sm font-light ">-Adjust lorem ipsum dummy text</p>
                                            <p className="mt-2 mx-10 text-[#fff] text-sm font-light ">-Change lorem ipsum to new lorem ipsum</p>
                                            <p className="mt-2 mb-6 mx-10 text-[#fff] text-sm font-light ">-Player can now play lorem ipsum in this version</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default Update;
