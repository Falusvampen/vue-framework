<script>
export default {
  name: 'IngredientComponent',
  props: {
    title: String,
    ingredients: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    amount() {
      return this.ingredients.length
    },
  },
}
</script>

<template>
  <div class="ingredienser-card">
    <div class="ingredienser-heading">
      <h2>{{ title }}</h2>
      <span class="antal">{{ amount }} st</span>
    </div>

    <ul class="ingredienser-list">
      <li v-for="(item, index) in ingredients" :key="index">
        {{ item.display || item }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.ingredienser-card {
  width: 23rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 0;
  border-radius: 16px;
  background-color: white; /* Bra att vara tydlig med bakgrund */
  box-shadow: 0 1px 14px rgba(0, 0, 0, 0.1);
}

.ingredienser-heading {
  padding: 1rem 2.5rem 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 1rem 2rem 2rem; /* Justerade 10rem till 2rem för snyggare layout */
  width: 100%;
  box-sizing: border-box; /* Ser till att padding inte spräcker bredden */
  margin: 0;
  list-style: none;
}

.ingredienser-list li {
  display: flex;
  align-items: flex-start;
  background: #f9f9f9; /* Lite kontrast mot kortet */
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 0.7rem;
  line-height: 1.4;
}
</style>
