import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* Example STORE
sources: [
{
  inputFormat: 'Fichier',
  file: 'txt.txt',
  nameCard: 'Carte de production des poires',
  teamLabel: 'production',
  triggerType: 'Manuel',
  dateUpdateExpected: '2020-05-07',
},
]*/

export default new Vuex.Store({
  state: {
    sources: [
    ],
    teamLabels: ['logistique', 'production', 'qualité', 'maintenance'],
  },
  getters: {
    teamLabels: (state) => state.teamLabels,
    sources: (state) => state.sources,
  },
  mutations: {
    SET_SOURCES(state, sources) {
      
      state.sources = sources
      console.log(state.sources)
    },
    ADD_SOURCE(state, source) {
      state.sources.push(source)
    },
    DELETE_SOURCE(state, idSource) {
      for(const index in state.sources) {
        if (state.sources[index].id == idSource) {
          state.sources.splice(index, 1)
          return
        }
      }
    },
  },
  actions: {
    setSources({ commit }, payload) {
      commit('SET_SOURCES', payload)
    },
    addSource({ commit }, payload) {
      commit('ADD_SOURCE', payload)
    },
    deleteSource({ commit }, payload) {
      commit('DELETE_SOURCE', payload)
    },
  },
  modules: {
  }
})
