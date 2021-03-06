<template>
  <v-container>
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
  </v-container>
</template>

<script>
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
    window.particlesJS("campaign-particles", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#9e2a2b",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 3,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.3,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "top",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 1000,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: false,
            mode: "bubble",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 539.4605394605394,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
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
  justify-content: center;
  flex-direction: column;
  background-color: var(--v-primary-base);
  .difficulty {
    text-align: center;
    margin-bottom: 30px;
  }
  .difficulty-slider {
    margin-bottom: -20px;
  }
}
</style>
