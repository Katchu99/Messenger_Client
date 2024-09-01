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
  }),
  actions: {
    async login(
      username: string,
      password: string,
      remember_me: boolean
    ): Promise<any> {
      try {
        const response = await axios.post(
          "http://localhost:5000/login",
          {
            username: username,
            password,
            remember_me,
          },
          {
            withCredentials: true,
          }
        );
        const { success, message, user } = response.data;

        if (success) {
          this.isLoggedIn = true;
          this.user.id = user.id;
          this.user.name = user.name;

          // localStorage.setItem("token", access_token); // change this to cookie token use
          // localStorage.setItem("user.id", user.id);
          // localStorage.setItem("user.name", user.name);
        }

        return { success, message, user };
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
      this.isLoggedIn = false;
      this.user.name = null;
      this.user.id = null;

      localStorage.removeItem("token"); //remove
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
          .post("http://localhost:5000/register", {
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
