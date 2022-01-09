<template>
  <div class="form_input">
    <input type="text" :name="form_data.name" v-model="value">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useStore } from 'vuex'
import { FormData, FormValues, FormValue } from "@/types";

export default defineComponent({
  name: "FormInput",
  props:{
    form_data:{
      type: Object as PropType<FormData>,
      required:true
    },
    values:{
      type:Object,
      required:true
    },
    mode:{
      type: String,
      required:true
    }
  },
  setup(props){
    const store = useStore();

    const value = computed({
      get: ():string|number => props.values[props.form_data.name] || '',
      set: (value:FormValue):void => {
        setValues({[props.form_data.name]:value})
      }
    });

    const setValues = (param_obj:FormValues):void => {
      store.commit('sheet/setValues',param_obj);
    }

    return {value, setValues};
  }
});

</script>

<style lang="scss">
.form_input{
  padding:5px;
}
</style>