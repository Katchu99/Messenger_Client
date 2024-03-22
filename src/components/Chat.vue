<script setup lang="ts">
import { ref, onMounted, CSSProperties } from 'vue';
import { io } from 'socket.io-client';

const props = defineProps({
    name: String
});

const messages = ref<Message[]>([]);
const newMessage = ref('');
let socket;

// Defines type of message
interface Message {
    id: Number;
    username: string;
    text: string;
}

const myUsername = ref('User');

// Connect to Socket.IO-Server
onMounted(() => {
    socket = io('http://localhost:6969');

    socket.on('message', (message: Message) => {
        messages.value.push(message);
    });
});

// Send message Function
const sendMessage = () => {
    if (newMessage.value.trim() === '') return;

    const message: Message = {
        id: Date.now(),
        username: myUsername.value,
        text: newMessage.value.trim()
    };

    socket.emit('message', message);
    newMessage.value='';
};

const getAlign = (message: Message): CSSProperties => {
    return (message.username == myUsername.value) ? { textAlign: "right"} : { textAlign: "left"};
}
</script>

<template>
    <div>
        <h1>MaWi</h1>
    <div class="message_wrapper">
        <div v-for="message in messages" :key="String(message.id)" :style="getAlign(message)">
        <strong>{{  message.username }}:</strong> {{ message.text }}
        </div>
    </div>
        <input type="text" v-model="newMessage" @keyup.enter="sendMessage">
    </div>
</template>

<style>
.message {
    padding: 3px;
}

.message_wrapper {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}
</style>