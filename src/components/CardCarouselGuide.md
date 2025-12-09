<template>
  <div class="carousel-section">
    <!--
      TEXT/HEADING
      RouterLink används från Vue Router för att länka till en sida (prop: link).
      Den omsluter rubriken och visar en pil-symbol.
    -->
    <div class="Text">
      <RouterLink :to="link" class="title-link">
        <h1>
          {{ title }}
          <span class="Textarrow"> &gt; </span>
        </h1>
      </RouterLink>
    </div>

    <!--
      HUVUDKARUSELLEN
      Innehåller navigationsknappar, "fönstret" som visar korten och spåret som flyttas via transform.
    -->
    <div class="carousel">
      <!-- Prev-knapp: anropar prevSlide metoden. :disabled binder till expression för att inaktivera. -->
      <button @click="prevSlide" class="nav prev" :disabled="currentIndex === 0">‹</button>

      <div class="carousel-window">
        <!--
          carousel-track är flexbehållaren som håller alla kort. Vi manipulerar dess inline-stil (transform)
          med den beräknade propertyn trackStyle för att skifta vilka kort som syns.
        -->
        <div class="carousel-track" :style="trackStyle">
          <!--
            Vi loopar över props.cards (från förälder) med v-for.
            Varje kort är en länk till en recept-sida baserat på card.id och card.slug.
            key är viktigt för effektiv rendering.
          -->
          <RouterLink
            class="card-wrapper"
            v-for="(card, index) in cards"
            :key="card.id || index"
            :to="`/recept/${card.id}/${card.slug}`"
          >
            <article class="card">
              <!-- Bilden kommer från card.imageSrc och alt-text från card.altText -->
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

      <!-- Next-knapp: disabled styrs av computed property isNextDisabled -->
      <button @click="nextSlide" class="nav next" :disabled="isNextDisabled">›</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardCarousel',
  props: {
    // title visas i rubriken. Kan vara undefined -> visa inget.
    title: String,
    // link krävs för att rubriken ska linka någonstans
    link: {
      type: String,
      required: true,
    },
    // cards: array med objekt som beskriver varje kort (id, slug, imageSrc, altText, title, description, ingredients, time, rating)
    cards: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // currentIndex är vilket "steg" i karusellen vi är på — 0 = första synliga kortet
      currentIndex: 0,
      // visibleCount är hur många kort vi räknar som synliga i viewporten vid given skärmstorlek
      visibleCount: 3, // Standardvärde (desktop)
    }
  },
  computed: {
    // isNextDisabled avgör om "nästa" knapp ska vara inaktiverad. True när vi är vid sista möjliga index.
    isNextDisabled() {
      return this.currentIndex >= this.cards.length - this.visibleCount
    },
    // trackStyle returnerar ett objekt som binds till style-attributet för .carousel-track.
    // Vi använder en procentbaserad stegberäkning: om visibleCount = 3, är varje kort-basis 33.333...%.
    trackStyle() {
      // step är hur mycket 'en plats' (ett index) ska översättas i procent
      const step = 100 / this.visibleCount
      return {
        // translateX använder currentIndex * step för att flytta spåret åt vänster
        transform: `translateX(-${this.currentIndex * step}%)`,
      }
    },
  },
  methods: {
    // Flytta framåt ett steg, om vi inte är i slutet
    nextSlide() {
      if (!this.isNextDisabled) {
        this.currentIndex++
      }
    },
    // Flytta bakåt ett steg
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    // Hanterar fönsterstorleksändringar för att uppdatera visibleCount och säkerställa att currentIndex är giltigt
    handleResize() {
      const width = window.innerWidth
      // Anpassa breakpoints — samma som i CSS media queries
      if (width < 800) {
        this.visibleCount = 1
      } else if (width < 1200) {
        this.visibleCount = 2
      } else {
        this.visibleCount = 3
      }

      // Om fönstret krymps och currentIndex plötsligt gör att vi pekar "utanför" listan,
      // flytta indexet till det högsta giltiga värdet.
      if (this.currentIndex > this.cards.length - this.visibleCount) {
        this.currentIndex = Math.max(0, this.cards.length - this.visibleCount)
      }
    },
  },
  mounted() {
    // När komponenten mountas, kör en resize-hantering en gång för att sätta rätt visibleCount
    this.handleResize()
    // Registrera resize-event för att uppdatera visibleCount automatiskt när fönstret ändras
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    // Viktigt att ta bort lyssnaren för att undvika memory leaks när komponenten tas bort
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>

<style scoped>
/*
  Stilavsnittet innehåller layout, responsivitet och visuella detaljer.
  scoped betyder att stilarna bara appliceras på denna komponent (Vue SFC scoped).
*/
.carousel-section {
  width: 100%;
  max-width: 1300px; /* centrerar och sätter en maxbredd */
  margin: 0 auto 3rem auto; /* centrerar horisontellt och ger bottenmarginal */
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  box-sizing: border-box;
}

.carousel {
  display: flex; /* raderar nav-knappar + fönster i en rad */
  align-items: center;
  justify-content: center;
  gap: 0;
  width: 100%;
  position: relative; /* gör att knappar kan positioneras över innehållet om behövligt */
}

.Text {
  font-family: 'Holtwood One SC', serif; /* typsnitt - kan falla tillbaka om inte laddat */
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

/* Understrykning under rubriken; ::after är dekorativ */
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
  overflow: hidden; /* döljer kort som ligger utanför viewporten */
  width: 100%;
  padding: 10px 0;
}

.carousel-track {
  display: flex; /* gör att korten ligger på rad */
  width: 100%;
  transition: transform 0.5s ease; /* gör animationen mjuk när vi flyttar spåret */
}

.card-wrapper {
  flex-shrink: 0; /* förhindrar att korten krymper */
  flex-grow: 0;  /* förhindrar att korten expanderar */
  text-decoration: none;
  box-sizing: border-box;

  /* Standard (Desktop): 3 kort = 33.333% bredd */
  flex-basis: 33.3333%;
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
  transition: transform 0.3s ease; /* hover-effekt */
}

.card:hover {
  transform: scale(1.02);
}

.card img {
  width: 100%;
  height: 17rem;
  display: block;
  object-fit: cover; /* beskär bilden med bibehållen aspekt */
  border-bottom: 1px solid #eee;
}

.card-content {
  padding: 16px 20px 20px;
  flex-grow: 1; /* gör att footern trycks ner till botten */
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
  text-overflow: ellipsis; /* visar ... om texten blir för lång */
}

.card-footer {
  margin-top: auto; /* pushar footern till slutet av kortet */
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
