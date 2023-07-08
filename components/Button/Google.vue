<template>
  <button @click="signIn('google', { callbackUrl: '/' })">
    <Icon name="formkit:google" />
    <span>Prihlásiť sa cez Google</span>
  </button>
</template>

<script setup>
const { signIn } = useAuth()

</script>

<style lang="scss" scoped>
button {
  height: 36px;
  padding-inline: 15px;
  border-radius: 6px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: rgb(var(--secondary-clr));
}
</style>