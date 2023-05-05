<script setup>
import { computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import Navbar from "./components/Navbar.vue";

const store = useStore()

const account = computed(() => store.getters.getAccount)
const error = computed(() => store.getters.getError)
const router = useRouter();

watch(account, (newValue, oldValue) => {
  console.log("In Watch getAccount in App.vue")
  if (newValue === null) {
    router.replace('/')
  } else {
    let redirect = router.currentRoute.value.query.redirect || { name: 'Todos' };
    router.replace(redirect);
  }
})

onMounted(() => {
  if (!account.value) {
    store.dispatch('fetchAccount')
  }
})
</script>

<template>
  <!-- <transition name="fade"> -->
  <!-- <Alert v-if="error.show" :message="error.message" :color="error.color" /> -->

  <router-view></router-view>
  <!-- </transition> -->
  <Navbar />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  background-color: #fff;
  opacity: 0;
}
</style>
