<template>
  <div class="form">
    <FormParts v-for="form_parts in form_parts_list" :key="form_parts.id" :form_parts="form_parts" :mode="mode" :values="values" @updateVal="updateVal"></FormParts>
    <div class="form-btn_area" v-if="btn_list.length">
      <Btn v-for="btn in btn_list" :btn="btn" :key="btn.label"></Btn>
    </div>
  </div>

</template>

<script lang="ts">
import FormParts from '@/components/FormParts.vue';
import Btn from '@/components/Btn.vue';
import { useStore } from 'vuex'
import { defineComponent, computed, PropType} from "vue";
import {FormData, FormValues, FormParts as TypeFormParts, Btn as TypeBtn} from "@/types";

export default defineComponent({
  name: 'FormMain',
  props:{
    form_parts_list:{
      type: Array as PropType<TypeFormParts[]>,
      required:true
    },
    btn_list:{
      type: Array as PropType<TypeBtn[]>,
      required:true
    },
    mode:{
      type: String,
      required:true
    },
    store_name:{
      type:String,
      required:true
    }
  },
  components: {
    FormParts,
    Btn
  },
  setup(props){
    const store = useStore();

    console.log(store.state.sheet);


    // store.state に初期値セット
    store.dispatch('sheet/initValues', props.form_parts_list.reduce((ret:FormValues, form_parts)=>{
        form_parts.form_data_list.forEach( (form_data:FormData):void => {
          ret[form_data.name] = form_data.component === 'FormCheckbox' ? [] : '';
        });
        return ret;
      }, {}))

    // computed の values
    const values = computed(() => store.state[props.store_name].tmp_values);

    // values の更新
    /* const setValues = (param_obj:FormValues):void => {
      store.commit('sheet/setValues',param_obj);
    }*/
    const updateVal = ( paramObj:FormValues ):void => {
      store.dispatch('sheet/updateValues',paramObj);
    }


    return { values, updateVal };
  }

});
</script>

<style lang="scss">

</style>