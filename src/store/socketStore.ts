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
        initializeSocket(): void {
            try {
                // Muss SSL Cert Überprüfung ausschalten da self-signed
                this.socket  = io('https://localhost:6969', {
                    rejectUnauthorized: false //Funktioniert nicht obwohl es die Überprüfung ausschalten sollte?!
                });
                this.socket.on('connect', () => {
                    console.log('Connected to server');
                });
                this.socket.on('disconnect', () => {
                    console.log('Disconnected from server');
                });
            } catch (error) {
                console.error('Error initializing socket:', error);
            }
        },
    },
});