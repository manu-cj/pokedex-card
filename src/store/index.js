import { createStore } from 'vuex'

export default createStore({
  state: {
      title: 0,
      pokemonName : ''
    
  },
  getters: {
  },
  mutations: {
    SET_TITLE(state, payload){
      state.title=payload
    },
    SET_POKEMON(state, payload0){
      state.title = payload0
    }
  },
  actions: {
    
  },
  modules: {
  }
})
