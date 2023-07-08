<template>
  <div class="login">
    <section class="form">
      <h3>Prihlásiť sa</h3>
      <ButtonGoogle />
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'viewonly',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})

useHead({ title: 'Login' })
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  display: grid;
  place-items: center;

  .form {
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
    padding: 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}
</style>