import { defineStore } from 'pinia';
import { bcrypt } from 'bcryptjs';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null,
    }),
    actions: {
        login(username, password) {
            const hashed_password = bcrypt.hashSync(password, 10);

            // Server auth
            
        }
    }
})