import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";

setAuthorizationToken();

const CustomGameAPI = {
    createCustomGameRoomAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/createCustomRoom`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getCreatedCustomRoomByMatchIDAPI: async (id: any) => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/getCustomMatch/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },
    getCustomCreatedRoomListAPI: async (id: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/getCustomMatchList`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },
    joinCustomRoomAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/joinCustomRoom`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    leaveCustomRoomAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/leaveCustomRoom`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    readyToCustomRoomGameAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/readyCustomRoomGame`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    updateBetAmountAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/updateCustomRoomBetAmount`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
}

export default CustomGameAPI;