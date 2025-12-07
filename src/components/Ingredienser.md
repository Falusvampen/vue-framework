<script>
// Här definieras själva komponenten
export default {
  name: 'ingredienserComponent',   // Namnet på komponenten (bra för debugging/import)

  // Props = data som skickas in från en förälder
  props: {
    title: String,                 // Rubrik (t.ex. "Ingredienser")
    ingredients: Array,            // En lista med ingredienser
  },

  // Computed = beräknade värden som uppdateras automatiskt
  computed: {
    Antal() {                      // Räknar antal ingredienser i listan
      return this.ingredients.length;
    }
  }
}
</script>

<template>
  <!-- Yttre kort-container -->
  <div class="ingredienser-card">
    <!-- Rubrik + antal -->
    <div class="ingredienser-heading">
      <h2>{{ title }}</h2>                <!-- Visar rubriken -->
      <span class="antal">{{ Antal }} st</span> <!-- Visar antal ingredienser -->
    </div>

    <!-- Lista med ingredienser -->
    <ul class="ingredienser-list">
      <!-- Loopar igenom varje ingrediens -->
      <li v-for="(item, index) in ingredients" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Kortets grundstil */
.ingredienser-card {
  width: 23rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: 0;
  border-radius: 16px;
  box-shadow: 0 1px 14px rgba(0, 0, 0, 0.1);
}

/* Rubrik + antal */
.ingredienser-heading {
  padding: 1rem 2.5rem 0.3rem;
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

/* Lista med ingredienser */
.ingredienser-list {
  padding: 1rem 2rem 10rem;
  width: 70%;
  margin: auto;
  border-radius: 8px;
  margin-bottom: 2%;
  list-style: none;
  height: 100%;
  width: 100%;
}

/* Varje ingrediens */
.ingredienser-list li {
  display: flex;
  align-items: flex-start;
  background: #fff;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  border-radius: 12px;
  padding: 9px 10px;
  margin-bottom: 0.7rem;
}
</style>