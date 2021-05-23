<template>
  <v-card>
    <h1>Sélectionner le déclencheur</h1>
    <h3>Choisissez le type de déclencheur pour mettre à jour les données</h3>
    <v-select v-model="trigger"
      :items="triggers"
      filled
      label="Type de déclencheur"
    ></v-select>
    <h3>Choisissez la date de mise à jour attendue (pour envoyer une alerte en cas de non réalisation)</h3>
    <v-date-picker v-model="date" />
  </v-card>
</template>

<script>

  export default {
    name: 'Step1',
    components: {
    },
    data() {
      return {
        triggers: ['Manuel', 'Action prédéfinie', 'Calendaire'],
        trigger: this.pTrigger,
        date: this.pDate
      }
    },
    props: {
      pDate: {type: Date, required: true},
      pTrigger: {type: String, required: true},
    },
    watch: {
      trigger() {
        this.setValidAndPushData()
      },
      date() {
        this.setValidAndPushData()
      },
    },
    methods: {
      setValidAndPushData() {
        const contentEvent = {
          trigger: this.trigger,
          date: this.date,
        };
        this.$emit('setDataStep3', contentEvent)
        if(this.trigger !== "" && this.date !== "") {
          this.$emit('setValidStep', true)
        } else {
          this.$emit('setValidStep', false)
        }
      },
    },
    mounted() {
      this.setValidAndPushData()
    }
}
</script>
