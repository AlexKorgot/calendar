import Vue from 'vue';
import Vuex from 'vuex';

// @ts-ignore
import { createVuexStore } from 'vuex-simple';

import { MyStore } from './store';

Vue.use(Vuex);

// create our module class instance
const instance = new MyStore();

// create and export our store
export default createVuexStore(instance, {
  strict: false,
  modules: {},
  plugins: []
});

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
