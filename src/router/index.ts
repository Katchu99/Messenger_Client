import { createWebHistory, createRouter } from "vue-router";
import Chat from "../components/Chat.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

const routes = [
    {
        path: "/",
        redirect: "/login" //redirect from root to chat
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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;