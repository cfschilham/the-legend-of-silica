import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { Campaign } from "@/mixins/campaign";

Vue.use(Vuex);

const persistence = new VuexPersistence({
  storage: localStorage,
});

const store = new Vuex.Store({
  state: {
    musicMuted: false,
    theme: "light",
    campaign: undefined,
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
    },
    toggleMusic(state) {
      state.musicMuted = !state.musicMuted;
    },
    setCampaign(state, campaign) {
      state.campaign = campaign;
    },
  },
  plugins: [
    persistence.plugin,
  ],
});

export default store;
