<script>
export default {
  name: 'ingredienserComponent',
  props: {
    title: String,
    ingredients: Array,
  },
  computed: {
    Antal() {
      return this.ingredients.length;
    }
  }
}
</script>

<template>
  <div class="ingredienser-card">
    <div class="ingredienser-heading">
      <h2>{{ title }}</h2>
      <span class="antal">{{ Antal }} st</span>
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
  padding: 1rem 5.5rem 0.3rem;
  display: flex;
  justify-content: space-between;
}

.ingredienser-heading h2 {
  margin-bottom: 2%;
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
}

.antal {
  display: flex;
  font-size: 1.3rem;
  color: black;
}

.ingredienser-list {
  padding: 1rem 2rem 10rem;
  width: 70%;
  margin: auto;
  border-radius: 8px;
  margin-bottom: 2%;
  list-style: none;
  height: 100%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.ingredienser-list li {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #fff;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  border-radius: 12px;
  padding: 9px 10px;
  margin-bottom:0.7rem;
}
</style>

<script></script>
