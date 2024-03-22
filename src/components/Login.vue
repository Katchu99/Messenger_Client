<template>
    <h1>Login:</h1>
    <label for="username_input">Username:</label>
    <input type="text" v-model="username" placeholder="Username">
    <label for="password_input">Password:</label>
    <input type="password" v-model="password" placeholder="Password">
    <button type="button" @click="handleLogin"></button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/loginStore'
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');

if (authStore.isAuthenticated) {
    router.push({ name: 'Chat' });
}

const handleLogin = () => {
    if (!username.value || !password.value) {
        alert('Please enter both username and password');
    }

    // Call Loginaction in AuthStore
    useAuthStore().login(username.value, password.value)
}
</script>

