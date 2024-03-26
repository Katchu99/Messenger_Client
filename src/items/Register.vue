<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthState, useAuthStore, useRegisterStore } from '../store/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore(); // To check if already logged in to reroute
const authStateStore = useAuthState()
const registerStore = useRegisterStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const passwordConfirm = ref('');
var showPassword = ref(false)

if (authStore.isAuthenticated) {
    router.push({ name: 'Chat' });
}

const handleRegister = async () => {
    if (!username.value || !password.value || !passwordConfirm.value) {
        alert('Please enter both username and password')
    } else if (password.value != passwordConfirm.value) {
        alert('password and password confirmation don\'t match')
    }

    try {
        //Call register action in AuthStore
        registerStore.register(username.value, password.value).then(response=>{
            if (response.success){
                authStateStore.authState -= 1
            }
        }
        ).catch(error=>{
            console.error(error)
        })
    } catch (error) {
        console.error('Error during registration:', error)
    }
}
</script>

<template>
    <v-container class="text-center" @keyup.enter="handleRegister">
        <v-row justify="center">
            <v-col cols="12" md="12" sm="12">
                <v-text-field v-model="username" label="Username"></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
                <v-text-field v-model="password" label="Password" :type="password"></v-text-field>
            </v-col>

            <v-col cols="12" md="12" sm="12">
                <v-text-field 
                 v-model="passwordConfirm"
                 label="Confirm Password"
                 :append-icon="showPassword ? 'mdi-eye-inverted' : 'mdi-eye-off'"
                 :type="showPassword ? 'text' : 'password'"
                 @click:append="showPassword = !showPassword"
                 />
            </v-col>

            <v-col cols="12" md="12" sm="12">
                <v-btn label="Registrieren"></v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
</style>
