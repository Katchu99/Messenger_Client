<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="8">
        <v-card class="elevation-5" color="primary" dark>
          <v-card-title class="text-center">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field v-model="username" label="Username" outlined dark></v-text-field>
              <v-text-field v-model="password" label="Password" type="password" outlined dark></v-text-field>
              <v-btn type="submit" color="primary" block>Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
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