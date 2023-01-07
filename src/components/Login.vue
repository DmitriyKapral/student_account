<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Вход в личный кабинет</h1>
      <div class="form-floating">
        <input
          v-model="data.login"
          type="text"
          class="form-control"
          placeholder="name@example.com"
        />
        <label for="floatingInput">Логин</label>
      </div>
      <div class="form-floating">
        <input
          v-model="data.password"
          type="password"
          class="form-control"
          placeholder="Password"
        />
        <label for="floatingPassword">Пароль</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Войти
      </button>
    </form>
  </main>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
//import { response } from 'express';
export default {
  name: "Login",
  setup() {
    const data = reactive({
      login: "",
      password: "",
    });

    const router = useRouter();

    const submit = () => {
      axios
        .post("https://localhost:7263/Auth", {
          Login: data.login,
          password: data.password,
        })
        .then((response) => {
          if (response.data.access_token) {
            localStorage.setItem("student", JSON.stringify(response.data));
            router.push('/student/' + response.data.username);
          }
        })
        .catch(function () {
          alert("Неправильный логин и пароль");
        });
    };

    return {
      data,
      submit,
    };
  } /*,
        logout() {
            localStorage.removeItem('student');
        },*/,
};
</script>

<style>
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>