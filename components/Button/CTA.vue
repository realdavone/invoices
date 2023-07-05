<template>
  <button>
    <Icon v-if="icon" :name="icon" />
    <slot/>
  </button>
</template>

<script setup>
const { icon } = defineProps({ icon: String })
</script>

<style lang="scss" scoped>
button {
  background-color: var(--primary-clr);
  padding: 8px 14px;
  border-radius: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>