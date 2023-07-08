<template>
  <div class="loader"></div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  height: {
    type: Number,
    default: 20
  }
})

const height = computed(() => `${props.height}px`)
const borderThickness = computed(() => `${(props.height / 10) + 1}px`)
</script>

<style lang="scss" scoped>
.loader {
  max-width: v-bind(height);
  min-width: v-bind(height);
  aspect-ratio: 1;
  border: v-bind(borderThickness) solid #ffffff80;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>