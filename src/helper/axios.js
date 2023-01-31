import axios from "axios"
import { getToken } from "../Token";

export const setAuthorizationToken = async () => {
    axios.interceptors.request.use(
        config => 
        {
            config.headers['Authorization'] = `Bearer ${getToken()}`;
              return config;
          },
          error => {
              return Promise.reject(error);
          }
      );
}