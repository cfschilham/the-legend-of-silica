<template>
  <div class="home">
    <div class="continue-screen">
      <img src="@/assets/logo.svg" alt="continue-screen__logo" class="continue-screen__logo">
      <v-btn
        color="primary"
      >Start</v-btn>
    </div>
    <div class="footer text-caption">
      Copyright © 2021. All rights reserved. Design and implementation by <a href="https://github.com">B.D.J. Stokmans</a> and
      <a href="https://github.com/cfschilham">C.F. Schilham</a>.
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped lang="scss">
  .continue-screen {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 330px;
    &__logo {
      width: 400px;
    }
  }
  .footer {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
  }
</style>
