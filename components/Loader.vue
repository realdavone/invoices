<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
.loader {
  width: 20px;
  aspect-ratio: 1;
  border: 3px solid #ffffff80;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>