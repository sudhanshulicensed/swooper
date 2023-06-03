import Vue from 'vue'
import Vuex from 'vuex'
import Board from "../default-board"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: Board,
  },
  mutations: {}
})
