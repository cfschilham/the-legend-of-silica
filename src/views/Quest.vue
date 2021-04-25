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
                <div class="name text-subtitle-2">Time left: {{ getFormattedTime() }}</div>
              </div>
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
        <v-list-item class="end-quest">
          <v-list-item-content>
            <v-btn @click="endQuest">
              End Quest
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-navigation-drawer>
      <div class="quest-content">
        <div class="text-h5 title">
          {{ quest.title }}
          <br />
          <v-divider></v-divider>
          <br />
          <div class="text-body-2 question">{{ quest.question }}</div>
          <div v-if="quest.type === 'multi'">
            <v-checkbox
              v-for="(item, index) in quest.options"
              :key="index"
              :label="item"
              :value="item"
              :color="submitted ? (quest.answer === item ? 'green' : 'primary') : 'primary'"
              v-model="selected"
              @change="onCheckBoxChange"
            >
            </v-checkbox>
          </div>
          <div v-if="quest.type === 'open'">
            <br />
            <div class="text-body-2">{{ quest.elaboration }}</div>
            <br />
            <v-textarea
              v-model="answerText"
              :disabled="submitted"
              solo
              name="input-7-4"
              label="Type your answer here..."
            ></v-textarea>
          </div>
        </div>
        <v-btn :disabled="!canSubmit()" class="submit-btn" color="primary" large @click="submit">Submit</v-btn>
        <div v-if="submitted" class="text-body-2 feedback">
          {{ feedback }}
        </div>
        <div v-if="quest.type === 'open'">
          <v-btn
            v-if="submitted && !quest.selfGraded"
            class="submit-btn"
            color="primary"
            large
            @click="finish(answerCorrect())"
            >Continue</v-btn
          >
          <v-btn v-if="submitted && quest.selfGraded" class="submit-btn" color="primary" large @click="finish(true)"
            >Yes</v-btn
          >
          <v-btn v-if="submitted && quest.selfGraded" class="submit-btn" color="primary" large @click="finish(false)"
            >No</v-btn
          >
        </div>
        <v-btn
          v-if="submitted && quest.type === 'multi'"
          class="submit-btn"
          color="primary"
          @click="finish(answerCorrect())"
          large
          >Continue</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getQuest } from "@/mixins/quest/quest.ts";
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
      selected: [],
      submittedSelection: [],
      submitted: false,
      answerText: "",
      feedback: "",
    };
  },
  methods: {
    endQuest() {
      this.campaign.currentQuestProgress.id = "";
      this.$router.push("/campaign");
    },
    getFormattedTime() {
      const minutes = Math.floor(this.remainingDuration / 60);
      const seconds = this.remainingDuration - minutes * 60;
      if (seconds > 9) {
        return minutes + ":" + seconds;
      }
      return minutes + ":0" + seconds;
    },
    onCheckBoxChange() {
      if (this.submitted) {
        this.selected = this.submittedSelection;
        console.log(this.selected);
      }
      if (this.selected.length <= 1) {
        return;
      }
      this.selected = [this.selected[this.selected.length - 1]];
    },
    canSubmit() {
      if (this.submitted) {
        return false;
      }

      if (this.quest.type === "multi" && this.selected.length > 0) {
        return true;
      }
      return this.quest.type === "open" && this.answerText.length > 0;
    },
    submit() {
      this.submitted = true;
      if (this.quest.type === "multi") {
        if (this.selected[0] === this.quest.answer) {
          this.feedback = "Your answer was correct!";
          return;
        }
        this.feedback = "Your answer was incorrect!";
        this.selected.push(this.quest.answer);
        console.log(this.selected);
        this.submittedSelection = this.selected;
        return;
      }

      if (this.quest.selfGraded) {
        this.feedback = `The correct answer was: "${this.quest.answer}" was you answer correct?`;
        return;
      }
      if (this.answerText === this.quest.answer) {
        this.feedback = "Your answer was correct!";
        return;
      }
      this.feedback = "Your answer was incorrect!";
    },
    answerCorrect() {
      if (this.quest.type === "multi") {
        return this.selected[0] === this.quest.answer;
      }

      return this.answerText === this.quest.answer;
    },
    finish(correct) {
      if (!correct) {
        return this.endQuest();
      }

      this.campaign.completedQuestIds.push(this.quest.id);
      this.endQuest();
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
    display: grid;

    .question {
      font-size: 16px !important;
    }
    .feedback {
      font-size: 20px !important;
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

  .submit-btn {
    width: 10rem;
    margin: 20px;
  }
}
</style>
