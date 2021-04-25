<template>
  <div>
    <div>{{ $store.state.campaign.currentQuestProgress.id }}</div>
    <div>{{ remainingDuration }}</div>
  </div>
</template>

<script>
import { getQuest } from "@/mixins/quest/quest.ts";

export default {
  name: "Quest",
  data() {
    return {
      campaign: undefined,
      quest: undefined,
      startTime: undefined,
      remainingDuration: undefined,
      remainingDurationPolling: undefined,
    };
  },
  created() {
    if (this.$store.state.campaign.currentQuestProgress.id === "") {
      this.$router.push("/campaign");
    }
    if (!this.$store.state.campaign.validate) {
      this.$router.push("/campaign");
    }
    this.campaign = this.$store.state.campaign;
    this.quest = getQuest(this.$store.state.campaign.currentQuestProgress.id);
    this.startTime = this.$store.state.campaign.currentQuestProgress.startTime;
    let durationWithModifiers = this.quest.duration * 0.9 ** this.campaign.difficulty;
    if (this.campaign.characterClass === "berserker") {
      durationWithModifiers *= 0.7;
    }

    this.remainingDurationPolling = setInterval(() => {
      this.remainingDuration = Math.floor(
        (durationWithModifiers - (new Date().getTime() - this.startTime.getTime())) / 1000,
      );
      if (this.remainingDuration <= 0) {
        this.$store.commit("decrementHealth");
        this.campaign.currentQuestProgress = { id: "", startTime: new Date(0) };
        this.$router.push("/campaign");
      }
    }, 100);
  },
  beforeDestroy() {
    clearInterval(this.remainingDurationPolling);
  },
  watch: {
    campaign: {
      handler() {
        this.$store.commit("setCampaign", this.campaign);
      },
      deep: true,
    },
  },
};
</script>

<style scoped></style>
