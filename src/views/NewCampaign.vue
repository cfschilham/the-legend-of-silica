<template>
  <div>
    <v-form ref="form" v-model="valid" class="settings">
      <span class="text-h5">New campagne</span>
      <div class="grid">
        <div>
          <span class="text-overline">Character naam</span>
          <v-text-field v-model="characterName" :counter="20" :rules="nameRules" label="John" solo></v-text-field>
          <span class="text-overline">Moeilijkheid: {{ labels[selectedDifficulty] }}</span>
          <v-slider v-model="selectedDifficulty" :max="4" class="mx-4 difficulty-slider" ticks></v-slider>
        </div>
        <div>
          <span class="text-overline">Soort</span>
          <div class="classes">
            <div
              class="class shaman"
              @click="
                () => {
                  this.selectedCharacterClass = 'shaman';
                }
              "
            >
              <img
                :style="{ display: selectedCharacterClass === 'shaman' ? undefined : 'none' }"
                src="@/assets/classes/shaman-color.svg"
                alt="shaman-selected"
              />
              <img
                :style="{ display: selectedCharacterClass === 'shaman' ? 'none' : undefined }"
                src="@/assets/classes/shaman.svg"
                alt="shaman"
                style="opacity: 50%"
              />
            </div>
            <div
              class="class primate"
              @click="
                () => {
                  this.selectedCharacterClass = 'primate';
                }
              "
            >
              <img
                src="@/assets/classes/primate-color.svg"
                alt="primate-selected"
                :style="{ display: selectedCharacterClass === 'primate' ? undefined : 'none' }"
              />
              <img
                :style="{ display: selectedCharacterClass === 'primate' ? 'none' : undefined }"
                src="@/assets/classes/primate.svg"
                alt="primate"
                style="opacity: 50%"
              />
            </div>
            <div
              class="class berserker"
              @click="
                () => {
                  this.selectedCharacterClass = 'berserker';
                }
              "
            >
              <img
                :style="{ display: selectedCharacterClass === 'berserker' ? undefined : 'none' }"
                src="@/assets/classes/berserker-color.svg"
                alt="berserker-selected"
              />
              <img
                :style="{ display: selectedCharacterClass === 'berserker' ? 'none' : undefined }"
                src="@/assets/classes/berserker.svg"
                alt="berserker"
                style="opacity: 50%"
              />
            </div>
          </div>
          <span v-if="selectedCharacterClass === 'primate'"><strong>Primaat</strong></span>
          <span v-if="selectedCharacterClass === 'berserker'"><strong>Berserker</strong></span>
          <span v-if="selectedCharacterClass === 'shaman'"><strong>Sjamaan</strong></span>
          <p v-if="selectedCharacterClass === 'primate'">
            De primaat is de eenvoudigste klasse. Het geeft geen speciale voordelen.
          </p>
          <p v-if="selectedCharacterClass === 'berserker'">
            De berserker krijgt betere questbeloningen, maar heeft minder tijd en gezondheid.
          </p>
          <p v-if="selectedCharacterClass === 'shaman'">
            De sjamaan krijgt slechtere questbeloningen, maar heeft meer gezondheid.
          </p>
        </div>
      </div>
      <div class="actions">
        <v-btn large @click="$router.push('/menu')">Terug naar menu</v-btn>
        <v-btn
          :disabled="!valid"
          class="submit-btn"
          color="primary"
          large
          @click="$store.state.campaign == undefined ? startCampaign() : (existingCampaignDialog = true)"
          >Start Campagne
        </v-btn>
      </div>
    </v-form>
    <v-dialog v-model="existingCampaignDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>U heeft een bestaande bestaande campagne</v-card-title>
        <v-card-text
          >Als u doorgaat, wordt de bestaande campagne overschreven en wordt uw voortgang gereset. Weet je zeker dat je
          wil doorgaan?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="existingCampaignDialog = false">Annuleren</v-btn>
          <v-btn text @click="startCampaign">Doorgaan</v-btn>
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
