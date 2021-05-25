<template>
  <div class="step">
    <h2>Renseignez la carte</h2>
    <vue-dropzone @vdropzone-success="onFileAdded($event)" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" :useCustomSlot="true">
      <v-icon size='4vw'>mdi-file</v-icon>
      Glisser et déposer vos fichiers ici <br><u>Ou chercher un fichier</u>
    </vue-dropzone>
    <v-text-field required label="Donnez un nom à votre carte" v-model="nameCard"></v-text-field>
    <v-select v-model="teamLabel" class="mt-10"
      append-icon="mdi-plus"
      prepend-inner-icon="mdi-account"
      :items="filters"
      dense
      filled
      chips
      chips-color
      item-color="info"
      label="Ajouter des étiquettes d'équipes"
    ></v-select>
  </div>
</template>

<script>
import store from '@/store'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: 'Step2',
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      file: null,
      nameCard: this.pNameCard,
      teamLabel: this.pTeamLabel,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        maxFilesize: 1,
      }
    }
  },
  props: {
    pNameCard: {type: String, required: true},
    pTeamLabel: {type: String, required: true},
  },
  computed: {
    filters(){ return store.getters.teamLabelWords },
  },
  watch: {
    file() {
      this.setValidAndPushData()
    },
    nameCard() {
      this.setValidAndPushData()
    },
    teamLabel() {
      this.setValidAndPushData()
    },
  },
  methods: {
    onFileAdded(file) {
      this.file = file
    },
    setValidAndPushData() {
      const contentEvent = {
        file: this.file,
        nameCard: this.nameCard,
        teamLabel: this.teamLabel
      };
      this.$emit('setDataStep2', contentEvent)
      if(this.file !== null && this.nameCard !== "" && this.teamLabel !== "") {
        this.$emit('setValidStep', true)
      } else {
        this.$emit('setValidStep', false)
      }
    },
  },
}
</script>
