import axios from "axios";
const { serverurl, Url } = require("./ApiClient");
class UserService {
  Login(emailorName, password) {
    return axios.post(
      `${Url}/auth/login`,
      {
        emailorName: emailorName,
        password: password,
      },
      { withCredentials: true }
    );
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
}

export default new UserService();
