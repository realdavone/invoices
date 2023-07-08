<template>
  <div>
    <NuxtLink to="/invoice/new">Nova faktura</NuxtLink>
  </div>
</template>

<script setup>

definePageMeta({ auth: false })

useHead({
  title: 'Domov',
})
</script>