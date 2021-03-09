<template>
  <div>
    <v-form ref="form" v-model="valid" class="settings">
      <h1 class="text--primary">New Campaign</h1>
      <v-text-field
        v-model="name"
        solo
        label="Avatar name"
        :rules="nameRules"
        :counter="20"
        clearable
        style="width: 400px"
      ></v-text-field>
      <span class="text-overline">Difficulty: {{labels[difficulty]}}</span>
      <v-slider
        v-model="difficulty"
        :max="4"
        class="mx-4 difficulty-slider"
        ticks
      ></v-slider>
      <span class="text-overline">Character</span>

      <span class="text-overline">Class</span>
      <v-btn @click="create" :disabled="!valid" color="primary">Start</v-btn>
    </v-form>
  </div>
</template>

<script>

export default {
  name: "",
  data: () => {
    return {
      difficulty: 2,
      valid: false,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 20 || "Name must be less than 20 characters",
      ],
      labels: [
        "Rookie",
        "Studied the night before",
        "Average",
        "Smartest kid of the class",
        "Ludicrous",
      ],
      time: 0,
    };
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? "dark" : "light";
    },
  },
  methods: {
    create() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.$store.commit("setActiveCampaign", { avatarName: this.name, difficulty: this.difficulty });
      this.$router.push("/campaign/active");
    },
  },
};
</script>

<style scoped lang="scss">
.settings {
  width: 400px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  .difficulty-slider {
    margin: 0 !important;
  }
}
</style>
