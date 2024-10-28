import axios from "axios";
import Cookie from "js-cookie";
const { serverurl, Url } = require("./ApiClient");
class UserService {
  async Login(emailorName, password) {
     const res = await axios.post(
      `${Url}/auth/login`,
      {
        emailorName: emailorName,
        password: password,
      },
      { withCredentials: true }
    );
    Cookie.set("token", res.data, {
      expires: 1 / 3, // 8 hours 
      secure: true,
      sameSite: "Strict",
    });
    return res
  }
  SignUp(name, email, password) {
    return axios.post(`${Url}/users/signup`, {
      name: name,
      email: email,
      password: password,
    });
  }
  async getUser() {
    let user = {};
    let errors = "";
   
    try {
      const res = await serverurl.get("/users/getme");
      user = res.data;
    } catch (err) {
      errors = err;
    }

    return { user, errors };
  }
  async getfriends() {
    let friends = [];
    let freindsfetchError = "";
    try {
      const res = await serverurl.get("users/getFriends");
      friends = res.data;
    } catch (error) {
      freindsfetchError = error.message;
    }
    return { friends, freindsfetchError };
  }
  async AvailableFriends(){
    let users = [];
    let usersfetchError = "";
    try {
      const res = await serverurl.get("users/getUsers");
      users = res.data;
    } catch (error) {
      usersfetchError = error.message;
    }
    return { users, usersfetchError };
  }
  async AddFriend(name){
  
    try {
      const res = await serverurl.put(`users/addFriend/${name}`)
    
      return res
    } catch (error) {
    
      return error
    }
  }
}

export default new UserService();
