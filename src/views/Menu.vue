<template>
  <div>
    <div class="menu">
      <img class="menu__header" src="@/assets/logo.svg" alt="main menu" />
      <v-btn class="menu__item" large color="primary">New Campaign</v-btn>
      <v-btn class="menu__item" large color="regular">Load Campaign</v-btn>
      <v-btn class="menu__item" large color="regular">Settings</v-btn>
    </div>
    <div class="footer text-caption">
      Copyright © 2021. All rights reserved. Design and implementation by
      <a href="https://github.com/BenStokmans" target="_blank">B. Stokmans</a>
      and
      <a href="https://github.com/cfschilham" target="_blank">C.F. Schilham</a>.
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
};
</script>

<style scoped lang="scss">
.menu {
  width: 350px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &__header {
    margin: 0 auto 40px auto;
    width: 100%;
  }

  &__item {
    //width: 80%;
    //margin: auto;
    &:not(&__item:nth-of-type(1)) {
      margin-top: 20px;
    }
  }
}
.footer {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  background-color: #ffffff;
}
</style>
