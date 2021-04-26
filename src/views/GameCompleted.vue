<template>
  <div>
    <Particles />
    <div class="game-completed">
      <img :src="require('@/assets/trophy-cup.svg')" width="300" height="300" />
      <div class="text-h5">Gefeliciteerd, u heeft The Legend of Silica uitgespeeld!</div>
      <br />
      <v-btn @click="$router.push('/menu')" class="button">Terug naar menu</v-btn>
    </div>
  </div>
</template>

<script>
import Particles from "@/components/Particles";

export default {
  name: "GameCompleted",
  components: {
    Particles,
  },
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
  justify-content: center;
}
.button {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
img {
  margin: 0 auto 100px auto;
  display: block;
}
</style>
