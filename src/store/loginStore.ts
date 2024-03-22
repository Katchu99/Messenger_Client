import { defineStore } from 'pinia';
import { useSocketStore } from './socketStore';
import { bcrypt } from 'bcryptjs';

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null,
    }),
    actions: {
        async login(username, password) {
            const hashed_password = bcrypt.hashSync(password, 10);

            try {
                // Server auth
                const socketStore = useSocketStore();
                if (socketStore.socket) {
                    socketStore.socket.emit('login', {username: username, password: hashed_password})
                } else {
                    throw new Error('Socket connection not initialized');
                }
            } catch (error) {
                console.error('Error during login', error);
            }
        },
        handleLoginResponse(response: any) {
            if (response.success) {
                this.isAuthenticated = true;
                this.user = response.user;
            } else {
                console.error('Login failed:', response.message)
            }
        }
    }
})