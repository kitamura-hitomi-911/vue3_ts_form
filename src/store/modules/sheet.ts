import { Module, Commit } from 'vuex';
import {SheetState, RootState, FormValues, FormData, FormParts, Errors} from '@/types';
import form_parts_list from "@/const/sheet_form_parts_list"
import isArray from "@/lib/isArray"

const state = ():SheetState => ({
  values: {},
  tmp_values: {},
  form_parts_list,
  errors: {}
})
const getters = {}

// actions
const actions = {
  // form_parts_list をあとからセットパタンもありそう
  // 初期 values をセット
  initValues({state, commit}: { state: SheetState, commit: Commit }): void {
    const values: FormValues = state.form_parts_list.reduce((ret: FormValues, form_parts: FormParts): FormValues => {
      form_parts.form_data_list.forEach((form_data: FormData): void => {
        ret[form_data.name] = form_data.component === 'FormCheckbox' ? [] : '';
      });
      return ret;
    }, {});
    commit('setValues', {values, state_key: 'values'});
    commit('setValues', {values, state_key: 'tmp_values'});
  },
  // 値更新
  updateValues({commit}: { commit: Commit }, values: FormValues): void {
    commit('setValues', {values, state_key: 'tmp_values'});
  },
  // エラーチェック
  checkErrors({state, commit}: { state: SheetState, commit: Commit }): void {
    commit('resetErrors');
    const errors: Errors = state.form_parts_list.reduce((ret: Errors, form_parts: FormParts): Errors => {
      form_parts.form_data_list.forEach((form_data: FormData): void => {
        if(ret[form_data.name] === void 0){
          ret[form_data.name] = [];
        }
        const tgt_value = state.tmp_values[form_data.name];
        // 未入力チェック
        if(form_data.required){
          if(isArray(tgt_value) && !tgt_value.length){
            ret[form_data.name].push('選択必須です');
          }else if(!isArray(tgt_value) && !tgt_value){
            ret[form_data.name].push('入力必須です');
          }
        }
      });
      return ret;
    }, {});
    commit('setErrors', errors);
  },
  getValues():string {
    return 'a'
  }
}

// mutations
const mutations = {
  setValues(state: SheetState, payload:{values: FormValues, state_key:'values'|'tmp_values'}): void {
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
  },
  resetErrors(state: SheetState):void {
    for(const param_name in state.errors){
      state.errors[param_name].splice(0);
    }
  },
  setErrors(state: SheetState, payload:Errors):void {
    console.log(state,payload);
    state.errors = payload;
  }
}

export const sheet:Module<SheetState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}