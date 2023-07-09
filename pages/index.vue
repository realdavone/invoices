<template>
  <section>
    <div v-if="status === 'authenticated'">
      <h1 style="margin-bottom: 20px;">Vitaj, {{ data.user.name }}</h1>
      <div v-if="!data.user">
        <span>Prajete si vyplniť svoje základné údaje? </span>
        <NuxtLink to="/profile" style="color:rgb(var(--secondary-clr)); text-decoration: underline;">Vyplniť profil</NuxtLink>
      </div>
      <div>
        <NuxtLink to="/invoice/new">
          <Button variation="secondary">Nová faktúra</Button>
        </NuxtLink>
      </div>
    </div>
    <div v-else>
      xD
    </div>
  </section>
</template>

<script setup>
const { status } = useAuth()

const { data } = await useFetch('/api/me')

definePageMeta({ auth: false })

useHead({
  title: 'Domov',
})
</script>