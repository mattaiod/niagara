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
      {
        id: 0,
        inputFormat: 'Fichier',
        file: 'txt.txt',
        nameCard: 'Carte de production des poires',
        teamLabel: 'production',
        triggerType: 'Manuel',
        dateUpdateExpected: '2020-05-07',
      },
      {
        id: 1,
        inputFormat: 'Fichier',
        file: 'txt.txt',
        nameCard: 'Cartedsfdfs',
        teamLabel: 'production',
        triggerType: 'Manuel',
        dateUpdateExpected: '2020-05-07',
      },
    ],
    teamLabels: ['logistique', 'production', 'qualité', 'maintenance'],
  },
  getters: {
    teamLabels: (state) => state.teamLabels,
    sources: (state) => state.sources,
  },
  mutations: {
    ADD_SOURCE(state, source) {
      source.id = state.sources[state.sources.length - 1].id + 1
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
