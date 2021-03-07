<template>
  <v-app>
    <v-main>
      <div
        class="buttons"
        :style="{ background: $vuetify.theme.themes[theme].background }"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <i
              class="mdi btn toggle-music-btn"
              :class="musicToggleButtonClass"
              @click="toggleMusic"
              v-on="on"
            ></i>
          </template>
          <span>Toggle music</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <i
              class="mdi btn toggle-theme-btn"
              :class="themeToggleButtonClass"
              @click="toggleTheme"
              v-on="on"
            ></i>
          </template>
          <span>Toggle theme</span>
        </v-tooltip>
      </div>
      <audio src="@/assets/maintheme.mp3" loop ref="music"></audio>
      <div id="particles"></div>
      <router-view></router-view>
      <div
        class="footer text-caption"
        :style="{ background: $vuetify.theme.themes[theme].background }"
      >
        Copyright © 2021. All rights reserved. Design and implementation by
        <a href="https://github.com/BenStokmans" target="_blank">B. Stokmans</a>
        and
        <a href="https://github.com/cfschilham" target="_blank">C.F. Schilham</a
        >.
      </div>
    </v-main>
  </v-app>
</template>

<script>
import "particles.js/particles";
import particlesConfig from "@/mixins/particles.config";

export default {
  name: "App",
  data: () => {
    return {
      musicToggleButtonClass: "mdi-volume-high",
      themeToggleButtonClass: "mdi-moon-waxing-crescent",
    };
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? "dark" : "light";
    },
  },
  created() {
    this.$vuetify.theme.dark = this.$store.state.darkMode;
  },
  mounted() {
    if (this.$store.state.musicMuted) {
      this.$refs.music.play();
    } else {
      this.musicToggleButtonClass = "mdi-volume-off";
    }
    if (this.$store.state.darkMode) {
      this.themeToggleButtonClass = "mdi-white-balance-sunny";
    }
    this.$refs.music.onloadeddata = () => {
      this.$refs.music.volume = 0.2;
    };
    window.particlesJS("particles", particlesConfig);
    this.$root.$on("music", () => {
      this.$refs.music.play();
    });
  },
  methods: {
    toggleMusic() {
      this.$store.commit("toggleMusic");
      if (this.$store.state.musicMuted) {
        this.$refs.music.volume = 0.2;
        this.musicToggleButtonClass = "mdi-volume-high";
        this.musicMuted = false;
        return;
      }
      this.$refs.music.volume = 0;
      this.musicToggleButtonClass = "mdi-volume-off";
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$store.commit("toggleDarkMode");
      this.themeToggleButtonClass = this.$vuetify.theme.dark ? "mdi-white-balance-sunny" : "mdi-moon-waxing-crescent";
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
    margin-left: 20px;
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
