import Vue from 'vue'
import Vuex from 'vuex'
import { saveStatePlugin } from '@/utils'
import defaultBoard from '../default-board'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board: board,
  },
  mutations: {}
})
