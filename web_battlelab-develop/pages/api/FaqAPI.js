import axios from "axios";
import { getToken } from "../../Token";
import config from "../../config/appconfig";


const FaqAPI = {
    fetchFaqs: async () => {
        var axiosConfig = {
            method: 'get',
            url: `${config.apiURL}/api/user/fetch-faqs`,
            headers: {
                // 'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };

        return await axios(axiosConfig);
    },

}

export default FaqAPI;