<template>
  <div class="carousel-section">
    <div class="Text">
  <router-link :to="link" class="title-link">
    <h1>{{ title }}
     <span class="Textarrow" > > </span>
    </h1>
  </router-link>
</div>

    <div class="carousel">
      <button @click="prevSlide" class="nav prev" :disabled="currentIndex === 0">‹</button>

      <div class="carousel-window">
        <div
          class="carousel-track"
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

      <button
        @click="nextSlide"
        class="nav next"
        :disabled="currentIndex + visibleCount >= cards.length"
      >
        ›
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    link: {
    type: String,
    required: true
  },

    cards: {
      type: Array,
      required: true,
    },
    visibleCount: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      currentIndex: 0,
      cardWidth: 368,
      gap: 16,
    }
  },
  methods: {
    nextSlide() {
      if (this.currentIndex + this.visibleCount < this.cards.length) {
        this.currentIndex++
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
  },
}
</script>

<style scoped>
.carousel-section {
  width: calc(24rem * 3 + 2 * 1rem);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title-link {
  color:#dfdfdf;
}


.Textarrow{
  top:0.2rem;
  left:0.2rem;
  font-size:2rem;
  font-family: sans-serif;
}

.Text {
  font-family: 'Holtwood One SC';
  letter-spacing: 0.06em;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  margin-left: 3rem;
}

.Text h1::after {
  content: '';
  display: block;
  width: 22rem;
  height: 3.8px;
  background-color: #aaa8a8;
  margin-top: 0.4rem;
  border-radius: 2px;
}

.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}



.carousel-window {
  width: calc(23rem * 3 + 2 * 1rem);
  overflow: hidden;
}

.carousel-track {
  display: flex;
  gap: 1rem;
  transition: transform 0.5s ease;
  margin-bottom: 4rem;
}

.card {
  background: #d9d9d9;
  border-radius: 16px;
  width: 23rem;
  height: fit-content;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}
a:hover {
  opacity: 1;
}

.card img {
  width: 100%;
  height: 17rem;
  display: block;
  border-bottom: 1px solid #eee;
  border-radius: 2vh;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: scale(1.04);
}

.card-content {
  padding: 16px 20px 20px;
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
  max-height: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-footer {
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
}

@media (max-width: 1200px) {

  .carousel-section {
  width: calc(24rem * 2 + 2 * 1rem); 
  margin: 0 auto;                    
  display: flex;
  flex-direction: column;
  align-items: center;


  
           
}

.Text {
  font-family: "Holtwood One SC";
  letter-spacing: 0.06em;
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  margin-left: 1rem;
  text-align: center;
}

.Text h1::after {
  content: "";
  display: block;
  width: 22rem;
  height: 3.8px;
  background-color: #aaa8a8;
  margin-top: 0.4rem;
  border-radius: 2px;
}


   
  

  .carousel-window {
    width: calc(23rem * 2 + 1rem); 
  }
}


@media (max-width: 800px) {

  .carousel-section {
  width: calc(24rem * 1 + 2 * 1rem); 
  margin: 0 auto;                    
  display: flex;
  flex-direction: column;
  align-items: center;


  
           
}





   
  

  .carousel-window {
    width: calc(23rem * 1 + 1rem); 
  }
}

@media (max-width: 500px) {

  .carousel-section {
  width: calc(24rem * 1 + 2 * 1rem); 
  margin: 0 auto;                    
  display: flex;
  flex-direction: column;
  align-items: center;


  
           
}

.nav.prev {
  margin-right:0.2rem;

  
}

.nav.next{
  margin-left: 0.2rem;

}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
  margin-bottom: 4rem;
}


}

  

</style>
