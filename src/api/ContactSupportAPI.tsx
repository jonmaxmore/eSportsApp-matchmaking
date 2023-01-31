import axios from "axios";
import config from "../config/app.config";
import { setAuthorizationToken } from "../helper/axios";

setAuthorizationToken();

const ContactSupportAPI = {
    createContactSupport: async (data:any) => {
        const resData: any = {
            method: 'post',
            url: `${config.apiURL}/api/user/create-contact-support`,
            data: data
        };
    
        return await axios(resData);
      },
}
export default ContactSupportAPI;