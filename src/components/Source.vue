<template>
  <v-card>
    <v-card-text>
    {{ source.nameCard }} ////
    {{ source.teamLabel }}
    </v-card-text>
    <v-btn v-if="!isKnowMore" color="success" @click="deleteSource">Supprimer</v-btn>
    <v-btn v-if="!isKnowMore" color="success" @click="knowMore">En savoir plus</v-btn>
    <div v-else>
      Format: {{ source.inputFormat }}
      Type de déclenchement: {{ source.triggerType }}
      Date de mis à jour attendue: {{ source.dateUpdateExpected }}
      <v-btn color="success" @click="knowMore">En savoir moins</v-btn>
    </div>
    
  </v-card>
</template>

<script>
  export default {
    name: 'Source',
    data() {
      return {
        isKnowMore: false
      }
    },
  props: {
    source: {type: Object, required: true},
  },
  methods: {
    knowMore() {
      this.isKnowMore = !this.isKnowMore
    },
    deleteSource() {
      this.$emit('deleteSource', this.source.id)
      console.log(this.source.id)
    }
  }
}
</script>
