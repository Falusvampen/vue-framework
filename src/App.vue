<script setup>
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import GlobalErrorNotification from './components/GlobalErrorNotification.vue'
</script>

<template>
  <GlobalErrorNotification />
  <HeaderComponent />
  <RouterView />
</template>
