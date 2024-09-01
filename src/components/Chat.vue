<script setup lang="ts">
import { ref, onMounted, CSSProperties, computed } from "vue";
import { io } from "socket.io-client";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import { useChatStore } from "../store/chatStore";
import { Chat } from "../interfaces/Chat";

const authStore = useAuthStore();
const chatStore = useChatStore();
const router = useRouter();

const messages = ref<Message[]>([]);
const newMessage = ref("");
let socket;
const myUsername = ref("User");
const placeholderImgSrc = ref("https://placehold.co/40");

// Defines type of message
interface Message {
  id: Number;
  username: string;
  text: string;
}

const formattedChats = computed(() =>
  chatStore.chats.map((chat: Chat) => ({
    chat_id: chat.chat_id,
    chat_name: chat.chat_name,
  }))
);

// Connect to Socket.IO-Server
// Makes socketStore obsolete???
onMounted(async () => {
  // Check if authenticated
  if (!authStore.isAuthenticated) {
    router.push({ name: "Auth" });
    return;
  }

  if (!chatStore.user.id) {
    console.error("User ID is not available.");
    router.push({ name: "Auth" });
    return;
  }

  await chatStore.get_chats();
  // const chats = ref(chatStore.chats)
  // socket = io("http://localhost:6969");
  // socket.on("message", (message: Message) => {
  //   messages.value.push(message);
  // });
});

// Select Chat Function
const selectChat = (chat_id: String) => {
  // router.push({ name: "Chat", params: { uuid: chat_id } });
};

// Send message Function
const sendMessage = () => {
  if (newMessage.value.trim() === "") return;

  const message: Message = {
    id: Date.now(),
    username: myUsername.value,
    text: newMessage.value.trim(),
  };

  socket.emit("message", message);
  newMessage.value = "";
};

const getAlign = (message: Message): CSSProperties => {
  return message.username == myUsername.value
    ? { textAlign: "right" }
    : { textAlign: "left" };
};

// Logout Function
const logout = () => {
  var logout_success = authStore.logout();
  if (logout_success) {
    router.push({ name: "Auth" });
  }
};
</script>

<template>
  <div class="chatbody">
    <v-container fluid style="padding: 0px">
      <v-row no-gutters>
        <!-- Overview -->
        <v-col cols="3" class="sidebar">
          <v-list dense class="sub-sidebar">
            <v-list-item
              v-for="(chat, index) in formattedChats"
              :key="index"
              @click="selectChat(chat.chat_id)"
              class="chat-item"
              :prepend-avatar="placeholderImgSrc"
            >
              <v-list-item-content class="chats">
                <v-list-item-title>{{ chat.chat_name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <!-- Chat -->
        <v-col cols="11" class="chat-window">
          <div class="message_wrapper">
            <div
              v-for="message in messages"
              :key="String(message.id)"
              :style="getAlign(message)"
            >
              <strong>{{ message.username }}:</strong> {{ message.text }}
            </div>
          </div>
          <input type="text" v-model="newMessage" @keyup.enter="sendMessage" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style>
.chatbody {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  padding: 0px;
  background-color: #f0f0f0; /* Hintergrundfarbe */
}

.sidebar {
  background-color: #1b1b1d; /* Hintergrundfarbe der Sidebar */
  height: 100vh;
  .sub-sidebar {
    background-color: #1b1b1d;
  }
}

.chat-window {
  background-color: #121214; /* Hintergrundfarbe des Chat-Fensters */
}

.logout_button {
  background-color: black; /* Hintergrundfarbe des Logout-Buttons */
  color: white; /* Textfarbe des Logout-Buttons */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.chats {
  color: white; /* Textfarbe der Chat-Nachrichten */
}

.rounded-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.no-margin {
  margin: 0;
}

.icon-item {
  background-color: #1b1b1d;
  justify-content: center;
  width: 100%;
}
</style>
