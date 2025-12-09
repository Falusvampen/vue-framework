<template>
  <div class="carousel-section">
    <div class="Text">
      <RouterLink :to="link" class="title-link">
        <h1>
          {{ title }}
          <span class="Textarrow"> > </span>
        </h1>
      </RouterLink>
    </div>

    <div class="carousel">
      <button @click="prevSlide" class="nav prev" :disabled="currentIndex === 0">‹</button>

      <div class="carousel-window">
        <div class="carousel-track" :style="trackStyle">
          <RouterLink
            class="card-wrapper"
            v-for="(card, index) in cards"
            :key="card.id || index"
            :to="`/recept/${card.id}/${card.slug}`"
          >
            <article class="card">
              <img :src="card.imageSrc" :alt="card.altText" />

              <div class="card-content">
                <h2>{{ card.title }}</h2>
                <p>{{ card.description }}</p>
              </div>

              <div class="card-footer">
                <span>{{ card.ingredients }} | {{ card.time }}</span>
                <span class="stars">{{ card.rating }}</span>
              </div>
            </article>
          </RouterLink>
        </div>
      </div>

      <button @click="nextSlide" class="nav next" :disabled="isNextDisabled">›</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardCarousel',
  props: {
    title: String,
    link: {
      type: String,
      required: true,
    },
    cards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      visibleCount: 3, // Standardvärde
    }
  },
  computed: {
    // Räknar ut om vi nått slutet
    isNextDisabled() {
      return this.currentIndex >= this.cards.length - this.visibleCount
    },
    // CSS-transform baserat på procent
    trackStyle() {
      // Om vi visar 3 kort, är varje "steg" 33.333% brett
      const step = 100 / this.visibleCount
      return {
        transform: `translateX(-${this.currentIndex * step}%)`,
      }
    },
  },
  methods: {
    nextSlide() {
      if (!this.isNextDisabled) {
        this.currentIndex++
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    // Uppdaterar visibleCount för att knapparna ska funka rätt
    handleResize() {
      const width = window.innerWidth
      if (width < 800) {
        this.visibleCount = 1
      } else if (width < 1200) {
        this.visibleCount = 2
      } else {
        this.visibleCount = 3
      }
    },
  },

  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>

<style scoped>
.carousel-section {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto 3rem auto;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  box-sizing: border-box;
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  width: 100%;
  position: relative;
}

.Text {
  font-family: 'Holtwood One SC', serif;
  letter-spacing: 0.06em;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  margin-left: 3.5rem;
}

.title-link {
  color: #dfdfdf;
  text-decoration: none;
}

.Textarrow {
  top: 0.2rem;
  left: 0.2rem;
  font-size: 2rem;
  font-family: sans-serif;
}

.Text h1::after {
  content: '';
  display: block;
  width: 100%;
  max-width: 22rem;
  height: 3.8px;
  background-color: #aaa8a8;
  margin-top: 0.4rem;
  border-radius: 2px;
}

.carousel-window {
  overflow: hidden;
  width: 100%;
  padding: 10px 0;
}

.carousel-track {
  display: flex;
  width: 100%;
  transition: transform 0.5s ease;
}

.card-wrapper {
  flex-shrink: 0;
  flex-grow: 0;
  text-decoration: none;
  box-sizing: border-box;

  /* Standard (Desktop): 3 kort = 33.333% bredd */
  flex-basis: 33.3333%;
  /* 8px padding på varje sida ger 16px "gap" totalt mellan korten */
  padding: 0 8px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
}

.card img {
  width: 100%;
  height: 17rem;
  display: block;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.card-content {
  padding: 16px 20px 20px;
  flex-grow: 1;
}

.card h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #222;
}

.card p {
  margin-top: 5%;
  color: #444;
  font-size: 14px;
  line-height: 1.5;
  max-height: 4rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff9e6;
  padding: 10px 16px;
  font-size: 13px;
  color: #555;
  border-top: 1px solid #eee;
}

.stars {
  color: #f5c04f;
  font-size: 1.6rem;
}

/* --- Navigation Knappar --- */
.nav {
  background: none;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  color: white;
  padding: 0 10px;
  z-index: 10;
  user-select: none;
  transition: opacity 0.2s;
}

.nav:disabled {
  opacity: 0.2;
  cursor: default;
}

.nav:hover:not(:disabled) {
  opacity: 0.8;
}

/* Tablet / Liten Desktop (< 1200px) */
@media (max-width: 1200px) {
  .card-wrapper {
    flex-basis: 50%; /* 2 kort synliga */
  }

  .Text {
    margin-left: 0;
    text-align: center;
  }

  .Text h1::after {
    margin: 0.4rem auto;
  }
}

/* Mobil (< 800px) */
@media (max-width: 800px) {
  .card-wrapper {
    flex-basis: 100%; /* 1 kort synligt */
  }

  .nav {
    font-size: 2.5rem;
    padding: 0 5px;
  }

  .card img {
    height: 14rem;
  }
}
</style>
