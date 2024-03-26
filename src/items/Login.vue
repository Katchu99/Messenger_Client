<template>
    <v-container class="text-center" @keyup.enter="handleLogin">
        <v-row justify="center">
            <v-col cols="12" md="6" sm="6">
                <v-text-field v-model="username" label="Username"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
                <v-text-field v-model="password" label="Password"></v-text-field>
            </v-col>

        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');

if (authStore.isAuthenticated){
    router.push({ name: 'Chat' });
}

const handleLogin = async () => {
    if (!username.value || !password.value){
        alert('Please enter both username and password')
    }

    try {
        // Call login function in authStore
        authStore.login(username.value, password.value).then(response =>{
            if (response.success){
                router.push({ name: 'Chat' });
            } else {
                console.error(response.message)
            }
        }).catch(error => {
            console.error(error)
        })
    } catch (error) {
        console.error('Error during login:', error)
    }
}

</script>