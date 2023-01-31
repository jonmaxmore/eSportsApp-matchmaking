import axios from "axios";
import { getToken } from "../../Token";
import config from "../../config/appconfig";


const ContactSupportAPI = {
    createContactSupport: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.apiURL}/api/user/create-record-contact-support`,
            headers: {
                // 'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(axiosConfig);
    },

}

export default ContactSupportAPI;