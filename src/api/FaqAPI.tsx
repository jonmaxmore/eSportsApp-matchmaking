import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";

setAuthorizationToken();

const FaqAPI = {
    fetchFaqs: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/fetch-faq-categories`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },

}

export default FaqAPI;