<template>
  <button v-bind="loading ? { disabled: true } : null">
    <span>
      <slot />
    </span>
    <Loader v-if="loading" :height="16" />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const buttonVariations = new Map([
  ['primary', '--primary-clr'],
  ['secondary', '--secondary-clr'],
  ['success', '--success-clr'],
  ['danger', '--danger-clr'],
  ['destructive', '--destructive-clr'],
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

const backgroundColor = computed(() => `rgb(var(${buttonVariations.get(variation)})`)
</script>

<style lang="scss" scoped>
button {
  --success-clr:0, 138, 0;
  --danger-clr:173, 255, 47;
  --destructive-clr:220, 20, 60;

  height: 36px;
  padding: 0 16px;
  background-color: v-bind(backgroundColor);
  transition: 0.2s ease background-color;
  border-radius: 6px;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 12px;
  font-size: 500;

  &:disabled {
    cursor: initial;
  }
}
</style>