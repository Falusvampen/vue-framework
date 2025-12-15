<!-- 100% AI lol -->
<script>
import { errorState } from '@/services/ErrorState'

export default {
  name: 'GlobalErrorNotification',
  computed: {
    isVisible() {
      return errorState.visible
    },
    message() {
      return errorState.message
    },
  },
  methods: {
    close() {
      errorState.dismiss()
    },
  },
}
</script>

<template>
  <transition name="fade">
    <div v-if="isVisible" class="global-error-toast" role="alert">
      <div class="content">
        <span class="icon">⚠️</span>
        <p>{{ message }}</p>
      </div>
      <button @click="close" class="close-btn" aria-label="Stäng">✕</button>
    </div>
  </transition>
</template>

<style scoped>
.global-error-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  background-color: #8b0000;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 300px;
  max-width: 90vw;
  border-left: 5px solid #ff4444;
}

.content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
}

.content p {
  margin: 0;
  font-weight: 500;
  font-size: 1rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.8;
  padding: 0 5px;
}

.close-btn:hover {
  opacity: 1;
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
