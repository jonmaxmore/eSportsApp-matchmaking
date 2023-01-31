import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";

setAuthorizationToken();


const UpdatesAPI = {
    getApplicationsAllUpdatesAPI: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-updates`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    }
}

export default UpdatesAPI;