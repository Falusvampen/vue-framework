<template>
  <div class="async-handler">
    <div v-if="loading" class="state-container">
      <div class="spinner"></div>
      <p>Laddar...</p>
    </div>

    <div v-else-if="error" class="state-container error">
      <p>⚠️ {{ error }}</p>
    </div>

    <div v-else-if="isEmpty" class="state-container empty">
      <div class="empty-icon">{{ emptyIcon }}</div>
      <h3>{{ emptyTitle }}</h3>
      <p v-if="emptyDescription">{{ emptyDescription }}</p>

      <div class="empty-actions" v-if="$slots.emptyAction">
        <slot name="emptyAction"></slot>
      </div>
    </div>

    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  name: 'AsyncHandler',
  props: {
    loading: { type: Boolean, default: false },
    error: { type: String, default: null },
    isEmpty: { type: Boolean, default: false },

    emptyTitle: {
      type: String,
      default: 'Ingenting här',
    },
    emptyDescription: {
      type: String,
      default: '',
    },
    emptyIcon: {
      type: String,
      default: '📂',
    },
  },
}
</script>

<style scoped>
.state-container {
  padding: 60px 20px;
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.error {
  color: #d9534f;
}

.empty-icon {
  font-size: 3.5rem;
  margin-bottom: 16px;
  display: block;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: #333;
}

p {
  color: #888;
  max-width: 400px;
  margin-bottom: 24px;
}
</style>
