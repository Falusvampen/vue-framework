<template>
  <div class="carousel-wrapper" ref="wrapper">
    <div class="header" :style="{ maxWidth: carouselWidth }">
      <h2 v-if="title">{{ title }}</h2>

      <div class="navigation-buttons">
        <button @click="scroll('left')" aria-label="Scrolla vänster" :disabled="!canScrollLeft">
          ←
        </button>
        <button @click="scroll('right')" aria-label="Scrolla höger" :disabled="!canScrollRight">
          →
        </button>
      </div>
    </div>

    <div
      class="carousel-container"
      ref="scrollContainer"
      @scroll="checkScrollPosition"
      :style="{ maxWidth: carouselWidth }"
    >
      <div v-for="(item, index) in items" :key="item.id || index" class="carousel-item">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCarousel',
  props: {
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      required: true,
    },
    cardWidth: {
      type: Number,
      default: 300,
    },
    gap: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      canScrollLeft: false,
      canScrollRight: true,
      carouselWidth: '100%',
    }
  },
  mounted() {
    this.checkScrollPosition()
    this.updateLayout()

    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      window.requestAnimationFrame(() => {
        this.updateLayout()
        this.checkScrollPosition()
      })
    },
    updateLayout() {
      const wrapper = this.$refs.wrapper
      if (!wrapper) return

      const availableWidth = wrapper.clientWidth

      const itemTotalWidth = this.cardWidth + this.gap

      let visibleCount = Math.floor((availableWidth + this.gap) / itemTotalWidth)

      if (visibleCount < 1) visibleCount = 1

      const exactWidth = visibleCount * this.cardWidth + (visibleCount - 1) * this.gap

      this.carouselWidth = `${exactWidth}px`
    },
    scroll(direction) {
      const container = this.$refs.scrollContainer

      const scrollAmount = this.cardWidth + this.gap

      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    },
    checkScrollPosition() {
      const el = this.$refs.scrollContainer
      if (!el) return
      this.canScrollLeft = el.scrollLeft > 1
      this.canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
    },
  },
}
</script>

<style scoped>
.carousel-wrapper {
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

h2 {
  font-size: 1.5rem;
  margin: 0;
  color: #333;
}

.carousel-container {
  display: flex;
  gap: 20px;

  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  margin: 0 auto;
  width: 100%;
}

.carousel-container::-webkit-scrollbar {
  display: none;
}

.carousel-item {
  scroll-snap-align: start;
  flex-shrink: 0;
}

.navigation-buttons button {
  background: white;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  margin-left: 8px;
  font-size: 1.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.navigation-buttons button:hover:not(:disabled) {
  background-color: #f0f0f0;
  border-color: #999;
}

.navigation-buttons button:disabled {
  opacity: 0.3;
  cursor: default;
}

@media (max-width: 768px) {
  .navigation-buttons {
    display: none;
  }
}
</style>
