<template>
  <div>
    <div id="menu-particles"></div>
    <div class="menu" :style="{background: $vuetify.theme.themes[theme].background}">
      <img src="@/assets/logo.svg" alt="logo" class="menu__logo">
      <v-btn
        class="menu__item"
        color="primary"
        large
        @click="$router.push(`/newcampaign`)"
      >New Campaign</v-btn>
      <v-btn
        class="menu__item"
        large
      >Load Campaign</v-btn>
      <v-btn
        class="menu__item"
        large
      >Settings</v-btn>
      <v-btn
        class="menu__item"
        large
        @click="openRepository"
      >Repository</v-btn>
    </div>
  </div>
</template>

<script>
import "particles.js/particles";
import particlesConfig from "@/mixins/particles.config";

export default {
  name: "Menu",
  methods: {
    openRepository() {
      window.open("https://github.com/cfschilham/the-legend-of-silica", "_blank");
    },
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? "dark" : "light";
    },
  },
  mounted() {
    window.particlesJS("menu-particles", particlesConfig);
  },
};
</script>

<style scoped lang="scss">
.menu {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 400px;
  &__logo {
    margin-bottom: 50px;
    user-select: none;
  }
  &__item:not(&__item:nth-of-type(1)) {
    margin-top: 20px;
  }
}
#menu-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
</style>
