<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore, useGlobalStore } from "@/stores";
import Navbar from "@/components/Navbar.vue";
import Loading from '@/components/Loading.vue';

const globalStore = useGlobalStore();
</script>

<template>
    <Loading />

    <router-view></router-view>

    <Navbar />
</template>

<style scoped>
</style>
