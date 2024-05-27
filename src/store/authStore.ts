import { defineStore } from 'pinia';
import axios from 'axios';
import https from 'https';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null,
    }),
    actions: {
        async login(username, password): Promise<any> {
            return new Promise((resolve,reject) => {
                axios.post("http://localhost:6969/login", {'username': username, 'password': password}).then(response => {
                    resolve(response.data);
                }).catch(error =>{
                    reject({ success: false, message: error})
                })
            })
        }
    }
})

export const useRegisterStore = defineStore('register', {
    state: () => ({
        user: '',
        password: ''
    }),
    actions: {
        async register(username, password): Promise<any> {
            return new Promise((resolve,reject)=>{
            axios.post("http://localhost:6969/register", { "username": username, "password": password }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject({ success: false, message: error })
            })
            })
        },
    }
})

export var useAuthState = defineStore('authState', {
    state: () => ({
        authState: 0
    })
})