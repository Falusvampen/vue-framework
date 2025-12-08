<script>
export default {
  name: 'StepComponent',
  props: {
    title: String,
    steps: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<template>
  <div class="instructions-card">
    <div class="instructions-heading">
      <h2>{{ title }}</h2>
    </div>

    <div class="step" v-for="(step, index) in steps" :key="index">
      <div class="step-number">{{ index + 1 }}</div>
      <div class="step-text">{{ step }}</div>
    </div>
  </div>
</template>

<style scoped>
.instructions-card {
  border-radius: 16px;
  padding: 20px 24px;
  width: 40rem;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 1rem;
  box-shadow: 0 1px 26px rgba(0, 0, 0, 0.1);
}

.instructions-heading {
  margin-bottom: 0.5rem;
}

.instructions-heading h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.step {
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 12px;
  padding: 10px 10px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.step-number {
  background-color: #f1d0a1;
  color: #333;
  font-weight: bold;
  border-radius: 50%;
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 15px;
  font-size: 0.9rem;
}

.step-text {
  flex: 1;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
  margin-top: 2px;
}
</style>
