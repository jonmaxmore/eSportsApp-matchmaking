import io from "socket.io-client";
import config from "../config/app.config";

const apiURL:any = config.apiURL;
export const socket = io(apiURL);