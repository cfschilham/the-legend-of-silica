<template>
  <div class="game-completed">
    <div class="text-h1">Gefeliciteerd je hebt The Legend of Silica uitgespeeld!</div>
    <v-btn @click="$router.push('/menu')">Terug naar menu</v-btn>
  </div>
</template>

<script>
import { quests } from "@/mixins/quest/quest.ts";

export default {
  name: "GameCompleted",
  created() {
    if (this.$store.state.campaign.completedQuestIds.length !== quests.length) {
      this.$router.push("/menu");
    }
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
</style>
