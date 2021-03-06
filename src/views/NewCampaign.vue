<template>
  <div>
    <div id="campaign-particles"></div>
    <v-form class="settings" :style="{background: $vuetify.theme.themes[theme].background}">
      <h1 class="text--primary">New Campaign</h1>
      <v-text-field
        v-model="name"
        solo
        label="Campaign name"
        clearable
        style="width: 400px"
      ></v-text-field>
      <v-slider
        v-model="difficulty"
        :max="4"
        label="Difficulty"
        class="mx-4 difficulty-slider"
        ticks
      ></v-slider>
      <div class="difficulty">
        <span v-text="labels[difficulty]"></span>
      </div>
      <v-btn color="primary">Start</v-btn>
    </v-form>
  </div>
</template>

<script>
import particlesConfig from "@/mixins/particles.config";

export default {
  name: "NewCampaign",
  data: () => {
    return {
      difficulty: 2,
      labels: [
        "Rookie",
        "Studied the night before",
        "Average",
        "Smartest kid in class",
        "Ludicrous",
      ],
      time: 0,
    };
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? "dark" : "light";
    },
  },
  mounted() {
    window.particlesJS("campaign-particles", particlesConfig);
  },
};
</script>

<style scoped lang="scss">
.settings {
  width: 400px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  .difficulty {
    text-align: center;
    margin-bottom: 30px;
  }
  .difficulty-slider {
    margin-bottom: -20px;
  }
}
#menu-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
</style>
