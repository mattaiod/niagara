<template>
  <div class="dashboard">
    <v-app>
      <v-container fluid>
        <v-row>
          <v-col cols="8">
            <h2>Bienvenue dans Niagara</h2>
          </v-col>
          <v-col cols="3" class="d-flex">
            <h5><a href="https://www.notion.so/candidatureossventure/R-alisation-TEST-Frontend-d5edb13bf6bc4cdb8bd69044e1beb35e">Notion|</a></h5>
            <h5><a href="https://github.com/mattaiod/niagara">Github</a></h5>
          </v-col>
          <v-col cols="1">
            <h5><a href="https://www.linkedin.com/in/matt%C3%A9o-delandhuy-19720b172">by MDE</a></h5>
          </v-col>
        </v-row>
        <v-row justify="space-between" align="center">
          <v-col cols="3" align="center">
            <v-row align="center">
              <v-col cols="6" class="d-flex" align="center" >
                <v-select  v-model="filterSelected"
                  :items="filterWords"
                  filled
                  label="Filtres"
                ></v-select>
                <v-icon class="btnFilter mb-7 ml-1" @click="resetFilter">mdi-close-circle</v-icon>
              </v-col>
              <v-col cols="4"></v-col>
              <v-col cols="2" class="">
                <v-switch v-model="isSeenAllInfos"
                  label="infos" class="mb-7"
                ></v-switch>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="3">
            <v-btn class="btnAddSource" color="info" @click="onNewSource">+ Ajouter une source</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-text v-for="source in sources" :key="source.id" class="mb-3">
        <Source
          :source= "source"
          :colorLabel= "findColorLabel(source.teamLabel)"
          :isSeenAllInfos="isSeenAllInfos"
          @deleteSource="deleteSource($event)">
        </Source>
      </v-text>
    </v-app>
  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import Source from '@/components/Source.vue'
import firebase from '../Firebase'
const db = firebase.firestore();

export default {
  name: 'Dashboard',
  components: {
    Source
  },
  data() {
    return {
      filterSelected: null,
      sources: this.cSources,
      isSeenAllInfos: false,
    }
  },
  computed: {
    filterWords(){ 
      return store.getters.teamLabelWords
    },
    teamLabels(){ 
      return store.getters.teamLabels
    },
    cSources(){ return store.getters.sources },
  },
  watch: {
    filterSelected() {
      this.filterSources()
    },
  },
  methods: {
    findColorLabel(wordLabel) {
      for(const label of this.teamLabels ) {
        if (label.word.toLowerCase() == wordLabel.toLowerCase()) {
          return label.color
        }
      }
    },
    onNewSource() {
      router.push("/nouvelle-source");
    },
    filterSources() {
      const filter = this.filterSelected
      if(filter === null) {
        this.sources = this.cSources
        return
      } 
      let sourcesFinal = []
      for(const source of this.cSources) {
        if(source.teamLabel === filter)
          sourcesFinal.push(source)
      }
      this.sources = sourcesFinal
    },
    deleteSource(idSource) {
      db.collection("sources")
        .doc(idSource)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          store.dispatch('deleteSource', idSource)
          this.filterSources()
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    resetFilter() {
      this.filterSelected = null
    }
  },
  mounted() {
    let sources = [];
      db.collection("sources")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
           sources.push({
              id: doc.id,
              dateUpdateExpected: doc.data().dateUpdateExpected,
              inputFormat: doc.data().inputFormat,
              nameCard: doc.data().nameCard,
              teamLabel: doc.data().teamLabel,
              triggerType: doc.data().triggerType,
            });
            store.dispatch('setSources', sources)
            this.sources = store.getters.sources
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
  }
}
</script>

<style scoped>
.dashboard {
  margin-left: 10em;
  margin-right: 5em;
}
h2 {
  margin-top: 1em;
  margin-bottom:  0.5em;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 45px;
  color: #212121;
}
.btnAddSource {
  border-radius: 29px;
}
.btnFilter {
  border-radius: 7px;
}
</style>
