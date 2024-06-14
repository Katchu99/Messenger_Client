<script lang="ts" setup>
import { ref } from "vue";
import {
  useAuthState,
  useAuthStore,
  useRegisterStore,
} from "../store/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore(); // To check if already logged in to reroute
const authStateStore = useAuthState();
const registerStore = useRegisterStore();
const router = useRouter();
const emits = defineEmits<{
  (e: "showSnackbar", message: String, color: String);
}>();

const username = ref("");
const password = ref("");
const passwordConfirm = ref("");
var showPassword = ref(false);
var showPasswordConfirm = ref(false);

if (authStore.isAuthenticated()) {
  router.push({ name: "Chat", params: { uuid: authStore.user.id } });
}

const handleRegister = async () => {
  try {
    if (!username.value || !password.value || !passwordConfirm.value) {
      alert("Please enter both username and password");
      return;
    } else if (password.value != passwordConfirm.value) {
      alert("password and password confirmation don't match");
      return;
    }

    //Call register action in AuthStore
    const response = await registerStore.register(
      username.value,
      password.value
    );

    console.log(response);

    if (response.success) {
      authStateStore.authState -= 1;
      emits("showSnackbar", response.message, "success");
    } else {
      console.error("Registration failed:", response.message);
      emits("showSnackbar", response.message, "error");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    emits("showSnackbar", "An error occured during registration", "error");
  }
};
</script>

<template>
  <v-container
    class="text-center register-container"
    @keyup.enter="handleRegister"
  >
    <v-row justify="center">
      <!-- USERNAME INPUT -->
      <v-col cols="12" md="12" sm="12">
        <v-text-field
          v-model="username"
          label="Username"
          class="input-field"
        ></v-text-field>
      </v-col>

      <!-- PASSWORD INPUT -->
      <v-col cols="12" md="12" sm="12">
        <v-text-field
          v-model="password"
          label="Password"
          class="input-field"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append-inner="showPassword = !showPassword"
        />
      </v-col>

      <!-- PASSWORD CONFIRMATION INPUT -->
      <v-col cols="12" md="12" sm="12">
        <v-text-field
          v-model="passwordConfirm"
          label="Confirm Password"
          class="input-field"
          :append-inner-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPasswordConfirm ? 'text' : 'password'"
          @click:append-inner="showPasswordConfirm = !showPasswordConfirm"
        />
      </v-col>

      <!-- SUBMIT BUTTON -->
      <v-col cols="12" md="12" sm="12">
        <v-btn
          dark
          color="#E5C847"
          @click="handleRegister"
          class="submit-button"
          >Register</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.register-container {
  max-width: 400px;
  margin: 0 auto;
}

.input-field {
  width: 100%;
  color: #e0ded1;
}

.submit-button {
  width: 100%;
}
</style>
