<script lang="ts" setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router';
import { TRUE } from 'sass';

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');
var remember_me = ref(false)
var showPassword = ref(false);

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
                authStore.isAuthenticated = true
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

<template>
    <v-container class="text-center login-container" @keyup.enter="handleLogin">
        <v-row justify="center">
            <v-col cols="12" md="12" sm="12">
                <v-text-field v-model="username" label="Username" class="input-field"/>
            </v-col>

            <v-col cols="12" md="12" sm="12" class="password-col">
                <v-text-field
                    v-model="password"
                    label="Password"
                    class="input-field"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                />
                <div class="login_checkbox">
                <input type="checkbox" v-model="remember_me" />
                <label for="checkbox"> Remember me </label>
                </div>
            </v-col>

            <v-col cols="12" md="12" sm="12">
                <v-btn dark color="#E5C847" @click="handleLogin" class="submit-button">Login</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 0 auto;
}

.input-field {
    width: 100%;
}

.login_checkbox {
    text-align:left;
    color: rgb(109, 108, 108);
}

.submit-button {
    width: 100%;
}

/* Overwrite default checkbox style */
input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
}

input[type="checkbox"]::before {
    content: "";
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 2px solid #ccc;
    border-radius: 5px;
    background-color: #706e6e;
    transition: background-color 0.3s, border-color 0.3s;
}


input[type="checkbox"]:hover::before {
    background-color: #e2cf7b; 
}


input[type="checkbox"]:checked::before {
    background-color: #E5C847;
    border-color: #E5C847; 
}
</style>