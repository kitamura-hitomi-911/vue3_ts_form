import { Module } from 'vuex';
import { SheetState, RootState, FormValues } from '@/types';

const state = ():SheetState => ({
  values: {
    user_name:'hoge hoge',
    needs:[1,2]
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
    for(const key in values){
      // if (typeof state.values[key] === "string[]" || typeof state.values[key] === "number[]") {
      console.log(state.values[key],key);
      if(Array.isArray(values[key])){
        console.log('配列ルート',key);
        if(state.values[key] === void 0){
          console.log('are');
          state.values[key] = [];
        }

        console.log(typeof state.values[key])
        if(Array.isArray(state.values[key])){
        // if(typeof state.values[key] !== 'number' && typeof state.values[key] !== 'string'){
        // if('splice' in state.values[key]){
          console.log(Array.isArray(state.values[key]));
          (<string[]|number[]>state.values[key]).splice(0);
          // state.values[key].push('hoge');
           

          (<string[]|number[]>values[key]).forEach( (val:string|number):void => {
            console.log(val);
            if (typeof val === "number") {
              (<number[]>state.values[key]).push(val);
            }else{
              (<string[]>state.values[key]).push(val);
            }
            // state.values[key].push(val);
          })
        }
    
        
        console.log('セット後', state.values[key]);
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