<script setup>
import { useGlobalStore } from '@/stores'; // 請根據你的實際路徑更改

const globalStore = useGlobalStore();
</script>

<template>
    <div v-if="globalStore.isLoading"
        class="fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur flex justify-center items-center">
        <div class="loader"></div>
    </div>
</template>

<style scoped>
.loader {
    width: fit-content;
    font-weight: bold;
    font-family: monospace;
    font-size: 30px;
    line-height: 1.5;
    background: linear-gradient(90deg, rgb(55 65 81 / var(--tw-bg-opacity)) 50%, #0000 0) right/200% 100%;
    animation: l21 1s infinite linear;
}

.loader::before {
    content: "Loading...";
    color: #0000;
    padding: 0 5px;
    background: inherit;
    background-image: linear-gradient(90deg, #fff 50%, rgb(55 65 81 / var(--tw-bg-opacity)) 0);
    -webkit-background-clip: text;
    background-clip: text;
}

@keyframes l21 {
    100% {
        background-position: left
    }
}
</style>
