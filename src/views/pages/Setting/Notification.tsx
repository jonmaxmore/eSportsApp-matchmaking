import React, { useEffect, useState } from "react";
import "./styles.css";
import 'antd/dist/antd.css';
import { Switch } from 'antd';
import NotificationsAPI from "@api/NotificationsAPI";

interface Props {
    ActivePop: (value: any) => void
}

const Setting = ({ ActivePop }: Props) => {
    const [notifications, setNotifications] = useState([]);
    const [accountNotifications, setAccountNotifications] = useState([]);
    const [validationMessage, setValidationMessage] = useState();

    useEffect(() => { 
        getAllNotifications();
    }, []);

    const getAllNotifications = () => {
        NotificationsAPI.getAllNotifications()
        .then(res => {
            if(res.data.success) {
                setNotifications(res.data.notifications);
                setAccountNotifications(res.data.accountNotifications);
            } else {
                setNotifications([]);
                setAccountNotifications([]);
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const updateUserSetting = (isChecked : any, notificationId : any) => {
        const data = {
            master_notification_id : notificationId,
            status : isChecked
        }
        NotificationsAPI.updateUserSetting(data)
        .then((res) => {
            if (res.data.success) {
                setValidationMessage(res.data.message);
            }
            else {
                setValidationMessage(res.data.message);
            }
        })
        .catch(function (error) {
            console.log("error ", error);
        });
    }

    return (
        <div className="w-full h-full">
            <div className="w-full py-6 border-l-4 border-[#94bd4b] flex items-center justify-items-center text-center
                bg-gradient-to-r from-[#11323f] to-[#0d212a]">
                <p className="pl-6 text-[#fff] text-base font-semibold">NOTIFICATION SETTINGS</p>
            </div>
            <div className="px-12">
                {notifications.map( (notification : any) => ( 
                    <div className="flex justify-between border-b-2 border-[#333a3c] py-4">
                        <div>
                            <p className=" mt-6 text-[#fff] text-base font-semibold">{notification.notification_name}</p>
                            <p className=" mt-3 text-[#fff] text-base font-extralight">{notification.notification_desc}</p>
                        </div>
                        <div className="flex items-start justify-center mt-6  check">
                            <Switch className="bg-[#989898]"
                                defaultChecked={(notification.UserNotification && notification.UserNotification.notification_status === 1) ? true : false}
                                onChange={(event: any) => {  
                                    updateUserSetting(event,notification.id); 
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full mt-12 py-6 border-l-4 border-[#94bd4b] flex items-center justify-items-center text-center
                bg-gradient-to-r from-[#11323f] to-[#0d212a]">
                <p className="ml-6 text-[#fff] text-base font-semibold">ACCOUNT SETTINGS</p>
            </div>
            <div className = "px-12">
                {accountNotifications.map( (notification : any) => ( 
                    <div className="flex justify-between  py-4">
                        <div>
                            <p className="mt-6 text-[#fff] text-base font-semibold">{notification.notification_name}</p>
                            <p className="mt-3 text-[#fff] text-base font-extralight">{notification.notification_desc}</p>
                        </div>
                        <div className="flex items-start justify-center mt-6  check">
                            <Switch className="bg-[#989898]"
                                defaultChecked={(notification.UserNotification && notification.UserNotification.notification_status === 1) ? true : false}
                                onChange={(event: any) => {  
                                    updateUserSetting(event,notification.id); 
                                }} 
                            />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};
export default Setting;