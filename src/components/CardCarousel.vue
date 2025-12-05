<template>
  <div class="carousel-section">
    <div class="Text">
      <router-link :to="link" class="title-link">
        <h1>
          {{ title }}
          <span class="Textarrow"> > </span>
        </h1>
      </router-link>
    </div>

    <div class="carousel">
      <button @click="prevSlide" class="nav prev" :disabled="currentIndex === 0">‹</button>

      <div class="carousel-window" ref="window">
        <div
          class="carousel-track"
          ref="track"
          :style="{ transform: `translateX(-${currentIndex * (cardWidth + gap)}px)` }"
        >
          <RouterLink
            class="card"
            v-for="(card, index) in cards"
            :key="card.title + index"
            :to="`/recept/${card.id}/${card.slug}`"
          >
            <img :src="card.imageSrc" :alt="card.altText" />

            <div class="card-content">
              <h2>{{ card.title }}</h2>
              <p>{{ card.description }}</p>
            </div>

            <div class="card-footer">
              <span>{{ card.ingredients }} | {{ card.time }}</span>
              <span class="stars">{{ card.rating }}</span>
            </div>
          </RouterLink>
        </div>
      </div>

      <button @click="nextSlide" class="nav next" :disabled="isNextDisabled">›</button>
    </div>
  </div>
</template>

<script>
export default {
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
      cardWidth: 0,
      gap: 16,
      visibleCount: 3,
    }
  },
  computed: {
    isNextDisabled() {
      return this.currentIndex + this.visibleCount >= this.cards.length
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
    updateDimensions() {
      const width = window.innerWidth
      if (width < 800) {
        this.visibleCount = 1
      } else if (width < 1200) {
        this.visibleCount = 2
      } else {
        this.visibleCount = 3
      }

      // Mät kortet och justera fönstret
      const track = this.$refs.track
      const windowEl = this.$refs.window

      if (track && track.children.length > 0) {
        // Läs av bredden som CSS gett kortet
        this.cardWidth = track.children[0].offsetWidth

        // Formel: (Kortbredd * Antal) + (Gap * (Antal - 1))
        // Exempel: 3 kort och 2 mellanrum
        const gapTotal = Math.max(0, this.visibleCount - 1) * this.gap
        const exactWindowWidth = this.cardWidth * this.visibleCount + gapTotal

        // Sätt bredden på fönstret så det klipper exakt rätt
        windowEl.style.width = `${exactWindowWidth}px`
      }

      // 3. Återställ index om vi förminskar fönstret så vi inte hamnar utanför
      if (this.currentIndex + this.visibleCount > this.cards.length) {
        this.currentIndex = Math.max(0, this.cards.length - this.visibleCount)
      }
    },
  },
  mounted() {
    // Körs när komponenten laddas
    this.updateDimensions()
    // Lyssna på ändrad skärmstorlek
    window.addEventListener('resize', this.updateDimensions)
  },
  beforeUnmount() {
    // Städa upp
    window.removeEventListener('resize', this.updateDimensions)
  },
}
</script>

<style scoped>
.carousel-section {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  box-sizing: border-box;
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

.title-link {
  color: #dfdfdf;
}

.Textarrow {
  top: 0.2rem;
  left: 0.2rem;
  font-size: 2rem;
  font-family: sans-serif;
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
  padding: 10px 0;
  transition: width 0.3s ease;
}

.carousel-track {
  display: flex;
  gap: 1rem;
  transition: transform 0.5s ease;
}

.card {
  background: #d9d9d9;
  border-radius: 16px;
  width: 23rem;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  text-decoration: none;
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
  background: #b3b3b1;
  padding: 10px 16px;
  font-size: 13px;
  color: #555;
  border-top: 1px solid #eee;
}

.stars {
  color: #f5c04f;
  font-size: 1.6rem;
}

.nav {
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  color: white;
  padding: 0 10px;
  z-index: 10;
  min-width: 40px;
}

.nav:disabled {
  opacity: 0.3;
  cursor: default;
}

@media (max-width: 1200px) {
  .card {
    width: 20rem;
  }
}

@media (max-width: 800px) {
  .carousel-section {
    align-items: center;
  }

  .Text {
    margin-left: 0;
    text-align: center;
  }
}

@media (max-width: 500px) {
  .carousel-section {
    padding: 0;
  }

  .nav {
    font-size: 2rem;
    padding: 0 2px;
  }

  .carousel {
    gap: 0;
  }

  .card {
    width: calc(100vw - 90px);
  }

  .card img {
    height: 12rem;
  }
}
</style>
