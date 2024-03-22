import { defineStore } from 'pinia';
import { io, Socket } from 'socket.io-client';

interface SocketState {
    socket: Socket | null;
}

export const useSocketStore = defineStore('socket', {
    state: (): SocketState => ({
        socket: null,
    }),
    actions: {
        initializeSocket() {
            this.socket  = io('http://localhost:6969');
            this.socket.on('connect', () => {
                console.log('Connected to server');
            });
            this.socket.on('disconnec', () => {
                console.log('Disconnected from server');
            });
        },
    },
});

