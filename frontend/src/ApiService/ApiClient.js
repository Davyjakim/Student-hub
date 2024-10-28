import axios from "axios";
import Cookie from "js-cookie";

const Url = "https://studenthub-api-j65y.onrender.com";

const token = Cookie.get("token");

const serverurl = axios.create({
    baseURL: Url,
    headers: {
        "x-auth-token": token 
    }
});


export { serverurl, Url };
