<template>
  <div>
    <div id="particles"></div>
    <div class="menu" :style="{ background: $vuetify.theme.currentTheme.background }">
      <img src="@/assets/logo.svg" alt="logo" class="logo" />
      <v-btn class="item" color="primary" large @click="$router.push('/new-campaign')">New Campaign</v-btn>
      <v-btn class="item" large @click="$router.push('/campaign')">Resume Campaign</v-btn>
      <v-btn class="item" large @click="openRepository">Repository</v-btn>
    </div>
  </div>
</template>

<script>
import "particles.js/particles";
import particlesConfig from "@/mixins/particles.config";

export default {
  name: "Menu",
  mounted() {
    window.particlesJS("particles", particlesConfig);
  },
  methods: {
    openRepository() {
      window.open("https://github.com/cfschilham/the-legend-of-silica", "_blank", "rel=noreferrer");
    },
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
  .logo {
    margin-bottom: 50px;
    user-select: none;
  }
  .item {
    margin-top: 20px;
  }
  .item:first-of-type {
    margin-top: 0;
  }
}
#particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
</style>
