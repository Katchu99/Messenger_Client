import { defineStore } from "pinia";
import axios from "axios";
import { Chat } from "../interfaces/Chat";

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
      try {
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
        console.error("Error fetching chats:", error);
      }
    },
  },
});
