<template>
  <v-app>
    <v-main>
      <div class="buttons" :style="{ background: $vuetify.theme.currentTheme.background }">
        <v-tooltip bottom v-if="$route.name !== `Start`">
          <template v-slot:activator="{ on }">
            <i class="mdi btn toggle-music-btn" :class="musicToggleButtonClass" @click="toggleMusic" v-on="on"></i>
          </template>
          <span>Toggle music</span>
        </v-tooltip>
      </div>
      <audio src="@/assets/main-theme.mp3" loop ref="music"></audio>
      <router-view></router-view>
      <div
        v-if="$route.name !== 'Campaign'"
        class="footer text-caption"
        :style="{ background: $vuetify.theme.currentTheme.background }"
      >
        Copyright © 2021. All rights reserved. Design and implementation by
        <a href="https://github.com/BenStokmans" target="_blank">B. Stokmans</a>
        and
        <a href="https://github.com/cfschilham" target="_blank">C.F. Schilham</a>.
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      musicToggleButtonClass: "mdi-volume-high",
    };
  },
  created() {
    this.$router.push("/");
  },
  mounted() {
    if (this.$store.state.musicMuted) {
      this.musicToggleButtonClass = "mdi-volume-off";
    }
    this.$refs.music.onloadeddata = () => {
      if (this.$store.state.musicMuted) {
        this.$refs.music.volume = 0;
        return;
      }
      this.$refs.music.volume = 0.2;
    };
  },
  methods: {
    toggleMusic() {
      this.$store.commit("toggleMusic");
      if (this.$store.state.musicMuted) {
        this.$refs.music.volume = 0;
        this.musicToggleButtonClass = "mdi-volume-off";
        return;
      }
      this.$refs.music.volume = 0.2;
      this.musicToggleButtonClass = "mdi-volume-high";
    },
  },
  watch: {
    $route(val, oldVal) {
      if (oldVal.name !== "Start" && val.name !== "Start") {
        return;
      }
      if (val.name !== "Start") {
        this.$refs.music.currentTime = 0;
        this.$refs.music.play();
        return;
      }
      this.$refs.music.pause();
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
  font-size: 30px;
  top: 8px;
  right: 20px;
  display: flex;
  flex-direction: row-reverse;
  z-index: 1;
  align-items: center;
  & .btn {
    margin-left: 16px;
    &:hover {
      cursor: pointer;
    }
  }
  & .toggle-theme-btn {
    font-size: 26px; // Makes icon seem more similar in size to others.
  }
}
.footer {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  padding: 10px;
  background-color: #ffffff;
  text-align: center;
}
#particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
</style>
