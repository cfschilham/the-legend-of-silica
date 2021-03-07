import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    musicMuted: true,
    darkMode: false,
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode);
    },
    toggleMusic(state) {
      state.musicMuted = !state.musicMuted;
      localStorage.setItem("musicMuted", state.musicMuted);
    },
    initialiseStore(state) {
      if (localStorage.getItem("darkMode")) {
        state.musicMuted = localStorage.getItem("musicMuted") === "true";
      }
      if (localStorage.getItem("darkMode")) {
        state.darkMode = localStorage.getItem("darkMode") === "true";
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
