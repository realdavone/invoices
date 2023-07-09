<template>
  <div ref="menu" class="user-menu">
    <div class="name">{{ data.user.name }}</div>
    <NuxtLink to="/profile" @click="emit('close')">Môj profil</NuxtLink>
    <button @click.stop="signOut({ callbackUrl: '/', redirect: false })">
      <Icon name="material-symbols:logout" />
      <span>Odhlásiť</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const { data, signOut } = useAuth()

const emit = defineEmits(['close'])

const menu = ref(null)

onClickOutside(menu, () => emit('close'))
</script>

<style lang="scss" scoped>
.user-menu {
  position: absolute;
  width: 200px;
  right: 0;
  top: calc(100% + 10px);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px -1px rgba(0,0,0,0.75);
  z-index: 10;
  background-color: rgb(var(--background-clr));

  .name {
    padding-bottom: 10px;
    font-size: 20px;
  }

  button {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    gap: 5px;
    font-size: 14px;
    transition: 0.2s ease background-color;
  }
}

@media(hover: hover) {
  button:hover {
    background-color: rgba(0, 0, 0, 1);
  }
}
</style>