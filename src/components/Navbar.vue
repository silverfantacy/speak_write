<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';
// const router = useRouter()

const userinfo = reactive({})
onMounted(async () => {
})
</script>

<template>
    <div class="px-5 fixed z-50 w-full -translate-x-1/2  bottom-4 left-1/2">
        <div
            class="h-16 mx-auto max-w-lg rounded-full bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div class="grid h-full max-w-lg grid-cols-5 mx-auto">
                <router-link :to="{ name: 'Home' }" data-tooltip-target="tooltip-home" type="button"
                    class="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path
                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z">
                        </path>
                    </svg>
                    <span class="sr-only">首頁</span>
                </router-link>
                <div id="tooltip-home" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    首頁
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>

                <router-link :to="{ name: 'ASR' }" data-tooltip-target="tooltip-wallet" type="button"
                    class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 19">
                        <path
                            d="M15 5a1 1 0 0 0-1 1v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a1 1 0 0 0-2 0v3a6.006 6.006 0 0 0 6 6h1v2H5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9v-2h1a6.006 6.006 0 0 0 6-6V6a1 1 0 0 0-1-1Z" />
                        <path d="M9 0H7a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3Z" />
                    </svg>
                    <span class="sr-only">語音對話</span>
                </router-link>
                <div id="tooltip-wallet" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    語音對話
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>

                <div class="flex items-center justify-center">
                    <router-link :to="{ name: 'Upload' }" data-tooltip-target="tooltip-new" type="button"
                        class="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z">
                            </path>
                        </svg>
                        <span class="sr-only">上傳語音</span>
                    </router-link>
                </div>
                <div id="tooltip-new" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    上傳語音
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>

                <router-link :to="{ name: 'Privacy' }" data-tooltip-target="tooltip-settings" type="button"
                    class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span class="sr-only">隱私政策</span>
                </router-link>
                <div id="tooltip-settings" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    隱私政策
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>


                <router-link :to="{ name: 'Personal' }" data-tooltip-target="tooltip-profile" type="button"
                    class="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <svg class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clip-rule="evenodd" fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z">
                        </path>
                    </svg>
                    <span class="sr-only">使用者</span>
                </router-link>
                <div id="tooltip-profile" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    使用者
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
        </div>
    </div>
</template>
