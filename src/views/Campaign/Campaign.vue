<template>
  <v-card class="character-menu">
    <v-navigation-drawer
      absolute
      permanent
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://img.shirtcity.com/design/superzoom/315x315/31/0/151063_0.png">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ $store.state.activeCampaign.avatarName }}</v-list-item-title>
            <v-list-item-subtitle>Level: 1</v-list-item-subtitle>
            <v-progress-linear
              v-model="xpBarPercentage"
              height="25"
            >
              <strong>XP: {{ currentxp }}/{{ goalxp }}</strong>
            </v-progress-linear>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-compass</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Quests</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
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
          <v-btn @click="$router.push(`/menu`)" block>
            Return to menu
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "Campaign",
  data: () => {
    return {
      currentxp: 70,
      goalxp: 140,
    };
  },
  computed: {
    xpBarPercentage() {
      return (this.currentxp / this.goalxp * 100);
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
