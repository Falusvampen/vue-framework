<template>
  <div
    class="star-rating"
    :class="{ 'is-readonly': readonly, 'is-interactive': !readonly }"
    @mouseleave="resetHover"
  >
    <span
      v-for="star in maxStars"
      :key="star"
      class="star-wrapper"
      @mouseenter="setHover(star)"
      @click="submitRating(star)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="star-icon"
        :class="{ filled: star <= visibleRating, hovered: star <= hoverValue }"
      >
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </svg>
    </span>

    <span v-if="!readonly && showLabel && hoverValue > 0" class="rating-label">
      {{ hoverValue }}/{{ maxStars }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    maxStars: {
      type: Number,
      default: 5,
    },

    showLabel: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'rate'],
  data() {
    return {
      hoverValue: 0,
    }
  },
  computed: {
    visibleRating() {
      return this.hoverValue > 0 ? this.hoverValue : this.modelValue
    },
  },
  methods: {
    setHover(star) {
      if (this.readonly) return
      this.hoverValue = star
    },
    resetHover() {
      if (this.readonly) return
      this.hoverValue = 0
    },
    submitRating(star) {
      if (this.readonly) return

      this.$emit('update:modelValue', star)
      this.$emit('rate', star)
    },
  },
}
</script>

<style scoped>
.star-rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.star-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.1s ease;
}

.is-interactive .star-wrapper {
  cursor: pointer;
}
.is-interactive .star-wrapper:hover {
  transform: scale(1.2);
}

.star-icon {
  width: 24px;
  height: 24px;
  fill: #e0e0e0;
  transition: fill 0.2s ease;
}

.star-icon.filled {
  fill: #ffc107;
  filter: drop-shadow(0 0 2px rgba(255, 193, 7, 0.4));
}

.rating-label {
  margin-left: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #666;
  min-width: 30px;
}
</style>
