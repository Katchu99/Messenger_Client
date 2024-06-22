import { defineStore } from "pinia";
import axios from "axios";
import { Chat } from "../interfaces/Chat";
import { useRouter } from "vue-router";
import { useAuthStore } from "./authStore";

export const useChatStore = defineStore("chat", {
  state: () => ({
    chats: [],
    user: {
      id: localStorage.getItem("user.id") || null,
      name: localStorage.getItem("user.name") || null,
    },
    token: localStorage.getItem("token"),
  }),
  actions: {
    async get_chats(): Promise<any> {
      const router = useRouter();
      const authStore = useAuthStore();

      if (!authStore.isAuthenticated()) {
        router.push({ name: "Auth" });
        return;
      }

      try {
        if (!this.token || !this.user.id) {
          throw new Error("User ID or Token is null or undefined");
        }

        axios.defaults.baseURL = "http://localhost:6969";
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        axios.defaults.headers.common["Content-Type"] = "application/json";

        const response = await axios.get(`/chat/${this.user.id}`);

        const formattedChats = response.data.map((chat: Chat) => ({
          chat_id: chat.chat_id,
          chat_name: chat.chat_name,
        }));

        this.chats = formattedChats;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401) {
            // Token has expired
            console.error("Unauthorized: Invalid or expired token.");
            this.handleInvalidToken();
          } else if (error.response.status === 422) {
            console.error("Unprocessable Entity:", error.response.data);
            router.push({ name: "Auth" }); //Sorgt dafür das er hin und her springt.
          } else {
            console.error("Error fetching chats:", error.response.data);
          }
        } else {
          console.error("Error fetching chats:", error);
        }
        console.error("Error fetching chats:", error);

        //router.push({ name: "Auth" });
      }
    },

    handleInvalidToken() {
      localStorage.removeItem("token");
      this.token = null;
      alert("Your session expired. Please log-in.");

      const router = useRouter();
      router.push({ name: "Auth " });
    },
  },
});
