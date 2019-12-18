import Vue from 'vue';
import Vuex from 'vuex';
import defaultBoard from './default-board';
import { SaveStatePlugin } from './utils';

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard;

export default new Vuex.Store({
  plugins: [SaveStatePlugin],
  state: {
    board
  },
  mutations: {}
});
