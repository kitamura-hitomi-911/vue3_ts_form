import { Module, Commit } from 'vuex';
import { SheetState, RootState, FormValues } from '@/types';

const state = ():SheetState => ({
  values: {},
  tmp_values: {}
})
const getters = {}

// actions
const actions = {
  // 初期値セット
  initValues({ commit }:{commit:Commit}, values:FormValues):void {
    commit('setValues', { values, state_key:'values'});
    commit('setValues', { values, state_key:'tmp_values'});
  },
  // 値更新
  updateValues({ commit }:{commit:Commit}, values:FormValues):void {
    commit('setValues', { values, state_key:'tmp_values'});
  },
  getValues():string {
    return 'a'
  }
}

// mutations
const mutations = {
  setValues(state: SheetState, payload:{values: FormValues, state_key:keyof SheetState}): void {
    const {values, state_key} = payload;
    for (const param_name in values) {
      if (Array.isArray(values[param_name])) {
        // 渡された値が配列で、そのparam_name が未定義だった場合はいれものを用意
        if (state[state_key][param_name] === void 0) {
          state[state_key][param_name] = [];
        }
        if (Array.isArray(state[state_key][param_name])) {
          (<string[] | number[]>state[state_key][param_name]).splice(0);
          (<string[] | number[]>values[param_name]).forEach((val: string | number): void => {
            (<Array<string | number>>state[state_key][param_name]).push(val);
          })
        } else {
          console.error('state側の'+state_key+'がプリミティブなのに、セットしようと思っている値が配列', param_name)
        }
      } else {
        state[state_key][param_name] = values[param_name];
      }
    }
  }
}

export const sheet:Module<SheetState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}