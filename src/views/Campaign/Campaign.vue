<template>
  <div>
    <div v-if="campaign" class="campaign">
      <v-navigation-drawer permanent :style="{ background: $vuetify.theme.currentTheme.background }">
        <v-list-item>
          <v-list-item-content>
            <div class="character-information">
              <div>
                <div class="name text-subtitle-2">
                  {{ campaign.characterName }}
                </div>
                <div class="name text-caption" v-html="campaign.balanceFormatHTML()"></div>
                <div class="health">
                  <div v-for="i in campaign.totalHealth" :key="i" class="heart">
                    <img v-if="campaign.currentHealth >= i" src="@/assets/heart-color.svg" alt="heart" />
                    <img v-else src="@/assets/heart.svg" style="opacity: 35%" alt="no heart" />
                  </div>
                </div>
              </div>
              <img
                class="class-icon"
                v-if="campaign.characterClass === 'primate'"
                src="@/assets/classes/primate.svg"
                alt="primate"
              />
              <img
                class="class-icon"
                v-if="campaign.characterClass === 'berserker'"
                src="@/assets/classes/berserker.svg"
                alt="berserker"
              />
              <img
                class="class-icon"
                v-if="campaign.characterClass === 'shaman'"
                src="@/assets/classes/shaman.svg"
                alt="shaman"
              />
            </div>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item>
          <v-list-item-content>
            <div class="text-overline">Inventory</div>
            <div v-if="campaign.inventory.getItems().length === 0" class="text-caption text--secondary">
              Your inventory is empty
            </div>
            <div class="inventory">
              <v-menu
                v-for="(inventoryItem, index) in campaign.inventory.getItems()"
                :key="index"
                offset-y
                open-on-hover
              >
                <template v-slot:activator="{ on, attrs }">
                  <div @click="getItem(inventoryItem.id).emit(campaign)" class="item" v-on="on" v-bind="attrs">
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
                  <v-divider></v-divider>
                  <v-card-subtitle v-if="getItem(inventoryItem.id).use !== undefined">Click to use</v-card-subtitle>
                </v-card>
              </v-menu>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="back-to-menu">
          <v-list-item-content>
            <v-btn @click="$router.push('/menu')">
              Back to menu
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-navigation-drawer>
      <div class="main">
        <div class="quests">
          <div class="text-h5 title">Quests</div>
          <div class="quest-cards">
            <v-card
              :disabled="!quest.fulfillsPrerequisites(campaign)"
              class="quest"
              v-for="(quest, index) in quests"
              :key="index"
            >
              <v-card-title>
                <span>{{ quest.title }}</span>
                <i class="mdi mdi-lock" v-if="!quest.fulfillsPrerequisites(campaign)"></i>
              </v-card-title>
              <v-card-subtitle>Multiple choice</v-card-subtitle>
              <v-card-text>
                <p v-if="!quest.prerequisites.length">No prerequisites</p>
                <span v-else class="text--primary"><strong>Prerequisites</strong></span>
                <div v-for="(prerequisite, index) in quest.prerequisites" class="prerequisite" :key="index">
                  <i v-if="prerequisite.isFulfilled()" class="mdi mdi-check success--text"></i>
                  <i v-else class="mdi mdi-close error--text"></i>
                  <span class="text--primary">{{ prerequisite.title }}</span>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn text>Start</v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>
        <div class="shop">
          <div class="text-h5 title">Shop</div>
          <div class="item-cards">
            <div class="item" v-for="(item, index) in shopItems" :key="index">
              <img :src="item.icon" />
              <div class="name">
                <strong>{{ item.name }}</strong>
              </div>
              <div class="value text--secondary text-caption">
                Buy: {{ item.buyValue !== -1 ? item.buyValue : "N/A" }} Sell:
                {{ item.sellValue !== -1 ? item.sellValue : "N/A" }}
              </div>
              <div class="description text--secondary">{{ item.description }}</div>
              <div class="actions">
                <v-btn
                  text
                  @click="sell(item.id)"
                  :disabled="item.sellValue === -1 || !campaign.inventory.hasItem(item.id)"
                  >Sell</v-btn
                >
                <v-btn text @click="buy(item.id)" :disabled="item.buyValue === -1 || campaign.balance < item.buyValue"
                  >Buy</v-btn
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-dialog v-model="didNotFindCampaignDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Couldn't find your campaign</v-card-title>
        <v-card-text>
          This could be due to an error or because you attempted to access this endpoint directly.
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
import { Inventory, getItem, items } from "@/mixins/inventory";
import { quests } from "@/mixins/quest/quest.ts";

