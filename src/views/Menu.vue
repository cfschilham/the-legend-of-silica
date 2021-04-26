<template>
  <div>
    <Particles />
    <div class="menu" :style="{ background: $vuetify.theme.currentTheme.background }">
      <img src="@/assets/logo.svg" alt="logo" class="logo" />
      <v-btn class="item" color="primary" large @click="$router.push('/new-campaign')">Nieuwe Campagne</v-btn>
      <v-btn class="item" large @click="$router.push('/campaign')">Campagne Hervatten</v-btn>
      <v-btn class="item" large @click="openRepository">Repository</v-btn>
    </div>
  </div>
</template>

<script>
import Particles from "@/components/Particles";

export default {
  name: "Menu",
  components: {
    Particles,
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
</style>
