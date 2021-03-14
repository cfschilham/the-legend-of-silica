<template>
  <div>
    <v-form ref="form" v-model="valid" class="settings">
      <span class="text-h5">New campaign</span>
      <div class="grid">
        <div>
          <span class="text-overline">Character name</span>
          <v-text-field v-model="characterName" :counter="20" :rules="nameRules" label="Johnny" solo></v-text-field>
          <span class="text-overline">Difficulty: {{ labels[selectedDifficulty] }}</span>
          <v-slider v-model="selectedDifficulty" :max="4" class="mx-4 difficulty-slider" ticks></v-slider>
        </div>
        <div>
          <span class="text-overline">Class</span>
          <div class="classes">
            <div
              :class="primateClass"
              class="class primate"
              @click="
                () => {
                  this.selectedCharacterClass = 'primate';
                }
              "
            >
              <img
                v-if="selectedCharacterClass === 'primate'"
                src="@/assets/classes/primate-color.svg"
                alt="primate-selected"
              />
              <img v-else src="@/assets/classes/primate.svg" alt="primate" />
            </div>
            <div
              :class="berserkerClass"
              class="class berserker"
              @click="
                () => {
                  this.selectedCharacterClass = 'berserker';
                }
              "
            >
              <img
                v-if="selectedCharacterClass === 'berserker'"
                src="@/assets/classes/berserker-color.svg"
                alt="berserker-selected"
              />
              <img v-else src="@/assets/classes/berserker.svg" alt="berserker" />
            </div>
            <div
              :class="shamanClass"
              class="class shaman"
              @click="
                () => {
                  this.selectedCharacterClass = 'shaman';
                }
              "
            >
              <img
                v-if="selectedCharacterClass === 'shaman'"
                src="@/assets/classes/shaman-color.svg"
                alt="shaman-selected"
              />
              <img v-else src="@/assets/classes/shaman.svg" alt="shaman" />
            </div>
          </div>
          <span v-if="selectedCharacterClass === 'primate'"><strong>Primate</strong></span>
          <span v-if="selectedCharacterClass === 'berserker'"><strong>Berserker</strong></span>
          <span v-if="selectedCharacterClass === 'shaman'"><strong>Shaman</strong></span>
          <p v-if="selectedCharacterClass === 'primate'">
            The primate is the simplest class. It does not give any special perks.
          </p>
          <p v-if="selectedCharacterClass === 'berserker'">
            The berserker gets better quest rewards, but has less time and health.
          </p>
          <p v-if="selectedCharacterClass === 'shaman'">
            The shaman gets worse quest rewards, but has more health.
          </p>
        </div>
      </div>
      <div class="actions">
        <v-btn large @click="$router.push('/menu')">Back to menu</v-btn>
        <v-btn
          :disabled="!valid"
          class="submit-btn"
          color="primary"
          large
          @click="$store.state.campaign == undefined ? startCampaign() : (existingCampaignDialog = true)"
          >Start Campaign
        </v-btn>
      </div>
    </v-form>
    <v-dialog v-model="existingCampaignDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>You have an existing campaign</v-card-title>
        <v-card-text
          >If you continue, the existing campaign will be overwritten and your progress will be reset. Are you sure you
          would like to continue?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="existingCampaignDialog = false">Cancel</v-btn>
          <v-btn text @click="startCampaign">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Campaign } from "@/mixins/campaign.ts";

export default {
  name: "NewCampaign",
  data: () => {
    return {
      selectedCharacterClass: "primate",
      selectedDifficulty: 2,
      valid: false,
      nameRules: [v => !!v || "Name is required", v => v.length <= 20 || "Name must be less than 20 characters"],
      labels: ["Rookie", "Studied the night before", "Average", "Smartest kid of the class", "Ludicrous"],
      characterName: "",
      existingCampaignDialog: false,
    };
  },
  methods: {
    startCampaign() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.$store.commit(
        "setCampaign",
        new Campaign({
          characterName: this.characterName,
          characterClass: this.selectedCharacterClass,
          difficulty: this.selectedDifficulty,
          isoStartTime: new Date().toISOString(),
        }),
      );

      this.$router.push("/campaign");
    },
  },
};
</script>

<style lang="scss" scoped>
.settings {
  width: 660px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;

  .text-h5 {
    margin-bottom: 20px;
  }

  .difficulty-slider {
    margin: 0 !important;
  }

  .grid {
    display: grid;
    grid-template-columns: 310px 310px;
    column-gap: 40px;
  }

  .actions {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .v-btn {
      margin-left: 10px;
    }

    .v-btn:first-of-type {
      margin-left: 0;
    }
  }

  .classes {
    display: flex;
    justify-content: space-between;

    .class {
      width: 80px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
