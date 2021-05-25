<template>
  <v-card class="rounded-xl">
    <v-card-text class="d-flex  justify-space-between">
      <v-row>
        <v-col cols="8">
          <h4>{{ source.nameCard }}</h4>
        </v-col>
        <v-col cols="4">
        <div  class="d-flex justify-right">
          <v-row>
            <v-col cols="5">
              <v-icon class="btnLabel mr-2 mt-1" color="success" @click="knowMore">mdi-more</v-icon>
              <v-icon class="btnLabel mt-1"  @click="deleteSource">mdi-delete</v-icon>
            </v-col>
            <v-col cols="7">
              <v-btn class="btnLabel ml-5" :color="colorLabel">{{ source.teamLabel }}</v-btn>
            </v-col>
          </v-row>
        </div>
        </v-col>
      </v-row>
    </v-card-text>
    <div v-if="isKnowMore">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title><span class="font-weight-bold">Format: </span>{{ source.inputFormat }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title><span class="font-weight-bold">Type de déclenchement: </span> {{ source.triggerType }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title><span class="font-weight-bold">Date de mis à jour attendue: </span> {{ source.dateUpdateExpected | transformDate }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'Source',
    data() {
      return {
        isKnowMore: this.isSeenAllInfos
      }
    },
  props: {
    source: {type: Object, required: true},
    colorLabel: {type: String, required: true},
    isSeenAllInfos: {type: Boolean, required: true}
  },
  watch: {
    isSeenAllInfos(newVal) {
      this.isKnowMore = newVal
    }
  },
  methods: {
    knowMore() {
      this.isKnowMore = !this.isKnowMore
    },
    deleteSource() {
      const message = "Etes vous sûr de vouloir supprimer cette source ?"
      const resultat = window.confirm(message);
      if(resultat == false) return
      this.$emit('deleteSource', this.source.id)
    },
  },
  filters: {
    transformDate(oldDate) {
      return oldDate.toString().split("-").reverse().join("-").replaceAll('-', '/');
    }
  }
}
</script>

<style scoped>
h4 {
  font-family: Titillium Web;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0em;
}
.btnLabel {
font-family: Source Sans Pro;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 20px;
letter-spacing: 0em;
border-radius: 29px;
}
</style>
