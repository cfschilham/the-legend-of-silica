<template>
  <div class="game-over">
    <div class="text-h1">Game over</div>
    <v-btn @click="$router.push('/menu')">Back to menu</v-btn>
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
</style>
