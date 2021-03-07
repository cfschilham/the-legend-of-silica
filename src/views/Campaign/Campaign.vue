<template>
    <div class="character-menu">
      <v-navigation-drawer absolute permanent>
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img
                src="https://img.shirtcity.com/design/superzoom/315x315/31/0/151063_0.png"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{
                $store.state.activeCampaign.avatarName
              }}</v-list-item-title>
              <v-list-item-subtitle>Level: 1</v-list-item-subtitle>
              <v-progress-linear :value="xpBarPercentage" height="25">
                <strong>XP: {{ currentxp }}/{{ goalxp }}</strong>
              </v-progress-linear>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item @click="navigateQuests">
            <v-list-item-icon>
              <v-icon>mdi-compass</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Quests</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="navigateInventory">
            <v-list-item-icon>
              <v-icon>mdi-treasure-chest</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Inventory</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn @click="$router.push(`/menu`)" block>Return to menu</v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <div :is="currentComponent"></div>
    </div>
</template>

<script>
import inventory from "@/components/Inventory.vue";
import quests from "@/components/Quests.vue";

export default {
  name: "Campaign",
  data: () => {
    return {
      currentxp: 70,
      goalxp: 140,
      currentComponent: quests,
    };
  },
  computed: {
    xpBarPercentage() {
      return (this.currentxp / this.goalxp) * 100;
    },
  },
  methods: {
    navigateQuests() {
      this.currentComponent = quests;
    },
    navigateInventory() {
      this.currentComponent = inventory;
    },
  },
};
</script>

<style scoped lang="scss">
.character-menu {
  height: 100%;
  width: 256px;
}
</style>
