import { Module } from 'vuex';
import { SheetState, RootState, FormValues } from '@/types';

const state = ():SheetState => ({
  values: {
    user_name:'hoge hoge',
    needs:[1,2],
    radio_desu:'',
    select_dayo:''
  }
})
const getters = {}

// actions
const actions = {
  getValues():string {
    return 'a'
  }
}

// mutations
const mutations = {
  setValues (state:SheetState, values:FormValues):void {
    console.log(values);
    for(const key in values){
      if(Array.isArray(values[key])){
        if(state.values[key] === void 0){
          state.values[key] = [];
        }
        if(Array.isArray(state.values[key])){
          (<string[]|number[]>state.values[key]).splice(0);
          (<string[]|number[]>values[key]).forEach( (val:string|number):void => {
            (<Array<string|number>>state.values[key]).push(val);
          })
        }else{
          console.error('values がプリミティブなのに、セットしようと思っている値が配列',key)
        }
      }else{
        state.values[key] = values[key];
      }
    
    }
  },
}

export const sheet:Module<SheetState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}