<template>
  <div class="carousel-section"> <!-- Wrapper för hela karusellen -->

    <div class="Text"> <!-- Titel-sektion -->
      <router-link :to="link" class="title-link"> <!-- Klickbar titel, använder prop 'link' -->
        <h1>
          {{ title }} <!-- Visar titeln från prop -->
          <span class="Textarrow"> > </span> <!-- Pil bredvid titeln -->
        </h1>
      </router-link>
    </div>

    <div class="carousel"> <!-- Karusellens huvudcontainer -->
      <!-- Vänster knapp, kör prevSlide(), blir disabled om index = 0 -->
      <button @click="prevSlide" class="nav prev" :disabled="currentIndex === 0">‹</button>

      <div class="carousel-window" ref="window"> <!-- Mask/fönster som klipper korten -->
        <div
          class="carousel-track"
          ref="track"
          :style="{ transform: `translateX(-${currentIndex * (cardWidth + gap)}px)` }"
        >
          <!-- Spår som flyttas horisontellt med transform baserat på currentIndex -->

          <!-- Loopar igenom alla kort i props 'cards' och gör dem klickbara -->
          <RouterLink
            class="card"
            v-for="(card, index) in cards"
            :key="card.title + index"
            :to="`/recept/${card.id}/${card.slug}`"
          >
            <img :src="card.imageSrc" :alt="card.altText" /> <!-- Kortets bild -->

            <div class="card-content"> <!-- Kortets textinnehåll -->
              <h2>{{ card.title }}</h2> <!-- Kortets titel -->
              <p>{{ card.description }}</p> <!-- Kortets beskrivning -->
            </div>

            <div class="card-footer"> <!-- Footer med extra info -->
              <span>{{ card.ingredients }} | {{ card.time }}</span> <!-- Ingredienser + tid -->
              <span class="stars">{{ card.rating }}</span> <!-- Betyg/stjärnor -->
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- Höger knapp, kör nextSlide(), blir disabled om vi nått slutet -->
      <button @click="nextSlide" class="nav next" :disabled="isNextDisabled">›</button>
    </div>
  </div>
</template>

<script>
export default {
  // ======= INPUT FRÅN FÖRÄLDERN (PROPS) =======
  props: {
    title: String, // Titeltext som visas ovanför karusellen
    link: {        // Router-path som h1-länken ska navigera till
      type: String,
      required: true,
    },
    cards: {       // Array med kortdata (bilder, text, etc.)
      type: Array,
      required: true,
    },
  },

  // ======= INTERN STATE (REAKTIV DATA) =======
  data() {
    return {
      currentIndex: 0, // Pekar på första synliga kortet i spåret
      cardWidth: 0,    // Bredden på ett kort (mäts dynamiskt från DOM)
      gap: 16,         // Mellanrum mellan korten i px (måste matcha CSS gap)
      visibleCount: 3, // Antal kort som visas samtidigt (responsivt)
    }
  },

  // ======= HÄRLEDDA VÄRDEN (COMPUTED) =======
  computed: {
    isNextDisabled() {
      // Om currentIndex + visibleCount >= cards.length
      // betyder det att vi nått slutet och inte kan gå vidare
      return this.currentIndex + this.visibleCount >= this.cards.length
    },
  },

  // ======= BETEENDEN (METHODS) =======
  methods: {
    nextSlide() {
      // Flytta ett steg framåt i karusellen
      if (!this.isNextDisabled) {
        this.currentIndex++ // Ökar index → spåret flyttas med transform
      }
    },
    prevSlide() {
      // Flytta ett steg bakåt i karusellen
      if (this.currentIndex > 0) {
        this.currentIndex-- // Minskar index → spåret flyttas tillbaka
      }
    },
    updateDimensions() {
      // 1) Läs av fönstrets bredd för att avgöra hur många kort som får plats
      const width = window.innerWidth
      if (width < 800) {
        this.visibleCount = 1
      } else if (width < 1200) {
        this.visibleCount = 2
      } else {
        this.visibleCount = 3
      }

      // 2) Hämta referenser till DOM-element
      const track = this.$refs.track
      const windowEl = this.$refs.window

      // 3) Mät kortbredden om spåret har minst ett barn
      if (track && track.children.length > 0) {
        this.cardWidth = track.children[0].offsetWidth // offsetWidth = renderad bredd i px

        // 4) Räkna fönstrets exakta bredd: kortbredd * antal + gap * (antal - 1)
        const gapTotal = Math.max(0, this.visibleCount - 1) * this.gap
        const exactWindowWidth = this.cardWidth * this.visibleCount + gapTotal

        // 5) Sätt fönstrets bredd direkt i DOM
        windowEl.style.width = `${exactWindowWidth}px`
      }

      // 6) Korrigera currentIndex vid resize så vi inte hamnar utanför
      if (this.currentIndex + this.visibleCount > this.cards.length) {
        this.currentIndex = Math.max(0, this.cards.length - this.visibleCount)
      }
    },
  },

  // ======= LIVSCYKEL =======
  mounted() {
    this.updateDimensions() // Körs när komponenten laddas
    window.addEventListener('resize', this.updateDimensions) // Lyssna på resize
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateDimensions) // Städa bort lyssnaren
  },
}
</script>

<style scoped>
/* Wrapper för hela karusellen */
.carousel-section {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  box-sizing: border-box;
}

/* Karusellens layout */
.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

/* Titel-länk */
.title-link {
  color: #dfdfdf;
}

/* Pil bredvid titeln */
.Textarrow {
  top: 0.2rem;
  left: 0.2rem;
  font-size: 2rem;
  font-family: sans-serif;
}

/* Titel-styling */
.Text {
  font-family: 'Holtwood One SC', serif;
  letter-spacing: 0.06em;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  margin-left: 3.5rem;
}

/* Linje under titeln */
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

/* Fönster som klipper korten */
.carousel-window {
  overflow: hidden;
  padding: 10px 0;
  transition: width 0.3s ease;
}

/* Spår som flyttas med transform */
.carousel-track {
  display: flex;
  gap: 1rem;
  transition: transform 0.5s ease;
}

/* Kortens styling */
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

.card:hover { /* Hover-effekt på kort */
  transform: scale(1.02);
}

.card img { /* Bild i kortet */
  width: 100%;
  height: 17rem;
  display: block;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.card-content { /* Kortets textinnehåll */
  padding: 16px 20px 20px;
  flex-grow: 1;
}

.card h2 { /* Kortets titel */
  margin: 0;
  font-size: 20px;