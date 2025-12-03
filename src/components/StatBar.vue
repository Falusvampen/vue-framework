<template>
  <div class="stat-bar">
    <template v-for="(item, index) in items" :key="index">
      <div class="stat-item">
        <span class="label">{{ item.label }}</span>
        <span class="value">
          <slot name="icon" :item="item"></slot>
          {{ item.value }}
        </span>
      </div>
      <div v-if="index < items.length - 1" class="separator"></div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'StatBar',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.stat-bar {
  background: white;
  width: 100%;
  max-width: 900px;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #888;
  margin-bottom: 6px;
  font-weight: 700;
}

.value {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.separator {
  width: 1px;
  height: 40px;
  background-color: #eee;
}

@media (max-width: 600px) {
  .stat-bar {
    flex-direction: column;
    gap: 16px;
  }
  .separator {
    width: 80%;
    height: 1px;
  }
}
</style>
