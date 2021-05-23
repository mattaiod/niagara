<template>
  <v-card>
    <h1>Renseignez la carte</h1>
    <vue-dropzone @vdropzone-success="onFileAdded($event)" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" :useCustomSlot="true">Glisser et déposer vos fichiers ici ou chercher un fichier</vue-dropzone>
    <v-text-field required label="Donnez un nom à votre carte" v-model="nameCard"></v-text-field>
    <v-select v-model="teamLabel"
      :items="filters"
      filled
      label="Ajouter des étiquettes d'équipes"
    ></v-select>
  </v-card>
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
          thumbnailWidth: 150,
          maxFilesize: 1,
          headers: { "My-Awesome-Header": "header value" }
        }
      }
    },
    props: {
      pNameCard: {type: String, required: true},
      pTeamLabel: {type: String, required: true},
    },
    computed: {
      filters(){ return store.getters.teamLabels },
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
    mounted() {
      //this.setValidAndPushData()
      /*
      var file = { size: 123, name: "Icon", type: "image/png" };
      var url = "https://myvizo.com/img/logo_sm.png";
      this.$refs.myVueDropzone.manuallyAddFile(file, url);*/
    }
}
</script>
