<template>
  <div class="app-wrapper">
    <Header />
    <main class="container">
      <slot />
    </main>
    <Footer />    
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>