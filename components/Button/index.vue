<template>
  <button
  v-bind="loading ? { disabled: true } : null"
  >
    <span>
      <slot />
    </span>
    <Loader v-if="loading" :height="16" />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const buttonVariations = new Map([
  ['primary', 'btn-primary'],
  ['secondary', 'btn-secondary'],
  ['success', 'btn-success'],
  ['danger', 'btn-danger'],
  ['destructive', 'btn-warning'],
])

const { loading, variation } = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  variation: {
    type: String,
    default: 'primary'
  }
})
</script>

<style lang="scss" scoped>
button {
  border: 2px solid rgb(var(--primary-clr));
  padding: 8px 20px;
  background-color: rgba(var(--primary-clr), 0.3);
  transition: 0.2s ease background-color;
  border-radius: 6px;
  text-transform: uppercase;
  font-weight: 700;
  box-shadow: 3px 3px 10px 0px rgba(0,0,0,0.75);
  display: flex;
  gap: 10px;
  align-items: center;

  &:disabled {
    cursor: initial;
  }
}

@media(hover: hover) {
  button:not(:disabled):hover {
    background-color: rgba(var(--primary-clr), 0.75);
  }
}
</style>