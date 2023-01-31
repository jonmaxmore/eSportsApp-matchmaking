import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";

setAuthorizationToken();

const NotificationsAPI  = {
    getAllNotifications: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/fetch-master-notifications`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return await axios(resData);
    },
    updateUserSetting: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/update-user-setting`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    getUserNotifications: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-user-notifications`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    clearIndividualNotificationAPI: async (id: any) => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/clear-individual-notification/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return await axios(resData);
    },
    clearNotifications: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/clear-notification`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return await axios(resData);
    },
}

export default NotificationsAPI ;