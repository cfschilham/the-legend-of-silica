<template>
  <div id="particles"></div>
</template>

<script>
import "particles.js/particles";
import particlesConfig from "@/mixins/particles.config";

export default {
  name: "Particles",
  mounted() {
    window.particlesJS("particles", particlesConfig);
  },
};
</script>
<style scoped lang="scss">
#particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}
</style>
