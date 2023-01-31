import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";

setAuthorizationToken();


const SocialAPI = {
    getPosts: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-public-posts`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    getPostComments: async (data: any, post_id: number) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-post-comments/${post_id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    postFeed: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/post`,
            data: data
        };

        return await axios(resData);
    },
    like: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/like`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    postComment: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/comment`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    
}

export default SocialAPI;