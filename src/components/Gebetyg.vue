<template>
  <div class="Gebetyg">
    <h2>{{ title }}</h2>

    <div class="stars">
      <span
        v-for="n in 5"
        :key="n"
        class="star"
        :class="{ active: n <= rating }"
        @click="setRating(n)"
      >
        ★
      </span>
    </div>

    <p v-if="rating > 0" class="thanks">Du gav {{ rating }} stjärna{{ rating > 1 ? 'r' : '' }}!</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Betygsätt receptet"
    }
  },
  data() {
    return {
      rating: 0
    };
  },
  methods: {
    setRating(value) {
      this.rating = value;
    }
  }
};
</script>

<style scoped>
.Gebetyg {
  border-radius: 12px;
  margin-top: 5rem;
  margin-left: 5%;
  padding: 2rem;
  width: fit-content;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  text-align: center;
  transition: transform 0.2s ease;
}

.Gebetyg:hover {
  transform: translateY(-2px);
}

h2 {
  font-family: "Poppins", sans-serif;
  font-size: 1.8rem;
  font-weight:400;
  color: black;
  margin-bottom: 1rem;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
}

.star {
  font-size: 2.5rem;
  cursor: pointer;
  color: #ddd;
  transition: color 0.2s, transform 0.15s;
}

.star:hover {
  transform: scale(1.2);
  color: #ffd700;
}

.star.active {
  color: #ffc107;
}

.thanks {
  font-size: 0.95rem;
  color: #666;
  margin-top: 1rem;
  transition: opacity 0.3s ease;
}
</style>
