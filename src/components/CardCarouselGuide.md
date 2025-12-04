<template>
  <div class="carousel-section"> <!-- Wrapper för hela carousel-komponenten -->

    <div class="Text"> <!-- Titel-sektion -->
      <router-link :to="link" class="title-link"> <!-- Klickbar titel som leder till en annan sida -->
        <h1>
          {{ title }} <!-- Dynamisk titel från props -->
          <span class="Textarrow"> > </span> <!-- Pil bredvid titeln -->
        </h1>
      </router-link>
    </div>

    <div class="carousel"> <!-- Själva carousel-layouten -->
      <button @click="prevSlide" class="nav prev" :disabled="currentIndex === 0">‹</button>
      <!-- Knapp för att gå bakåt -->

      <div class="carousel-window"> <!-- Fönster som visar korten -->
        <div
          class="carousel-track"
          :style="{ transform: `translateX(-${currentIndex * (cardWidth + gap)}px)` }"
        >
          /* transform = CSS-egenskap som flyttar elementet horisontellt */
            /* translateX(-N px) betyder: flytta spåret N pixlar åt vänster */
            /* currentIndex = vilket kort som är först i vyn */
            /* cardWidth = bredd på ett kort (368px) */
            /* gap = mellanrum mellan korten (16px) */
            /* formeln currentIndex * (cardWidth + gap) räknar ut exakt hur långt spåret ska flyttas */

          <!-- Spåret flyttas i sidled beroende på currentIndex -->

          <RouterLink
            class="card"
            v-for="(card, index) in cards"
            :key="card.title + index"
            :to="`/recept/${card.id}/${card.slug}`"
          >
            <!-- v-for = loopar igenom arrayen 'cards' -->
            <!-- :key = unik nyckel, ex. 'Pasta0' -->
            <!-- :to = dynamisk länk till receptets sida -->

            <img :src="card.imageSrc" :alt="card.altText" /> <!-- Bild för receptet -->

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

      <button
        @click="nextSlide"
        class="nav next"
        :disabled="currentIndex + visibleCount >= cards.length"
      >
        ›
      </button>
      <!-- Knapp för att gå framåt -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String, // Titel för sektionen
    link: { type: String, required: true }, // Länk som titeln leder till
    cards: { type: Array, required: true }, // Array med alla receptkort
    visibleCount: { type: Number, default: 3 } // Antal kort som syns samtidigt
  },
  data() {
    return {
      currentIndex: 0, // Håller koll på vilket kort som visas först
      cardWidth: 368,  // Bredd på varje kort i pixlar
      gap: 16          // Mellanrum mellan korten i pixlar
    }
  },
  methods: {
    nextSlide() {
      // Flytta framåt om det finns fler kort kvar
      if (this.currentIndex + this.visibleCount < this.cards.length) {
        this.currentIndex++
      }
    },
    prevSlide() {
      // Flytta bakåt om vi inte är på första kortet
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    }
  }
}
</script>

<style scoped>
.carousel-section {
  width: calc(24rem * 3 + 2 * 1rem); /* Bredd för 3 kort */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Titel-länkens färg */
.title-link { color:#dfdfdf; }

/* Pil bredvid titeln */
.Textarrow { font-size:2rem; }

/* Styling för rubrik */
.Text {
  font-family: 'Holtwood One SC';
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  margin-left: 3rem;
}

/* Linje under titeln */
.Text h1::after {
  content: '';
  display: block;
  width: 22rem;
  height: 3.8px;
  background-color: #aaa8a8;
  margin-top: 0.4rem;
  border-radius: 2px;
}

/* Layout för knappar + fönster */
.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

/* Fönstret som visar korten */
.carousel-window {
  width: calc(23rem * 3 + 2 * 1rem);
  overflow: hidden; /* Döljer kort utanför fönstret */
}

/* Spåret som flyttas i sidled */
.carousel-track {
  display: flex;
  gap: 1rem;
  transition: transform 0.5s ease; /* Mjuk animation */
}

/* Varje receptkort */
.card {
  background: #d9d9d9;
  border-radius: 16px;
  width: 23rem;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.card:hover { transform: scale(1.04); } /* Hover-effekt */

/* Bild i kortet */
.card img {
  width: 100%;
  height: 17rem;
  border-radius: 2vh;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* Footer med ingredienser och betyg */
.card-footer {
  display: flex;
  justify-content: space-between;
  background: #b3b3b1;
  padding: 10px 16px;
  font-size: 13px;
}

.stars { color: #f5c04f; font-size: 1.6rem; } /* Gul färg för stjärnor */

/* Navigeringsknappar */
.nav {
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  color: white;
}

/* Responsivitet */
@media (max-width: 1200px) {
  .carousel-section { width: calc(24rem * 2 + 2 * 1rem); }
  .carousel-window { width: calc(23rem * 2 + 1rem); }
}

@media (max-width: 800px) {
  .carousel-section { width: calc(24rem * 1 + 2 * 1rem); }
  .carousel-window { width: calc(23rem * 1 + 1rem); }
}

@media (max-width: 500px) {
  .carousel-section { width: calc(24rem * 1 + 2 * 1rem); }
  .nav.prev { margin-right:0.2rem; }
  .nav.next { margin-left: 0.2rem; }
}
</style>