<template>
  <div class="campaign">
    <v-navigation-drawer permanent :style="{ background: $vuetify.theme.currentTheme.background }">
      <v-list-item>
        <v-list-item-content>
          <div class="character-information">
            <img
              v-if="campaign ? campaign.characterClass === 'primate' : undefined"
              src="@/assets/classes/primate.svg"
              alt="primate"
            />
            <img
              v-if="campaign ? campaign.characterClass === 'berserker' : undefined"
              src="@/assets/classes/berserker.svg"
              alt="berserker"
            />
            <img
              v-if="campaign ? campaign.characterClass === 'shaman' : undefined"
              src="@/assets/classes/shaman.svg"
              alt="shaman"
            />
            <div>
              <div class="name text-subtitle-2">
                {{ campaign ? campaign.characterName : undefined }}
              </div>
              <div class="name text-caption">
                {{ campaign ? balanceFormatter.format(campaign.balance) : undefined }}
                mol SiO<sub>2</sub>
              </div>
            </div>
          </div>
          <div class="health">
            <div v-for="i in campaign.totalHealth" :key="i" class="heart">
              <img v-if="campaign.currentHealth >= i" src="@/assets/heart-color.svg" alt="heart" />
              <img v-else src="@/assets/heart.svg" alt="no heart" />
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <div class="text-overline">Inventory</div>
          <div
            v-if="campaign ? campaign.inventory.getItems().length === 0 : undefined"
            class="text-caption text--secondary"
          >
            Your inventory is empty
          </div>
          <div class="inventory" v-if="campaign">
            <v-menu v-for="(inventoryItem, index) in campaign.inventory.getItems()" :key="index" offset-y open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <div class="item" v-on="on" v-bind="attrs">
                  <img :src="getItem(inventoryItem.id).icon" />
                  <div
                    class="amount text-caption"
                    :style="{
                      background: $vuetify.theme.currentTheme.background,
                    }"
                  >
                    {{ inventoryItem.amount }}
                  </div>
                </div>
              </template>
              <v-card max-width="300px">
                <v-card-title>{{ getItem(inventoryItem.id).name }} ({{ inventoryItem.amount }})</v-card-title>
                <v-card-subtitle>{{ getItem(inventoryItem.id).description }}</v-card-subtitle>
              </v-card>
            </v-menu>
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-btn class="back-to-menu-btn" @click="$router.push('/menu')">
        Back to menu
      </v-btn>
    </v-navigation-drawer>

    <v-dialog v-model="didNotFindCampaignDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Couldn't find your campaign</v-card-title>
        <v-card-subtitle>Sell value: </v-card-subtitle>
        <v-card-text>
          This could be due to an error or because you attempted to access this endpoint directly
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$router.push('/menu')" text>Back to menu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="invalidCampaignDialog" persistent max-width="500px">
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
  </div>
</template>

<script>
import { Campaign } from "@/mixins/campaign";
import { Inventory, getItem } from "@/mixins/inventory";

export default {
  name: "Campaign",
  data: () => {
    return {
      campaign: undefined,
      didNotFindCampaignDialog: false,
      invalidCampaignDialog: false,
      getItem: getItem,
      balanceFormatter: new Intl.NumberFormat("en", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    };
  },
  computed: {
    characterClassIconFill() {
      return this.$vuetify.theme.dark ? "#ffffff" : "#000000";
    },
  },
  created() {
    window.frikandelbroodje = amount => {
      this.campaign.inventory.add("0", amount);
    };

    if (!this.$store.state.campaign) {
      this.didNotFindCampaignDialog = true;
      return;
    }

    if (!this.$store.state.campaign.inventory) {
      this.invalidCampaignDialog = true;
      return;
    }

    const rawCampaign = Object.assign({}, this.$store.state.campaign);
    rawCampaign.inventory = new Inventory(this.$store.state.campaign.inventory);
    console.log(rawCampaign);
    this.campaign = new Campaign(rawCampaign);
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

<style scoped lang="scss">
.campaign {
  height: 100vh;

  .logo {
    margin: 10%;
    text-align: center;
    width: 80% !important;
  }

  .v-navigation-drawer {
    user-select: none;
  }

  .character-information {
    display: grid;
    grid-template-columns: 42px auto;
    grid-column-gap: 10px;

    img {
      height: 42px;
    }
  }

  .inventory {
    display: grid;
    grid-template-columns: 22% 22% 22% 22%;
    grid-column-gap: 4%;
    .item {
      position: relative;
      &:hover {
        cursor: pointer;
      }
      img {
        width: 100%;
      }
      .amount {
        position: absolute;
        right: -6px;
        bottom: -1px;
        padding: 1px 6px;
        border-radius: 25%;
        font-weight: 500;
      }
    }
  }

  .health {
    display: flex;
    justify-content: center;
    margin-top: 6px;
    .heart {
      width: 14px;
      margin: 0 1px;
    }
  }

  .back-to-menu-btn {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
