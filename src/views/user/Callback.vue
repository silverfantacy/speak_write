<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
import { useHandleSignInCallback } from '@logto/vue';
const { isLoading } = useHandleSignInCallback(() => {
    // Navigate to root path when finished
    router.push({ name: 'Personal' });
});
</script>
<template>
</template>
