<template>
  <header>
    <div class="container inner">
      <div class="logo">
        <Logo />
      </div>
      <div class="auth">
        <div v-if="status === 'authenticated'" class="user">
          <span>{{ data.user.name }}</span>
          <img :src="data.user.image" />
          <ButtonCTA @click="signOut">Odhlásiť sa</ButtonCTA>
        </div>
        <NuxtLink v-else to="/login">
          <ButtonCTA icon="uiw:user">Login</ButtonCTA>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
const { status, data, signOut } = useAuth()
</script>

<style lang="scss" scoped>
header {
  height: 80px;

  .inner {
    height: 100%;
    display: flex;
    align-items: center;

    .auth {
      margin-left: auto;

      .user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;

        }
      }
    }
  }
}
</style>