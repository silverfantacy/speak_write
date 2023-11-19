<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useAuthStore } from "@/stores";
import { storeToRefs } from 'pinia';
import { useLogto } from '@logto/vue';
import cat from '@/assets/cat.png'
import authApi from '@/api/auth.js'

const { signIn, signOut, isAuthenticated } = useLogto();
const onClickSignIn = () => signIn(import.meta.env.VITE_APP_URL + '/callback');

const onClickSignOut = () => signOut(import.meta.env.VITE_APP_URL);

const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

onMounted(async () => {
    if (isAuthenticated.value) {
        await authStore.getUserInfo()
    }
})
const openai_key = ref(localStorage.getItem('openai_key') || '')

watch(openai_key, (val) => {
    localStorage.setItem('openai_key', val)
})

</script>

<template>
    <div class="flex flex-col">
        <template v-if="user">
            <img class="w-36 h-36 p-1 m-auto mb-4 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                :src="user.picture || cat" :alt="user.name">

            <form>

                <div class="mb-6">
                    <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OpenAI
                        key <span class="text-red-500 text-sm">只會被儲存在本機</span></label>
                    <input type="text" placeholder="sk-xxx" v-model="openai_key"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-300">如果沒有key請至<a
                            class="text-blue-600 hover:underline dark:text-blue-500"
                            href="https://platform.openai.com/account/api-keys" target="_blank">這裡</a>申請</p>
                </div>

                <div class="relative z-0 w-full mb-6 group">
                    <input v-model="user.name" type="text" name="floating_name" id="floating_name"
                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" " disabled />
                    <label for="floating_name"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">名稱</label>
                </div>
            </form>
            <button @click="onClickSignOut()"
                class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2 transition mt-4">登出</button>
        </template>

        <template v-else>
            <div class="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center p-5">
                <div class="max-w-lg mx-auto">
                    <h3 class="text-3xl font-bold dark:text-white text-center">登入後即可使用<br>SpeakWrite</h3>

                    <button @click="onClickSignIn()"
                        class="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 transition mt-4">
                        前往登入
                    </button>
                </div>

            </div>

        </template>
    </div>
</template>

