import { createStore } from 'vuex'

export default createStore({
  state: {
      title: 0,
      pokemonName : null,
      pokemonDataStore : '',
      pokelistes : []
    
  },
  getters: {
  },
  mutations: {
    SET_TITLE(state, payload){
      state.title=payload
    },
    SET_POKEMON(state, payload0){
      state.pokemonName = payload0
    },
    SET_POKEMON_DATA_STORE(state, payload1){
      state.pokemonDataStore = payload1
    },
    SET_POKELISTES(state, payload) {
      state.pokelistes = [payload]
    }
  },
  actions: {
    
  },
  modules: {
  }
})
