<template>
  <div class="game-over">
    <div class="text-h1">Game over</div>
    <v-btn @click="$router.push('/menu')" class="button">Terug naar menu</v-btn>
  </div>
</template>

<script>
export default {
  name: "GameOver",
};
</script>

<style scoped lang="scss">
.game-over {
  position: absolute;
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
