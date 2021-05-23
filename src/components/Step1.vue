<template>
  <v-card>
    <h1>Sélectionner le format d'entrée</h1>
    <v-radio-group v-model="inputFormatSelected">
      <v-radio v-for="format in inputFormats" :key="format.id" :label="format" :value="format"></v-radio>
    </v-radio-group>
  </v-card>
</template>

<script>
  export default {
    name: 'Step1',
    data() {
      return {
        inputFormatSelected: this.inputFormat,
        inputFormats: ["Fichier", "Application", "API"]
      }
    },
    props: {
      inputFormat: {type: String, required: true},
    },
    watch: {
      inputFormatSelected() {
        this.setValidAndPushData()
      },
    },
    methods: {
      setValidAndPushData() {
        this.$emit('setDataStep1', this.inputFormatSelected)
        if(this.inputFormats.includes(this.inputFormatSelected)){
          this.$emit('setValidStep', true)
        } else {
          this.$emit('setValidStep', false)
        }
      }
    },
    mounted() {
      this.setValidAndPushData()
    }
}
</script>
