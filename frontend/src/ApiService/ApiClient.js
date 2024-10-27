import axios from "axios";
import Cookie from "js-cookie";

const Url = "http://studenthubapi-production.up.railway.app";

const token = Cookie.get("token");

const serverurl = axios.create({
    baseURL: Url,
    headers: {
        "x-auth-token": token // Assuming you meant "x-auth-token"
    }
});

// Exporting using ES Modules syntax
export { serverurl, Url };
