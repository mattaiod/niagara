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

export default {
  name: 'Dashboard',
  components: {
    Source
  },
  data() {
    return {
      filterSelected: null,
      sources: []
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
      store.dispatch('deleteSource', idSource)
      this.filterSources()
    },
    resetFilter() {
      this.filterSelected = null
    }
  },
  mounted() {
      this.sources = store.getters.sources
    }
}
</script>
