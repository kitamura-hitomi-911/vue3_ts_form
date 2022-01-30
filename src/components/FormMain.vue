<template>
  <div class="form">
    <FormParts v-for="form_parts in form_parts_list" :key="form_parts.id" :form_parts="form_parts" :mode="mode" :values="values" :errors="errors" @updateVal="updateVal"></FormParts>
    <div class="form-btn_area" v-if="btn_list.length">
      <Btn v-for="btn in btn_list" :btn="btn" :key="btn.label" @onBtnClick="onBtnClick"></Btn>
    </div>
  </div>

</template>

<script lang="ts">
import FormParts from '@/components/FormParts.vue';
import Btn from '@/components/Btn.vue';
import { useStore } from 'vuex'
import {defineComponent, computed, PropType, ref} from "vue";
import {FormValues, Btn as TypeBtn, FormMode} from "@/types";

export default defineComponent({
  name: 'FormMain',
  props:{
    btn_list:{
      type: Array as PropType<TypeBtn[]>,
      required:true
    },
    mode:{
      type: String as PropType<FormMode>,
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

    const form_parts_list = ref(store.state[props.store_name].form_parts_list);

    // store.state に初期値セット
    store.dispatch('sheet/initValues');

    // computed の values
    const values = computed(() => store.state[props.store_name].tmp_values);
    // computed の errors
    const errors = computed(() => store.state[props.store_name].errors);

    // 値の更新を受け取る
    const updateVal = ( paramObj:FormValues ):void => {
      store.dispatch(props.store_name+'/updateValues',paramObj);
    }


    // ボタンがおされたら
    const onBtnClick = ( btn:TypeBtn ):void => {
      if(btn.action === 'toConfirm'){
        console.log('checkForm');
        // エラーチェック
        store.dispatch(props.store_name+'/checkErrors');
      }
    }



    return { form_parts_list, values, errors, updateVal, onBtnClick};
  }

});
</script>

<style lang="scss">

</style>