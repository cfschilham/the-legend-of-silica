<template>
  <div>
    <div v-if="campaign" class="quest">
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
            <div class="character-information">
              <div>
                <div class="name text-subtitle-2">Tijd resterend: {{ formatDuration(remainingDuration) }}</div>
              </div>
            </div>
          </v-list-item-content>
        </v-list-item>

        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <div class="text-overline">Inventaris</div>
            <div v-if="campaign.inventory.getItems().length === 0" class="text-caption text--secondary">
              Uw inventaris is leeg
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
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="use(inventoryItem.id)" text :disabled="!getItem(inventoryItem.id).canUse(campaign)"
                      >Gebruiken</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-menu>
            </div>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="end-quest">
          <v-list-item-content>
            <v-btn @click="confirmEndQuestDialog = true">
              Quest beëindigen
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-navigation-drawer>
      <div class="quest-content">
        <div class="text-h5 title">{{ quest.title }}</div>
        <div class="text-body-1 question">{{ quest.question }}</div>
        <v-radio-group v-model="selected" v-if="quest.type === 'multi'">
          <v-radio v-for="(item, index) in quest.options" :key="index" :label="item" :value="item"></v-radio>
        </v-radio-group>
        <div v-if="quest.type === 'open'">
          <div class="text-body-1 text--secondary elaboration">{{ quest.elaboration }}</div>
          <v-textarea
            v-model="answerText"
            :disabled="submitted"
            solo
            name="input-7-4"
            label="Typ hier uw antwoord..."
            class="textarea"
          ></v-textarea>
        </div>
        <v-flex v-if="quest.image !== undefined" xs12 sm6 offset-sm3 style="margin-left: 50%">
          <v-card>
            <v-img :src="quest.image" aspect-ratio="2.75" />
          </v-card>
        </v-flex>
        <v-btn :disabled="!canSubmit()" class="submit-btn" color="primary" @click="submit">Doorgaan</v-btn>
      </div>
    </div>
    <v-dialog v-model="incorrectAnswerDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Helaas, dat was niet het juiste antwoord</v-card-title>
        <v-card-text>U bent één leven verloren. Het juiste antwoord was: {{ quest.answer }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$router.push('/campaign')" text>Quest beëindigen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="correctAnswerDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Correct!</v-card-title>
        <v-card-text>
          Uw antwoord was correct. U heeft een beloning van
          {{ balanceNumberFormatter.format(quest.finalReward(campaign)) }}
          <span v-html="currencyHTML"></span> ontvangen.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$router.push('/campaign')" text>Quest beëindigen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="selfGradeDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Antwoord nakijken</v-card-title>
        <v-card-text>
          <div><strong>Uw antwoord</strong></div>
          <div>{{ answerText }}</div>
          <br />
          <div><strong>Juiste antwoord</strong></div>
          <div>{{ quest.answer }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="
              () => {
                failQuest();
                $router.push('/campaign');
              }
            "
            text
            >Onjuist</v-btn
          >
          <v-btn
            @click="
              () => {
                completeQuest();
                $router.push('/campaign');
              }
            "
            text
            >Juist</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmEndQuestDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Weet u het zeker?</v-card-title>
        <v-card-text>Als u de quest nu beëindigt, verliest u een leven.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="confirmEndQuestDialog = false" text>Annuleren</v-btn>
          <v-btn
            @click="
              () => {
                failQuest();
                $router.push('/campaign');
              }
            "
            text
            >Beëindigen</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="outOfTimeDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>De tijd is op!</v-card-title>
        <v-card-text
          >U bent één leven verloren omdat u niet op tijd heeft geantwoord. Het juiste antwoord was: {{ quest.answer }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$router.push('/campaign')" text>Quest beëindigen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Quest, getQuest } from "@/mixins/quest.ts";
import { Campaign } from "@/mixins/campaign";
import { getItem } from "@/mixins/inventory";

export default {
  name: "Quest",
  data() {
    return {
      campaign: undefined,
      quest: undefined,
      startTime: undefined,
      remainingDuration: undefined,
      remainingDurationPolling: undefined,
      getItem: getItem,
      formatDuration: Quest.formatDuration,
      balanceNumberFormatter: Campaign.balanceNumberFormatter,
      currencyHTML: Campaign.currencyHTML,
      selected: undefined,
      submitted: false,
      answerText: "",
      correctAnswerDialog: false,
      incorrectAnswerDialog: false,
      selfGradeDialog: false,
      confirmEndQuestDialog: false,
      outOfTimeDialog: false,
    };
  },
  methods: {
    completeQuest() {
      this.campaign.balance += this.quest.finalReward(this.campaign);
      this.campaign.completedQuestIds.push(this.quest.id);
      this.campaign.currentQuestProgress = { id: "", startTime: new Date(0) };
      clearInterval(this.remainingDurationPolling);
    },
    failQuest() {
      this.campaign.currentHealth--;
      this.campaign.currentQuestProgress = { id: "", startTime: new Date(0) };
      clearInterval(this.remainingDurationPolling);
    },
    canSubmit() {
      if (this.submitted) {
        return false;
      }

      // eslint-disable-next-line eqeqeq
      if (this.quest.type === "multi" && this.selected != undefined) {
        return true;
      }
      return this.quest.type === "open" && this.answerText.length > 0;
    },
    submit() {
      this.submitted = true;
      if (this.quest.type === "multi") {
        if (this.selected === this.quest.answer) {
          this.correctAnswerDialog = true;
          this.completeQuest();
          return;
        }
        this.incorrectAnswerDialog = true;
        this.failQuest();
        return;
      }

      if (this.quest.selfGraded) {
        clearInterval(this.remainingDurationPolling);
        this.selfGradeDialog = true;
        return;
      }
      if (this.answerText === this.quest.answer) {
        this.correctAnswerDialog = true;
        this.completeQuest();
        return;
      }
      this.incorrectAnswerDialog = true;
      this.failQuest();
    },
    use(id) {
      if (!this.campaign.inventory.hasItem(id)) {
        return;
      }
      this.campaign.inventory.decrement(id);
      getItem(id).use(this.campaign);
    },
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

    const finalDuration = this.quest.finalDuration(this.campaign);
    this.remainingDurationPolling = setInterval(() => {
      this.remainingDuration = Math.floor(finalDuration - (new Date().getTime() - this.startTime.getTime()));
      if (this.remainingDuration <= 0) {
        clearInterval(this.remainingDurationPolling);
        this.failQuest();
        this.outOfTimeDialog = true;
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

<style scoped lang="scss">
.quest {
  height: 100vh;
  display: grid;
  grid-template-columns: 256px auto;

  .quest-content {
    box-sizing: border-box;
    padding: 24px;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .title {
      margin-bottom: 16px;
    }
    .textarea {
      margin-top: 16px;
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

  .end-quest {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
