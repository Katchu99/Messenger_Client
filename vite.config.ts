import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as dotenv from "dotenv"; // Importing as a CommonJS Module

// Load env variables
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  define: {
    "process.env.VUE_APP_API_URL": JSON.stringify(process.env.VUE_APP_API_URL),
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
});
