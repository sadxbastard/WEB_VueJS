<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Главная</router-link></li>
        <li><router-link to="/user">Профиль</router-link></li>
        <li><router-link to="/types_of_activity">Виды активностей</router-link></li>
        <li><router-link to="/activities">Активности</router-link></li>
      </ul>
      <div v-if="isAuthenticated && user">
        Привет, {{ user.name }}
        <button @click="logout">Выйти</button>
      </div>
      <div v-else>
        <form @submit.prevent="login">
          <div>
            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" required/>
          </div>
          <div>
            <label for="password">Password:</label>
            <input v-model="password" type="password" id="password" required/>
          </div>
          <button type="submit">Войти</button>
          <p v-if="authError" class="error">{{ authError }}</p>
        </form>
      </div>
    </nav>
  </header>
  <router-view></router-view>
</template>

<script>
import { useAuthStore } from "@/stores/authStore.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      authStore: useAuthStore(),
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
    authError() {
      return this.authStore.errorMessage;
    },
  },
  methods: {
    logout() {
      this.authStore.logout();
    },
    login() {
      this.authStore.login({email: this.email, password: this.password});
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
