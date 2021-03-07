<template id="item-slot">
    <v-tooltip bottom>
      <template :activator="{ on }">
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" v-on="on">
            <v-avatar class="item-tile" tile>
              <v-icon> { item.icon } </v-icon>
            </v-avatar>
          </v-card>
        </v-hover>
      </template>
      <span> {{ item.description }} </span>
    </v-tooltip>
</template>

<script>
export default {
  name: "ItemSlot",
  props: ["item"],
};
</script>

<style scoped lang="scss">
.item-tile {
  background-color: #9e9e9e !important;
  border: 1px solid black;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}
</style>
