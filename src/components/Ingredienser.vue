<script>
export default {
  name: 'ingredienserComponent',
  props: {
    title: String,
    Antal: String,
    ingredients: Array,
  },
}
</script>

<template>
  <div class="ingredienser-card">
    <div class="ingredienser-heading">
      <h2>{{ title }}</h2>
      <span class="antal">{{ Antal }}</span>
    </div>

    <ul class="ingredienser-list">
      <li v-for="(item, index) in ingredients" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.ingredienser-card {
  width: 30rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 0;
  border-radius: 16px;
}

.ingredienser-heading {
  padding: 16px 27px 5px;
  display: flex;
  justify-content: space-between;
}

.ingredienser-heading h2 {
  margin-bottom: 3%;
  font-size: 1.5rem;
  color: black;
}

.antal {
  font-size: 1.3rem;
  color: black;
  align-self: center;
}

.ingredienser-list {
  padding: 1rem 2rem 10rem;
  width: 90%;
  margin: auto;
  border-radius: 8px;
  margin-bottom: 2%;
  list-style: none;
  height: 100%;
}

.ingredienser-list li {
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 12px;
  padding: 10px 10px;

  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}
</style>

<script></script>