export default {
  name: "Campaign",
  data: () => {
    return {
      campaign: undefined,
      didNotFindCampaignDialog: false,
      invalidCampaignDialog: false,
      quests: quests,
      getItem: getItem,
    };
  },
  computed: {
    characterClassIconFill() {
      return this.$vuetify.theme.dark ? "#ffffff" : "#000000";
    },
    shopItems() {
      const result = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].secret) {
          continue;
        }
        if (items[i].buyValue === -1 && items[i].sellValue === -1) {
          continue;
        }
        result.push(items[i]);
      }
      return result;
    },
  },
  methods: {
    buy(id) {
      if (getItem(id).buyValue === -1 || getItem(id).buyValue > this.campaign.balance) {
        return;
      }
      this.campaign.inventory.increment(id);
      this.campaign.balance -= getItem(id).buyValue;
    },
    sell(id) {
      if (!this.campaign.inventory.hasItem(id)) {
        return;
      }
      this.campaign.inventory.decrement(id);
      this.campaign.balance += getItem(id).sellValue;
    },
  },
  created() {
    if (!this.$store.state.campaign) {
      this.didNotFindCampaignDialog = true;
      return;
    }

    // Load campaign from an untyped JavaScript object.
    const rawCampaign = Object.assign({}, this.$store.state.campaign);
    rawCampaign.inventory = new Inventory(this.$store.state.campaign.inventory);
    this.campaign = new Campaign(rawCampaign);
    if (!this.campaign.validate()) {
      this.invalidCampaignDialog = true;
      return;
    }
    this.$nextTick(() => {
      document.title = `${this.campaign.characterName} | Campaign - The Legend of Silica`;
    });
    window.frikandelbroodje = amount => {
      this.campaign.inventory.add("0", amount);
    };
  },
  watch: {
    campaign: {
      handler() {
        if (this.campaign.currentHealth === 0) {
          this.$router.push("/game-over");
          this.$store.commit("setCampaign", undefined);
          return;
        }
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
  display: grid;
  grid-template-columns: 256px auto;

  .main {
    box-sizing: border-box;
    padding: 24px;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    display: grid;
    grid-template-columns: calc(50% - 30px) calc(50% - 30px);
    grid-column-gap: 60px;

    .quests {
      .title {
        margin-bottom: 16px;
      }
      .quest-cards {
        grid-template-columns: auto auto;
        display: grid;
        grid-column-gap: 20px;
        .quest {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          &:last-of-type {
            margin-bottom: 0;
          }
          .mdi-lock {
            margin-left: 6px;
          }
          .mdi-check,
          .mdi-close {
            margin-right: 4px;
          }
          .v-card__actions {
            margin-top: auto;
          }
        }
      }
    }

    .shop {
      .title {
        margin-bottom: 16px;
      }
      .item-cards {
        display: grid;
        grid-template-columns: calc(33.33% - 13.33px) calc(33.33% - 13.33px) calc(33.33% - 13.33px);
        grid-column-gap: 20px;
        grid-row-gap: 40px;
        .item {
          img {
            width: 50%;
            margin: 0 auto 20px auto;
            display: block;
          }
          .actions {
            margin-top: 4px;
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }

  .v-navigation-drawer {
    user-select: none;
  }

  .character-information {
    display: grid;
    grid-template-columns: auto 42px;
    grid-column-gap: 16px;

    img.class-icon {
      height: 42px;
    }
    .health {
      margin-top: 5px;
      display: flex;
      .heart {
        width: 14px;
        margin-right: 1px;
      }
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

  .back-to-menu {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}

@media screen and (max-width: 1640px) {
  .campaign {
    .main {
      .quests {
        .quest-cards {
          grid-template-columns: auto;
        }
      }
      .shop {
        .item-cards {
          grid-template-columns: calc(50% - 10px) calc(50% - 10px);
        }
      }
    }
  }
}

@media screen and (max-width: 1160px) {
  .campaign {
    .main {
      grid-template-columns: calc(60% - 30px) calc(40% - 30px);
      .shop {
        .item-cards {
          grid-template-columns: auto;
        }
      }
    }
  }
}
</style>
