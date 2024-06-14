<script lang="ts" setup>
import Login from "../items/Login.vue";
import Register from "../items/Register.vue";
import Snackbar from "../items/Snackbar.vue";
import { ref, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import { useAuthState } from "../store/authStore";

var authState = ref(useAuthState().authState);

const incState = () => {
  authState.value += 1;
};

const decState = () => {
  authState.value -= 1;
};

const snackbarRef = ref<typeof Snackbar | null>(null);

// const onShowSnackbar = ({message, color}: { message: string, color: string}) => {
//     if (snackbarRef.value) {
//         snackbarRef.value.showSnackbar(message, color);
//     }
// }

function onShowSnackbar(message: String, color: String) {
  if (snackbarRef.value) {
    snackbarRef.value.showSnackbar(message, color);
  }
}
</script>

<template>
  <div class="body">
    <div class="authContainer">
      <div class="header" v-if="authState == 0">LOGIN</div>
      <div class="header" v-if="authState == 1">REGISTER</div>
      <div>
        <div v-if="authState == 0">
          <Login />
        </div>
        <div v-if="authState == 1">
          <Register @showSnackbar="onShowSnackbar" />
        </div>
      </div>
      <div v-if="authState == 0" @click="incState" style="color: #ccc">
        Registrieren?
      </div>
      <div v-if="authState == 1" @click="decState" style="color: #ccc">
        Bereits einen Account?
      </div>
    </div>
    <Snackbar ref="snackbarRef" />
  </div>
</template>

<style>
.body {
  background-image: url("src/assets/background-login.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

::-webkit-scrollbar {
  display: none;
}

.authContainer {
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(34, 34, 34, 0.719);
  background-color: rgb(32, 37, 37);
  padding: 20px;
  display: inline-block;
  text-align: center;
  min-width: 300px;
  position: absolute;
  width: 350px;

  .header {
    border-radius: 6px 6px 0px 0px;
    background-color: rgb(32, 37, 37);
    padding: 10px;
    font-weight: bold;
    color: white;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .content {
    margin-bottom: 10px;
  }

  .input_field {
    width: 100%;
    box-sizing: border-box;
  }

  .toggle {
    color: #00f;
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
