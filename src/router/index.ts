import { createWebHistory, createRouter } from "vue-router";
import Chat from "../components/Chat.vue";
//import About from "../components/About.vue";

const routes = [
    {
        path: "/",
        redirect: "/chat" //redirect from root to chat
    },
    {
        path: "/chat",
        name: "chat",
        component: Chat
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;