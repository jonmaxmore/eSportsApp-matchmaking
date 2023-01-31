// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import config from "../../config/appconfig";

const WebApi = {
    getUserGameMatchCount: async () => {
        var axiosConfig  = {
            method: 'post',
            url: `${config.apiURL}/api/user/fetch-user-game-match-count`,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        return await axios(axiosConfig);
    },
    saveDownloadCountAPI: async (data) => {
        var axiosConfig  = {
            method: 'post',
            url: `${config.apiURL}/api/common/saveDownloadCount`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return await axios(axiosConfig);
    },
    getLatestExecutableAPI: async () => {
        var axiosConfig  = {
            method: 'get',
            url: `${config.apiURL}/api/common/getLatestFile`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return await axios(axiosConfig);
    },
}

export default WebApi;