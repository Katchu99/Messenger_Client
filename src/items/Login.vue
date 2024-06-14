<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const remember_me = ref(false);
var showPassword = ref(false);

watchEffect(() => {
  if (authStore.isAuthenticated() && authStore.user.id) {
    router.push({ name: "Chat", params: { uuid: authStore.user.id } });
  }
});

const handleLogin = async () => {
  if (!username.value || !password.value) {
    alert("Please enter both username and password");
    return;
  }

  try {
    const response = await authStore.login(
      username.value,
      password.value,
      remember_me.value
    );

    if (response.success) {
      console.info(`response.success: ${response.success}`);
      router.push({ name: "Chat", params: { uuid: response.user_id } });
    } else {
      console.error(response.message);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};

</script>

<template>
  <v-container class="text-center login-container" @keyup.enter="handleLogin">
    <v-row justify="center">
      <v-col cols="12" md="12" sm="12">
        <v-text-field v-model="username" label="Username" class="input-field" />
      </v-col>

      <v-col cols="12" md="12" sm="12" class="password-col">
        <v-text-field
          v-model="password"
          label="Password"
          class="input-field"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append-inner="showPassword = !showPassword"
        />
        <div class="login_checkbox">
          <input type="checkbox" v-model="remember_me" />
          <label for="checkbox"> Remember me </label>
        </div>
      </v-col>

      <v-col cols="12" md="12" sm="12">
        <v-btn dark color="#E5C847" @click="handleLogin" class="submit-button"
          >Login</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
}

.input-field {
  width: 100%;
  color: #e0ded1;
}

.login_checkbox {
  text-align: left;
  /*color: rgb(109, 108, 108);*/
  color: #e0ded1;
}

.submit-button {
  width: 100%;
}

/* Overwrite default checkbox style */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type="checkbox"]::before {
  content: "";
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid #dfd7b3;
  border-radius: 5px;
  background-color: #e0ded1;
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

input[type="checkbox"]:hover::before {
  background-color: #ddd097;
}

input[type="checkbox"]:checked::before {
  background-color: #e9c62d;
  border-color: #ceae21;
}
</style>
