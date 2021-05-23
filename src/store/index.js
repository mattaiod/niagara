import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* Example STORE
source: [
  {
    inputFormat,
    file: '',
    nameCard: '',
    teamLabel: '',
    triggerType: '',
    dateUpdateExpected: '',
  }
]*/

export default new Vuex.Store({
  state: {
    sources: [
      {
        inputFormat: 'Fichier',
        file: 'txt.txt',
        nameCard: 'Carte de production des poires',
        teamLabel: 'production',
        triggerType: 'Manuel',
        dateUpdateExpected: '2020-05-07',
      }
    ]
  },
  getters: {
    sources: (state) => state.sources,
  },
  mutations: {
    SET_NEW_SOURCE(state, source) {
      state.sources.push(source)
    },
  },
  actions: {
    setNewSource({ commit }, payload) {
      commit('SET_NEW_SOURCE', payload)
    },
  },
  modules: {
  }
})
