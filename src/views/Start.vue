<template>
  <v-container>
    <div class="content" :style="{background: $vuetify.theme.themes[theme].background}">
      <img src="@/assets/logo.svg" alt="logo" class="content__logo">
      <h2 class="text--primary content__item">Welcome to the Legend Of Silica</h2>
      <p class="text--primary content__item">Instructions here</p>
      <v-btn color="primary" @click="start">Start</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Start",
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? "dark" : "light";
    },
  },
  methods: {
    start() {
      this.$store.commit("toggleMusic");
      this.$root.$emit("music");
      this.$router.push({ path: "menu" });
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 600px;
  &__logo {
    align-self: center;
    width: 400px;
    margin-bottom: 10px;
    user-select: none;
  }
  &__item {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
