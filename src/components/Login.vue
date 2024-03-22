<template>
    <h1>Login:</h1>
    <label for="username_input">Username:</label>
    <input type="text" v-model="username">
    <label for="password_input">Password:</label>
    <input type="password" v-model="password">
    <button type="button" @click="login"></button>
</template>

<script lang="ts">
import { ref, PropType } from 'vue';
import { Socket } from 'socket.io-client';
import bcrypt from 'bcryptjs';

interface Props {
    socket: Socket;
}

export default {
    props: {
        socket: {
            type: Object as PropType<Props ['socket']>,
            required: true,
        },
    },
    setup(props) {
        const username = ref('');
        const password = ref('');

        const login = () => {
            const hashedPassword = bcrypt.hashSync(password.value, 10);

            props.socket.emit('login', { username: username.value, password: hashedPassword });
        };
    
        return {
            username,
            password,
            login,
        };
    },
};
</script>

