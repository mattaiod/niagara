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
            <v-select
              :items="filters"
              filled
              label="Filtres"
            ></v-select>
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
        :nameCard= "source.nameCard"
        :teamLabel= "source.teamLabel">
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
    }
  },
  computed: {
    sources(){ return store.getters.sources },
    filters(){ return store.getters.teamLabels },
  },
  methods: {
    onNewSource() {
      router.push("/nouvelle-source");
    }
  }
}
</script>
