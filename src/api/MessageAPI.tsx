import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";

setAuthorizationToken();

const MessageAPI = {
    fetchMessage: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-messages`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    sendMessage: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/send-message`,
            data: data
        };

        return await axios(resData);
    },
    fetchMessageFriendList: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-message-friend-list`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    fetchSearchMessageFriendList: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-search-message-friend-list`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    sendInvitation: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/send-invitation`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    fetchUnReadMessagesAPI: async () => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-unread-messages`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },
}

export default MessageAPI;