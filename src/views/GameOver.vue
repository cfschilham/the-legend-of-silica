<template>
  <div>
    <Particles />
    <div class="game-over" :style="{ background: $vuetify.theme.currentTheme.background }">
      <div class="text-h5">Game over</div>
      <br />
      <v-btn @click="$router.push('/menu')" class="button">Terug naar menu</v-btn>
    </div>
  </div>
</template>

<script>
import Particles from "@/components/Particles";

export default {
  name: "GameOver",
  components: {
    Particles,
  },
};
</script>

<style scoped lang="scss">
.game-over {
  position: absolute;
  padding: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.button {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
