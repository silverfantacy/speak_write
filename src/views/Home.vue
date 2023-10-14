<template>
  <div class="flex flex-col justify-center items-center h-full">
    <h1 class="flex items-center text-5xl font-extrabold dark:text-white">SpeakWrite<span
        class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">aleph</span>
    </h1>
    <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-4">透過 OpenAI 技術，將語音轉換成文字，輕鬆擷取摘要</p>
  </div>

  <router-link :to="{ name: 'ASR' }"
    class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-center text-2xl block mt-5">
    語音AI對話<span
      class="bg-blue-100 text-blue-800 text-base font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">Delta</span>
  </router-link>
</template>

<script>
import router from '../router';

export default {
  setup() {
    // let mail ='213'
    // let password ='2134'
    // appwrite.account.createSession(email, password)
    //   .then(() => {
    //     // 認證成功
    //   })
    //   .catch((error) => {
    //     // 認證失敗
    //   });
  },
  components: { router }
}
</script>