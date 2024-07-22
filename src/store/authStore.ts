import { defineStore } from "pinia";
import axios from "axios";
import https from "https";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: {
      id: localStorage.getItem("user.id") || null,
      name: localStorage.getItem("user.name") || null,
    },
    token: localStorage.getItem("token"),
  }),
  actions: {
    async login(
      username: string,
      password: string,
      remember_me: boolean
    ): Promise<any> {
      try {
        const response = await axios.post("http://localhost:6969/login", {
          username: username,
          password,
          remember_me,
        });
        const { success, message, access_token, user } = response.data;

        if (success) {
          this.token = access_token;
          this.isLoggedIn = true;
          this.user.id = user.id;
          this.user.name = user.name;

          localStorage.setItem("token", access_token);
          localStorage.setItem("user.id", user.id);
          localStorage.setItem("user.name", user.name);
        }

        return { success, message, access_token, user };
      } catch (error) {
        return { success: false, message: error.message };
      }

      //   return new Promise((resolve, reject) => {
      //     axios
      //       .post("http://localhost:6969/login", {
      //         username: username,
      //         password: password,
      //       })
      //       .then((response) => {
      //         resolve(response.data);
      //       })
      //       .catch((error) => {
      //         reject({ success: false, message: error });
      //       });
      //   });
    },

    logout() {
      this.token = null;
      this.isLoggedIn = false;
      this.user.name = null;
      this.user.id = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user.name");
      localStorage.removeItem("user.id");

      var logout_success = true;
      return logout_success;
    },

    isAuthenticated(): boolean {
      return !!localStorage.getItem("token");
    },

    setUser(user) {
      this.user.id = user.id;
      this.user.name = user.name;
    },
  },
});

export const useRegisterStore = defineStore("register", {
  state: () => ({
    user: "",
    password: "",
  }),
  actions: {
    async register(username, password): Promise<any> {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:6969/register", {
            username: username,
            password: password,
          })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject({ success: false, message: error });
          });
      });
    },
  },
});

export var useAuthState = defineStore("authState", {
  state: () => ({
    authState: 0,
  }),
});
