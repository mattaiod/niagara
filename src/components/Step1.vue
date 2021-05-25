<template>
  <div class="step">
    <h2>Sélectionner le format d'entrée</h2>
    <v-radio-group v-model="inputFormatSelected" class="mt-5">
        <v-radio v-for="format in inputFormats" :key="format.id" slot="label" :value="format[0]" class="d-inline mr-8 ">
          <template slot="label" >
            <div>
              <div class=" d-block mr-8">
                <v-icon size="7vw" class="icon d-block ">
                  {{format[1]}}
                </v-icon>
              </div>
              <div class="d-block ml-4">{{format[0]}}</div>
            </div>
          </template>
        </v-radio>
    </v-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'Step1',
    data() {
      return {
        inputFormatSelected: this.inputFormat,
        inputFormats: [["Fichier","mdi-file"],["Application","mdi-application-cog"], ["API", "mdi-xml"]]
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
        for(const inputFormat of this.inputFormats) {
          if (inputFormat[0] === this.inputFormatSelected) {
            this.$emit('setValidStep', true)
            return
          }
        }
        this.$emit('setValidStep', false)
      }
    },
    mounted() {
      this.setValidAndPushData()
    }
}
</script>

<style>
.icon {
  display: inline-block;
}
.iconContainer {
  background-color: blue;
}
</style>
