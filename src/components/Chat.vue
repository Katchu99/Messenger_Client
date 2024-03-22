<template>
    <div>
        <h1>MaWi</h1>
        <div v-for="message in messages" :key="message.id">
        <strong>{{  message.username }}:</strong> {{ message.text }}
        </div>
        <input type="text" v-model="newMessage" @keyup.enter="sendMessage">
    </div>
</template>

<script lang="ts">
import io from 'socket.io-client';

export default {
    data () {
        return {
            messages: [],
            newMessage: '',
            socket: null
        };
    },
    mounted() {
        // Connect to WebSocket
        this.socket = io('https://localhost:6969'),
        this.socket.on('message', message => {
            this.messages.push(message);
        });
    },
    methods: {
        sendMessage () {
            // Send newMessage to Server
            this.socket.emit('message', {
                username: 'User', //Example Entry
                text: this.newMessage
            });
            this.newMessage=''; //Emptying input Field
        }
    }

};
</script>