import axios from "axios";
import config from "../../config/appconfig";
import { signInWithPopup, GoogleAuthProvider ,FacebookAuthProvider} from 'firebase/auth'
import { authSocial } from '/config/firebase';

const googleAuth = new GoogleAuthProvider();
const facebookAuth = new FacebookAuthProvider();
 
const AuthAPI = {
    login: async (data) => {
        return await axios.post(`${config.apiURL}/api/user/login`, data);
    },
    signUp: async (data) => {
        return await axios.post(`${config.apiURL}/api/user/signup`, data)
    },
    signUp: async (data) => {
        var axiosConfig = {
            method: 'post',
            url: `${config.apiURL}/api/user/signup`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        return await axios(axiosConfig);
    },
    verifyOtp: async (data) => {
        return await axios.post(`${config.apiURL}/api/user/verify-otp`, data)
    },
    resendOtp: async (data) => {
        return await axios.post(`${config.apiURL}/api/user/resend-otp`, data);
    },
    forgotPassword: async (data) => {
        return await axios.post(`${config.apiURL}/api/user/forgot-password`, data);
    },
    socialG : async(data) => {
        const result =  await signInWithPopup(authSocial,googleAuth);
        return result;
    },
    socialF : async(data) => {
        const result =  await signInWithPopup(authSocial,facebookAuth);
        return result;
    }
}

export default AuthAPI;