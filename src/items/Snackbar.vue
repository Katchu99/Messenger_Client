<script>
export default {
    data() {
        return {
            snackbar: false,
            message: '',
            timeout: 6000,
            color: '',
        };
    },
    methods: {
        showSnackbar(message, color = 'success') {
            this.message = message;
            this.color = color;
            this.snackbar = true;
        },
    },
};
</script>

<template>
    <v-snackbar v-model="snackbar" :time="timeout" :color="color">
        <template #action="{ attrs}">
            <v-btn color="#f0f0f0" text v-bind="attrs" @click="snackbar = false">
                close
            </v-btn>
        </template>
    </v-snackbar>
</template>


<style>
</style>