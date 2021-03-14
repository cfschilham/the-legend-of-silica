<template>
  <div id="quests">
    <v-row no-gutters>
      <v-col v-for="quest in quests" :key="quest.id">
        <v-card max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ quest.title }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ quest.details }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn :disabled="!quest.canPlay()" color="primary">Play</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Quests",
  data: () => {
    return {
      quests: [
        {
          id: 0,
          title: "Test Quest 1",
          details: "Test quest 1 details",
          canPlay: () => {
            return true;
          }, // check inventory for prerequisites in the future
          cantPlayReason: () => {
            return "";
          }, // give reason why you can't play the quest
        },
        {
          id: 1,
          title: "Test Quest 2",
          details: "Test quest 2 details",
          canPlay: () => {
            return false;
          },
          cantPlayReason: () => {
            return "No axe in inventory";
          }, // give reason why you can't play the quest
        },
        {
          id: 2,
          title: "Test Quest 2",
          details: "Test quest 2 details",
          canPlay: () => {
            return false;
          },
          cantPlayReason: () => {
            return "No axe in inventory";
          }, // give reason why you can't play the quest
        },
        {
          id: 3,
          title: "Test Quest 2",
          details: "Test quest 2 details",
          canPlay: () => {
            return false;
          },
          cantPlayReason: () => {
            return "No axe in inventory";
          }, // give reason why you can't play the quest
        },
        {
          id: 4,
          title: "Test Quest 2",
          details: "Test quest 2 details",
          canPlay: () => {
            return false;
          },
          cantPlayReason: () => {
            return "No axe in inventory";
          }, // give reason why you can't play the quest
        },
        {
          id: 5,
          title: "Test Quest 2",
          details: "Test quest 2 details",
          canPlay: () => {
            return false;
          },
          cantPlayReason: () => {
            return "No axe in inventory";
          }, // give reason why you can't play the quest
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
#quests {
  position: absolute;
  margin-left: 256px;
}
</style>
