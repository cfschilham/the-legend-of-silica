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
    campaign: undefined,
  },
  mutations: {
    toggleMusic(state) {
      state.musicMuted = !state.musicMuted;
    },
    setCampaign(state, campaign) {
      state.campaign = campaign;
    },
    decrementHealth(state) {
      // @ts-ignore
      if (state.campaign && typeof state.campaign.currentHealth === "number") {
        // @ts-ignore
        state.campaign.currentHealth--;
      }
    },
  },
  plugins: [persistence.plugin],
});

export default store;
