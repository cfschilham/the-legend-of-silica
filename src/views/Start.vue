<template>
  <v-container>
    <div class="content" :style="{ background: $vuetify.theme.currentTheme.background }">
      <span class="text-h4">The Legend of Silica</span>
      <p class="text-body-1">
        Voluptatem tenetur autem explicabo. Enim quam nisi quasi. Eos tempora corrupti inventore saepe. Quo quo
        inventore fugiat distinctio rem. Optio architecto qui sit quia sit ex ut iste.
      </p>
      <p>
        Dolor ipsum sed quia ipsum at. Amet assumenda rerum quo sit alias eos at totam. Vero consectetur voluptatum
        cumque temporibus a.
      </p>
      <p class="text-body-1">
        Facere eveniet dolores veritatis. Placeat in ex mollitia facilis quibusdam animi ut quos. Sint quia non quidem.
        Quis minima consectetur id dolor sit. Facere est inventore et molestias blanditiis aut. Officia aspernatur nobis
        consectetur dolore nam.
      </p>
      <p class="text-body-1">
        Music by <a href="https://www.youtube.com/channel/UCw4wdHksXbaiyu3BiBNNW0w">Alexander Nakarada</a>. Artwork by
        Delapouite, Lorc, and Skoll from
        <a href="https://game-icons.net/" target="_blank" rel="noreferrer">game-icons.net</a>.
      </p>
      <p class="text-body-1">
        Implementation, visual design, and gameplay design by
        <a href="https://github.com/BenStokmans" target="_blank" rel="noreferrer">B. Stokmans</a> and
        <a href="https://github.com/cfschilham" target="_blank" rel="noreferrer">C.F. Schilham</a>.
      </p>
      <v-btn color="primary" class="start-btn" large @click="$router.push(`menu`)">Start</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Start",
};
</script>

<style scoped lang="scss">
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 800px;

  .text-h4 {
    margin-bottom: 20px;
  }

  .start-btn {
    margin: 20px auto 0 auto;
  }
}
</style>
