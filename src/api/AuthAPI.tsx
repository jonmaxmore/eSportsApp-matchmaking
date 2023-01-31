import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";

setAuthorizationToken();

const AuthAPI = {
    login: async (data: any) => {
        return await axios.post(`${config.apiURL}/api/user/login`, data);
    },
    loginkeep: async (data: any) => {
        return await axios.post(`${config.apiURL}/api/user/loginkeep`, data);
    },
    signUp: async (data: any) => {
        return await axios.post(`${config.apiURL}/api/user/signup`, data)
    },
    verifyOtp: async (data: any) => {
        return await axios.post(`${config.apiURL}/api/user/verify-otp`, data)
    },
    resendOtp: async (data: any) => {
        return await axios.post(`${config.apiURL}/api/user/resend-otp`, data);
    },
    forgotPassword: async (data: any) => {
        return await axios.post(`${config.apiURL}/api/user/forgot-password`, data);
    },
    logout: async () => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/logout`,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        return await axios(resData);
    } 
}

export default AuthAPI;