<template>
<v-app>
  <v-main>
    <i class="mdi toggle-music-btn" :class="musicToggleButtonClass" @click="toggleMusic"></i>
    <audio src="@/assets/maintheme.mp3" loop ref="music"></audio>
    <router-view></router-view>
  </v-main>
</v-app>
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      musicMuted: false,
      musicToggleButtonClass: "mdi-volume-high",
    };
  },
  mounted() {
    this.$refs.music.onloadeddata = () => {
      this.$refs.music.volume = 0.2;
      this.$refs.music.play();
    };
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
  },
};
</script>

<style lang="scss">
@import "~normalize.css";
@import "mixins/common.scss";
</style>

<style scoped lang="scss">
.toggle-music-btn {
  position: fixed;
  z-index: 1;
  right: 20px;
  top: 8px;
  font-size: 30px;

  &:hover {
    cursor: pointer;
  }
}
</style>
