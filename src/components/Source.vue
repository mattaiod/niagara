<template>
  <v-card>
    <v-card-text>
    {{ nameCard }} ////
    {{ teamLabel }}
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'Source',
    data() {
      return {
      }
    },
  props: {
    nameCard: {type: String, required: true},
    teamLabel: {type: String, required: true},
  }
}
</script>
