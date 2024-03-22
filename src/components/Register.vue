<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore, useRegisterStore } from '../store/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore(); // To check if already logged in to reroute
const registerStore = useRegisterStore();
const router = useRouter();

const username = ref('');
const password = ref('');

if (authStore.isAuthenticated){
    router.push({ name: 'Chat' });
}

const handleRegister = async () => {
    if (!username.value || !password.value) {
        alert('Please enter both username and password')
    }

    try{
        //Call register action in AuthStore
        const response: any = await useRegisterStore().register(username.value, password.value);
        if (response && response.success) {
            // Successfully registered so reroute to login
            router.push({ name: 'Login' });
        } else {
            console.error('Registration failed:', response && response.message);
        }
    } catch (error) {
        console.error('Error during registration:', error)
    }
}

const rerouteLogin = () => {
    router.push({ name: 'Login' })
}
</script>

<template>
    <div>
        <h1>Register</h1>
        <input type="text" v-model="username" placeholder="Username">
        <input type="password" v-model="password" placeholder="Password">
        <button type="button" @click="handleRegister">Register</button>
        <button type="button" @click="rerouteLogin">Back to Login</button>
    </div>
</template>