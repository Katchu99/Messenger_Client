<template>
    <div class="body">
        <div class="authContainer">
            <div class="header">
                LOGIN
            </div>
            <div>
                <v-container class="text-center">
                    <v-row justify="center">
                        <v-col cols="12" md="12" sm="12">
                            <v-text-field label="Username"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                            <v-text-field label="Password"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="12" sm="12">
                            <v-text-field label="Password"></v-text-field>
                        </v-col>

                    </v-row>
                </v-container>

            </div>

        </div>

    </div>
</template>

<style setup>
.body {
    background-color: rgba(14, 13, 13, 0.733);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
}

.authContainer {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f0f0f0;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(34, 34, 34, 0.719);
    background-color: rgb(32, 37, 37);
    width: 40%;
    height: 50vh;
    border-radius: 6px;

    .header {
        border-radius: 6px 6px 0px 0px;
        background-color: rgb(26, 25, 25);
        top: 0px;
        height: 4vh;
        width: 100%;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 20px;
        border-bottom: 1px solid rgba(128, 128, 128, 0.082);
    }
}
</style>
