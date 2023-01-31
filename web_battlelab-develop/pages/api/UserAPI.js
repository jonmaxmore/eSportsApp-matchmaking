import axios from "axios";
import { getToken } from "../../Token";
import config from "../../config/appconfig";


const UserAPI = {
    getProfile: async () => {
        const token = getToken();
        var axiosConfig = {
            method: 'get',
            url: `${config.apiURL}/api/user/profile`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        return await axios(axiosConfig);
    },
    getUserDetail: async () => {
        const token = getToken();
        var axiosConfig = {
            method: 'get',
            url: `${config.apiURL}/api/user/details`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        return await axios(axiosConfig);
    },
    
}

export default UserAPI;