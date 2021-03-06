<template>
  <v-app>
    <v-main>
      <v-container class="buttons">
        <i
          class="mdi toggle-music-btn"
          :class="musicToggleButtonClass"
          @click="toggleMusic"
        ></i>
        <i
          class="mdi toggle-theme-btn"
          :class="darkModeOnClass"
          @click="toggleTheme"
        ></i>
      </v-container>
      <audio src="@/assets/maintheme.mp3" autoplay loop ref="music"></audio>
      <router-view></router-view> </v-main
    >`
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      musicMuted: false,
      musicToggleButtonClass: "mdi-volume-high",
      darkModeOnClass: "mdi-moon-waxing-crescent",
    };
  },
  mounted() {
    this.$refs.music.volume = 0.2;
  },
  methods: {
    toggleMusic() {
      if (this.musicMuted) {
        this.$refs.music.volume = 0.2;
        this.musicToggleButtonClass = "mdi-volume-high";
        this.musicMuted = false;
        return;
      }
      this.$refs.music.volume = 0;
      this.musicToggleButtonClass = "mdi-volume-off";
      this.musicMuted = true;
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.darkModeOnClass = this.$vuetify.theme.dark ? "mdi-white-balance-sunny" : "mdi-moon-waxing-crescent";
    },
  },
};
</script>

<style lang="scss">
@import "~normalize.css";
@import "mixins/common.scss";
</style>

<style scoped lang="scss">
.buttons {
  position: fixed;
  z-index: 1;
  font-size: 30px;
  top: 8px;
  right: 20px;
  display: flex;
  .toggle-music-btn {
    margin-left: 20px;
  }
  flex-direction: row-reverse;
}
</style>
