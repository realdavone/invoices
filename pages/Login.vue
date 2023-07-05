<template>
  <div class="login">
    <section>
      <h2>Prihlásiť sa</h2>
      <ButtonCTA icon="cib:google" @click="signIn('google', { callbackUrl: '/' })">Prihlásiť sa cez Google</ButtonCTA>
    </section>
  </div>
</template>

<script setup>
const { signIn } = useAuth()

definePageMeta({
  layout: 'viewonly',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

useHead({
  title: 'Login',
})
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  display: grid;
  place-items: center;
}
</style>