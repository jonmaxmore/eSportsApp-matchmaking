import axios from "axios";
import { getToken } from "../../Token";
import config from "../../config/appconfig";


const ContactReasonAPI = {
    fetchContactReason: async (data) => {
        var axiosConfig = {
            method: 'get',
            url: `${config.apiURL}/api/user/get-contact-reasons`,
            headers: {
                // 'Authorization': `Bearer ${getToken}`,
                'Content-Type': 'application/json'
            },
        };

        return await axios(axiosConfig);
    },

}

export default ContactReasonAPI;


