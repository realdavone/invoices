<template>
  <header>
    <div class="container inner">
      <div class="logo">
        <Logo />
      </div>
      <div class="auth">
        <div v-if="status === 'authenticated'" class="user">
          <img :src="data.user.image" @click="showUserMenu" draggable="false"/>
          <Transition name="fade">
            <UserMenu v-if="isUserMenuShown" @close="isUserMenuShown = false" />
          </Transition>
        </div>
        <NuxtLink v-else to="/login">
          <Button icon="uiw:user">Prihlásiť sa</Button>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const { status, data } = useAuth()

const isUserMenuShown = ref(false)

function showUserMenu() {
  isUserMenuShown.value = true
}
</script>

<style lang="scss" scoped>
header {
  height: 90px;
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
        position: relative;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>