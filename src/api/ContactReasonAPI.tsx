import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";

setAuthorizationToken();

const ContactReasonAPI = {
    fetchContactReason: async () => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-contact-reasons`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    },

}

export default ContactReasonAPI;