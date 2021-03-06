import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#9E2A2B", // #E53935
        secondary: "#CC3E40", // #FFCDD2
        accent: "#E09F3E", // #3F51B5
        background: "#FFFFFF",
      },
      dark: {
        primary: "#9E2A2B", // #E53935
        secondary: "#CC3E40", // #FFCDD2
        accent: "#E09F3E", // #3F51B5
        background: "#121212",
      },
    },
  },
});
