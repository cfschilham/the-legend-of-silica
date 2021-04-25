<template>
  <div>
    <div>{{ $store.state.campaign.currentQuestProgress.id }}</div>
    <div>{{ remainingDuration }}</div>
  </div>
  <v-dialog v-model="campaignDataErrorDialog" persistent max-width="500px">
    <v-card>
      <v-card-title>Something went wrong</v-card-title>
      <v-card-text>
        An error occurred while restoring the progress of your previous campaign. This could have been caused by a bug
        or by data corruption.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$router.push('/menu')" text>Back to menu</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getQuest } from "@/mixins/quest/quest.ts";

export default {
  name: "Quest",
  data() {
    return {
      quest: undefined,
      startTime: undefined,
      remainingDuration: undefined,
      remainingDurationPolling: undefined,
      campaignDataErrorDialog: false,
    };
  },
  created() {
    if (this.$store.state.campaign.currentQuestProgress.id === "") {
      this.$router.push("/campaign");
    }
    if (typeof this.$store.state.campaign.currentQuestProgress.startTime !== "object") {
      this.$router.push("/campaign");
    }
    this.quest = getQuest(this.$store.state.campaign.currentQuestProgress.id);
    this.startTime = this.$store.state.campaign.currentQuestProgress.startTime;

    this.remainingDurationPolling = setInterval(() => {
      this.remainingDuration = Math.floor(
        (this.quest.duration - (new Date().getTime() - this.startTime.getTime())) / 1000,
      );
      if (this.remainingDuration <= 0) {
        this.$store.commit("decrementHealth");
        this.$router.push("/campaign");
      }
    }, 100);
  },
  beforeDestroy() {
    clearInterval(this.remainingDurationPolling);
  },
};
</script>

<style scoped></style>
