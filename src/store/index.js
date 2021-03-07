import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    musicMuted: false,
    darkMode: false,
    activeCampaign: {
      avatarName: "",
      difficulty: 0,
    },
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
    setActiveCampaign(state, campaign) {
      state.activeCampaign = campaign;
      localStorage.setItem("activeCampaign", JSON.stringify(campaign));
    },
    initialiseStore(state) {
      if (localStorage.getItem("darkMode")) {
        state.musicMuted = localStorage.getItem("musicMuted") === "true";
      }
      if (localStorage.getItem("darkMode")) {
        state.darkMode = localStorage.getItem("darkMode") === "true";
      }
      if (localStorage.getItem("activeCampaign")) {
        state.darkMode = JSON.parse(localStorage.getItem("activeCampaign"));
      }
    },
  },
  actions: {
    storeCampaignData(state) {
      localStorage.setItem("activeCampaign", JSON.stringify(state.activeCampaign));
    },
  },
  modules: {
  },
});
