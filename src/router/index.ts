import { createWebHistory, createRouter } from "vue-router";
import Chat from "../components/Chat.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Auth from "../components/Auth.vue"

const routes = [
    {
        path: "/",
        redirect: "/auth" //redirect from root to chat
    },
    {
        path: "/chat",
        name: "Chat",
        component: Chat
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/auth",
        name: "Auth",
        component: Auth
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;