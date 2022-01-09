
/*
import { Module } from 'vuex';
import { SheetState, RootState } from '@/types';
*/

const state = () => ({
  values: {
    user_name:'hoge hoge'
  }
})
const getters = {}

// actions
const actions = {
  getValues () {
    return 'a'
  }
}

// mutations
const mutations = {
  /*
  setValues (state, values) {
    for(let key in values){
      state[key] = values[key];
    }
  },*/
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
/*
export const sheet:Module<SheetState, RootState> {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}*/