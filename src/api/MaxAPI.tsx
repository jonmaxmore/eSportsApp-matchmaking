import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";

setAuthorizationToken();
const MaxAPI = {
    getProfile: async () => {

        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/apiplaygame`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },Test_w: async () => {

        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/create-wallet-account`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    }, getRakingList: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/test3`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    }, apiTest: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/apiplaygame`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    }, chackPlayLive: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/livetoplay_csgo`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    }, tEstapi: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/testmax`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    }
    , chack_Serveronplay: async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/req_serverall`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    }
    , update_Serveronplay: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/update_server`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },   
    cHackidplay:async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/cHackidplay`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },  
    Testch:async () => {
        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/Testch`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    }, 
     getgamenew: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/getgamenew`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    }, TestApidota: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/createdota2`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    TestApidota1: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/dota2maxtest`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    }, chackLoginStram: async () => {

        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/chackLoginStram`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    },
    chackPlay: async () => {

        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/chackplay`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    }
    , LoginStram: async () => {

        const resData: any = {
            method: 'get',
            url: `${config.apiURL}/api/user/LoginStram`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return await axios(resData);
    }, CreatApiplay: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/creatApiplay`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    }
    , UptApiplay: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/UptApiplay`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },chackplaycsgo: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/chackplaycsgo`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    },
    linkGame: async (data: any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/link-game`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(resData);
    }
}
export default MaxAPI;