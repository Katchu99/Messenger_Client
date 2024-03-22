<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore, useRegisterStore } from '../store/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore(); // To check if already logged in to reroute
const registerStore = useRegisterStore();
const router = useRouter();

const username = ref('');
const password = ref('');

if (authStore.isAuthenticated) {
    router.push({ name: 'Chat' });
}

const handleRegister = async () => {
    if (!username.value || !password.value) {
        alert('Please enter both username and password')
    }

    try {
        //Call register action in AuthStore
        useRegisterStore().register(username.value, password.value).then(response=>{
            console.log(JSON.stringify(response))
        }
        ).catch(error=>{
            console.log(error)
        })

            
        

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