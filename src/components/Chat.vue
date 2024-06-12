<script setup lang="ts">
import { ref, onMounted, CSSProperties } from "vue";
import { io } from "socket.io-client";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const chats = ref([
  { avatar: "https://placehold.co/40" },
  { avatar: "https://placehold.co/40" },
  { avatar: "https://placehold.co/40" },
  { avatar: "https://placehold.co/40" },
]);

// Check if authenticated
if (!authStore.isAuthenticated) {
  router.push({ name: "Auth" });
}

const props = defineProps({
  name: String,
});

const messages = ref<Message[]>([]);
const newMessage = ref("");
let socket;

// Defines type of message
interface Message {
  id: Number;
  username: string;
  text: string;
}

const myUsername = ref("User");

// Connect to Socket.IO-Server
// Makes socketStore obsolete???
onMounted(() => {
  socket = io("http://localhost:6969");

  socket.on("message", (message: Message) => {
    messages.value.push(message);
  });
});

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
</script>

<template>
  <!-- <div>
        <h1>MaWi</h1>
    <div class="message_wrapper">
        <div v-for="message in messages" :key="String(message.id)" :style="getAlign(message)">
        <strong>{{  message.username }}:</strong> {{ message.text }}
        </div>
    </div>
        <input type="text" v-model="newMessage" @keyup.enter="sendMessage">
    </div> -->
  <div class="chatbody">
    <v-container fluid style="padding: 0px">
      <v-row no-gutters>
        <!-- Overview -->
        <v-col cols="1" class="sidebar">
          <v-list dense class="sub-sidebar">
            <v-list-item
              v-for="(chat, index) in chats"
              :key="index"
              class="icon-item>"
            >
              <div class="d-flex align-center justify-center">
                <v-img
                  :src="chat.avatar"
                  class="rounded-image no-margin"
                ></v-img>
              </div>
            </v-list-item>
          </v-list>
        </v-col>
        <!-- Chat -->
        <v-col cols="11" class="chat-window"> </v-col>
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
}
.sidebar {
  background-color: #1b1b1d;
  height: 100vh;
  .sub-sidebar {
    background-color: #1b1b1d;
  }
}
.rounded-image {
  border-radius: 50%;
}
.no-margin {
  margin: 0;
}
.icon-item {
  background-color: #1b1b1d;
  justify-content: center;
  width: 100%;
}
.chat-window {
  background-color: #121214;
}
</style>
