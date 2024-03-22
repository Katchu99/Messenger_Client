<template>
    <h1>Login:</h1>
    <label for="username_input">Username:</label>
    <input type="text" v-model="username_input">
    <label for="password_input">Password:</label>
    <input type="password" id="password_input">
    <button type="button" @click="login"></button>
</template>

<script lang="ts">
export default {
    data() {
        return {
            username_input: '',
            password_input: ''
        };
    },
    methods: {
        login() {
            
        }
    }
}
</script>

