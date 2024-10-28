import axios from "axios";
import Cookie from "js-cookie";

const Url = "https://studenthubapi-production.up.railway.app";

const token = Cookie.get("token");

const serverurl = axios.create({
    baseURL: Url,
    headers: {
        "x-auth-token": token 
    },
    withCredentials: true
});


export { serverurl, Url };
