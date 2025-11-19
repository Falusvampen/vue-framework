<script>
export default {
  props: {
    title: String,
    steps: Array 
  }
}
</script>

<template>
  <div class="görsåhär-card">
    <div class="görsåhär-heading">
      <h2>{{ title }}</h2>
    </div>

    <div
      class="step"
      v-for="(step, index) in steps"
      :key="index"
    >
      <div class="step-number">{{ step.number }}</div>
      <div class="step-text">{{ step.tutorial }}</div>
    </div>
  </div>
</template>



<style scoped>
.görsåhär-card {
  background-color: #fff8f0; 
  border-radius: 16px;
  padding: 20px 24px;
  width: 40rem;
  height: 30rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}


.görsåhär-heading {
  margin-bottom: 0.5rem;
}

.görsåhär-heading h2 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.step {
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 12px;
  padding: 10px 14px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}



.step-number {
  background-color: #f1d0a1;
  color: #333;
  font-weight: bold;
  border-radius: 50%;
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 10px;
}

.step-text {
  flex: 1;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.5;
}
</style>
