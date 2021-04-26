<template>
  <div class="game-completed">
    <div class="text-h5">Gefeliciteerd, u heeft The Legend of Silica uitgespeeld!</div>
    <v-btn @click="$router.push('/menu')" class="button">Terug naar menu</v-btn>
  </div>
</template>

<script>
export default {
  name: "GameCompleted",
  created() {
    this.$store.commit("setCampaign", undefined);
  },
};
</script>

<style scoped lang="scss">
.game-completed {
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
