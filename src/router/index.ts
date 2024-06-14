import { createWebHistory, createRouter } from "vue-router";
import Chat from "../components/Chat.vue";
import Auth from "../components/Auth.vue";
import { useAuthStore } from "../store/authStore";

const routes = [
  {
    path: "/",
    redirect: "/auth", //redirect from root to chat
  },
  {
    path: "/chat/:uuid",
    name: "Chat",
    component: Chat,
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Check for Token at start of App
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated();

  console.log("Navigating to:", to.name);
  console.log("Requires Auth:", to.meta.requiresAuth);
  console.log("User Authenticated:", isAuthenticated);

  // Check if targeted path needs auth
  if (to.meta.requiresAuth) {
    // Check if user is authenticated
    if (authStore.isAuthenticated()) {
      next(); // Allow access
    } else {
      next("/auth");
    }
  } else {
    next(); // Allow access for publice paths
  }
});

export default router;
