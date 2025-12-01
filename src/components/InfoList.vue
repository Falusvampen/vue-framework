<template>
  <div class="info-list-wrapper" :class="variant">
    <h3 v-if="title" class="section-title">{{ title }}</h3>

    <ul v-if="variant === 'bullet'" class="list-bullet">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="list-item-bullet"
        :class="{ 'is-done': checkedItems.includes(index) }"
        @click="toggleItem(index)"
      >
        <span class="icon-box">
          <span class="checkmark" v-show="checkedItems.includes(index)">✔</span>
        </span>
        <span class="text-content">{{ item }}</span>
      </li>
    </ul>

    <ol v-else class="list-ordered">
      <li v-for="(item, index) in items" :key="index" class="list-item-ordered">
        <span class="step-number">{{ index + 1 }}</span>
        <div class="text-content">
          <span class="step-label">Steg {{ index + 1 }}</span>
          <p>{{ item }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'InfoList',
  props: {
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      required: true,
      validator: (prop) => prop.every((e) => typeof e === 'string'),
    },
    variant: {
      type: String,
      default: 'bullet',
      validator: (value) => ['bullet', 'ordered'].includes(value),
    },
  },
  data() {
    return {
      checkedItems: [],
    }
  },
  methods: {
    toggleItem(index) {
      if (this.variant !== 'bullet') return

      if (this.checkedItems.includes(index)) {
        this.checkedItems = this.checkedItems.filter((i) => i !== index)
      } else {
        this.checkedItems.push(index)
      }
    },
  },
}
</script>

<style scoped>
.info-list-wrapper {
  margin-bottom: 32px;
  width: 100%;
  font-family: 'Inter', sans-serif;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #1a1a1a;
  margin-bottom: 16px;
  border-left: 4px solid #42b983;
  padding-left: 12px;
}

.list-bullet {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item-bullet {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 8px;
  background-color: #f9f9f9;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.list-item-bullet:hover {
  background-color: #f0f0f0;
}

.list-item-bullet.is-done {
  background-color: #e8f5e9;
  opacity: 0.7;
}

.list-item-bullet.is-done .text-content {
  text-decoration: line-through;
  color: #888;
}

.icon-box {
  width: 24px;
  height: 24px;
  border: 2px solid #ddd;
  border-radius: 50%;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  flex-shrink: 0;
  transition: border-color 0.2s;
}

.list-item-bullet.is-done .icon-box {
  border-color: #42b983;
  background-color: #42b983;
}

.checkmark {
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
}

.list-ordered {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item-ordered {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  position: relative;
}

.list-item-ordered:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 20px;
  top: 40px;
  bottom: -24px;
  width: 2px;
  background-color: #eee;
  z-index: 0;
}

.step-number {
  width: 40px;
  height: 40px;
  background-color: #1a1a1a;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  flex-shrink: 0;
  z-index: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-content p {
  margin: 0;
  line-height: 1.6;
  color: #333;
  font-size: 1rem;
}

.step-label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #888;
  font-weight: 700;
  margin-bottom: 4px;
}
</style>
