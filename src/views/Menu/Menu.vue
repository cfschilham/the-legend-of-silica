<template>
  <div>
    <div id="particles"></div>
    <div class="menu">
      <img src="@/assets/logo.svg" alt="logo" class="menu__logo">
      <v-btn
        class="menu__item"
        color="primary"
        large
        @click="$router.push(`/campaign/new`)"
      >New Campaign</v-btn>
      <v-btn
        class="menu__item"
        large
      >Load Campaign</v-btn>
      <v-btn
        class="menu__item"
        large
      >Settings</v-btn>
      <v-btn
        class="menu__item"
        large
        @click="openRepository"
      >Repository</v-btn>
    </div>
    <div class="footer text-caption">
      Copyright © 2021. All rights reserved. Design and implementation by <a href="https://github.com/BenStokmans" target="_blank">B. Stokmans</a> and
      <a href="https://github.com/cfschilham" target="_blank">C.F. Schilham</a>.
    </div>
  </div>
</template>

<script>
import "../../../node_modules/particles.js/particles";

export default {
  name: "Menu",
  methods: {
    openRepository() {
      window.open("https://github.com/cfschilham/the-legend-of-silica", "_blank");
    },
  },
  mounted() {
    window.particlesJS("particles", {
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
.menu {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 40px;
  width: 400px;
  &__logo {
    margin-bottom: 50px;
  }
  &__item:not(&__item:nth-of-type(1)) {
    margin-top: 20px;
  }
}
.footer {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  background-color: #ffffff;
}
#particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
</style>
