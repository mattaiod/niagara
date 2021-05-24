<template>
  <div class="home">
    <v-app>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <h1>Bienvenue dans Niagara</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-select v-model="filterSelected"
              :items="filters"
              filled
              label="Filtres"
            ></v-select>
            <v-btn color="success" @click="resetFilter">X</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-btn color="success" @click="onNewSource">+ Ajouter une source</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-list v-for="source in sources" :key="source.id">
        <Source
        :source= "source"
        @deleteSource="deleteSource($event)">
        </Source>
      </v-list>
      
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
    }
  },
  computed: {
    filters(){ 
      return store.getters.teamLabels
    },
    cSources(){ return store.getters.sources },

  },
  watch: {
    filterSelected() {
      this.filterSources()
    }
  },
  methods: {
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
            console.log(doc.id, " => ", doc.data());
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
