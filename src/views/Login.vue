<template>
  <div class="flex flex-col">
    <h1 class="text-6xl font-bold mb-4">Login</h1>
    <p class="mt-4 mb-4">
          Not have an account ?
          <span class="cursor-pointer underline">
            <router-link :to="{ name: 'SignUp' }"> Sign Up </router-link>
          </span>
        </p>
    <form @submit.prevent="handleLogin">
      <div class="relative z-0 w-full mb-6 group">
        <input v-model="email" type="email" name="floating_email" id="floating_email"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " required />
        <label for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input v-model="password" type="password" name="floating_password" id="floating_password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " required />
        <label for="floating_password"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      </div>
      <button :disabled="!email || !password" type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Login
      </button>
    </form>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
    const store = useStore();

    const handleLogin = () => {
      console.log("Form submitted", email.value, password.value);
      store.dispatch("login", {
        email: email.value,
        password: password.value,
      });
    };

    return {
      email,
      password,
      handleLogin,
    };
  },
});
</script>