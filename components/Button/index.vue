<template>
  <button
  v-bind="loading ? { disabled: true } : null"
  >
    <span>
      <slot />
    </span>
    <Loader v-if="loading" />
  </button>
</template>

<script setup>
const { loading } = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
button {
  background-color: var(--primary-clr);
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  height: 36px;
  border-radius: 8px;
  font-size: 14px;
  padding-inline: 15px;

  &:disabled {
    cursor: initial;
  }
}
</style>