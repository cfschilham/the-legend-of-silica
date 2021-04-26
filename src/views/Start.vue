<template>
  <v-container>
    <div class="content" :style="{ background: $vuetify.theme.currentTheme.background }">
      <span class="text-h4">The Legend of Silica</span>
      <p class="text-body-1">
        Om de game te voltooien moet de speler alle vragen of "quests" succesvol voltooien zonder alle levens kwijt te
        raken.
      </p>
      <p class="text-body-1">
        Je bent een verkenner van het machtige Gebo. Dit ras is ons mensen vele miljoenen jaren voorbij in de wetenschap
        en heeft onlangs intergalactisch reizen op snelheden die groter zijn dan die van het licht ontdekt. Het
        uiteindelijke doel van deze beschaving is om de grote mysteries van het universum te ontrafelen. Waarom zijn de
        elementaire basisdeeltjes zo gebouwd? Wat heeft de oerknal veroorzaakt? Is ons universum eindig en zo ja zou dit
        onontkoombare einde tegengehouden kunnen worden? Deze vragen en nog veel meer willen de grootste denkers van
        Gebo beantwoorden. Na vele jaren van experimenteren besloten ze dat hoever ze ook waren het ze nooit zou lukken
        met hun eigen kennis. Want hoewel ze erg geavanceerd waren, waren de Inwoners van Gebo nooit buiten het
        sterrenstelsel getreden. Hierdoor besloten de wetenschappers was er een zeer gelimiteerde kennis over welke
        atoomsoorten er allemaal bestonden in het universum en hun rol. Omdat deze kennis vergaard moest worden om een
        volledig beeld te krijgen van het heelal en daarmee hun vragen te beantwoorden focusten de grote geesten zich op
        sneller dan licht reizen. Ze bereikten hun doel en stuurden verkenners in alle richtingen met de missie om
        allemaal minimaal 1 nieuwe atoomsoort te ontdekken en hier zoveel mogelijk over te weten te komen. En hier ben
        jij dan Faso. Jouw expeditie heeft je geleidt naar het verre sterrenstelsel van Helios. Hier vind je een
        eigenaardig soort quasi-intelligent dier, de mens. Eerst denk je eraan om contact te leggen en hun te verlichten
        met jouw vergevorderde kennis, maar dan zie je dat ze zo druk bezig zijn elkaar te bevechten dat ze nooit samen
        zullen kunnen komen om als gehele soort voortgang te boeken. Hierdoor besluit je je eigen onderzoek te doen.
        Zodra je onderzoek is afgerond maak je een dossier
        <a
          href="https://drive.google.com/file/d/1p-RBwHz4o3ByOpfXG3-khrPi2nzFp1il/view"
          target="_blank"
          rel="noreferrer"
        ></a>
        en vertrek je naar huis waar de wetenschappers alles willen horen over de nieuwe atoomsoort silica. Jij gaat
        proberen met hulp van je dossier hun vragen te beantwoorden zodat je soort de mysteries van het heelal kan
        ontrafelen!
      </p>
      <p class="text-body-1">
        Muziek door <a href="https://www.youtube.com/channel/UCw4wdHksXbaiyu3BiBNNW0w">Alexander Nakarada</a>. Art door
        Delapouite, Lorc, and Skoll van
        <a href="https://game-icons.net/" target="_blank" rel="noreferrer">game-icons.net</a>.
      </p>
      <v-btn color="primary" class="start-btn" large @click="$router.push(`menu`)">Starten</v-btn>
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
  width: 1200px;

  .text-h4 {
    margin-bottom: 20px;
  }

  .start-btn {
    margin: 20px auto 0 auto;
  }
}
</style>
