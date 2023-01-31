import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";

setAuthorizationToken();

const NewAndEventsAPI = {
    getNewsAndEvents: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-news-events`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(resData);
    },
    getNewsAndEventBanners: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/fetch-news-event-banners`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return await axios(resData);
    },
}

export default NewAndEventsAPI;