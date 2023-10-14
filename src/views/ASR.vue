<template>
  <div class="h-[calc(100svh_-_10rem)] flex flex-col items-center justify-around">

    <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span
        class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">語音AI對話</span>
    </h1>

    <p class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-center text-2xl">
      Delta AI Lab
    </p>
    <p class="text-center my-4">
      <template v-if="!recognizedText">
        {{ recognitionStatus }}
      </template>
      <template v-else>
        {{ recognizedText }}
      </template>
    </p>


    <div
      class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 overflow-y-auto"
      ref="messagesContainer">
      <ol class="relative border-l border-gray-200 dark:border-gray-700">
        <template v-for="(message, index) in states.messages" :key="index">
          <li class="mb-10 ml-6">
            <span
              class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-1 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <img class="rounded-full shadow-lg"
                :src="message.role === 'user' ? 'https://appwrite.laplusda.com/v1/storage/buckets/63627f86bf876df4c52d/files/63aedd04734c5eb32548/view?project=63627a13515df7361c16&mode=admin' : 'https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png'"
                :alt="message.role" />
            </span>
            <div
              class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
              <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{{ message.created }}</time>
              <div class="text-sm font-normal text-gray-500 dark:text-gray-300">
                {{ message.role }}：<br>
                {{ message.content }}
              </div>
            </div>
          </li>
        </template>
      </ol>
    </div>


    <div class="w-fit mx-auto mt-auto">
      <button v-if="recognitionStatus === '識別已開始'" @click="stopRecognition"
        class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
        <svg class="w-5 h-5 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 16 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
        </svg>
        停止語音辨識
      </button>
      <button v-else @click="startRecognition"
        class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
        <svg class="w-5 h-5 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="currentColor" viewBox="0 0 16 19">
          <path
            d="M15 5a1 1 0 0 0-1 1v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a1 1 0 0 0-2 0v3a6.006 6.006 0 0 0 6 6h1v2H5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9v-2h1a6.006 6.006 0 0 0 6-6V6a1 1 0 0 0-1-1Z" />
          <path d="M9 0H7a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3Z" />
        </svg>
        開始語音辨識
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance, watch } from 'vue'
const apiKey = import.meta.env.VITE_VUE_APP_OPENAI_API_KEY;

export default {
  setup() {
    const proxy = getCurrentInstance().proxy

    // 對話紀錄 內需欄位 role, content, time
    // const messages = ref([])
    const states = reactive({
      messages: []
    })

    // 監聽對話紀錄，當有新的對話紀錄時，滾動到最底部
    watch(states.messages, (newValue, oldValue) => {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    })

    // AI 對話
    async function AITalk() {
      console.log('AITalk 開始')

      const previousMessages = JSON.parse(JSON.stringify(states.messages));

      const formatMessages = [
        { role: "system", content: '#zh-tw As a system, my role is to provide direct and concise answers in a contextual and conversational style. My responses should be casual and avoid opposition, warning, or summarization. I should not provide abstract or detailed explanations or trace the origins of a question.' },
        ...previousMessages,
      ];

      // 將對話紀錄轉換成 OpenAI API 所需的格式
      // 刪除 created 欄位
      formatMessages.forEach((message) => {
        delete message.created;
      });

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: formatMessages,
          temperature: 0.9,
          max_tokens: 256 * 1,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0.6,
        })

      };
      console.log('options', options)
      // 使用 OpenAI API 進行文字生成
      return fetch('https://api.openai.com/v1/chat/completions', options)
        .then(res => res.json())
        .then(body => {
          console.log('body', body)
          if (body.error) {
            throw body.error;
          }
          // 將 OpenAI API 回傳的結果加入對話紀錄
          states.messages.push({
            role: 'assistant',
            content: body.choices[0].message.content.trim(),
            created: proxy.$filters.datetime()
          })
        });
    }


    // 語音辨識
    const recognition = webkitSpeechRecognition ? new webkitSpeechRecognition() : null;
    const recognitionStatus = ref('識別未開始');
    const recognizedText = ref('');

    const messagesContainer = ref(null);

    if (recognition) {
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        recognitionStatus.value = '識別已開始';
      };

      recognition.onend = () => {
        recognitionStatus.value = '識別已結束';

        // 語音辨識結束後，將辨識結果加入對話紀錄
        states.messages.push({
          role: "user",
          content: recognizedText.value,
          created: proxy.$filters.datetime()
        })

        // 清空辨識結果
        recognizedText.value = '';

        AITalk();
      };

      recognition.onresult = (event) => {
        const recognized = event.results[event.results.length - 1][0].transcript;
        recognizedText.value = recognized;
      };
    } else {
      recognitionStatus.value = '不支援識別';
    }

    const startRecognition = () => {
      if (recognition) {
        recognition.start();
      }
    };

    const stopRecognition = () => {
      if (recognition) {
        recognition.stop();
      }
    };

    const scrollToBottom = () => {
      console.log('scrollToBottom')
      const container = messagesContainer.value;
      if (container) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth', // Smooth scrolling
        });
      }
    };

    return {
      states,
      messagesContainer,

      startRecognition,
      stopRecognition,
      recognitionStatus,
      recognizedText,


      // messages,
    }
  },
}
</script>