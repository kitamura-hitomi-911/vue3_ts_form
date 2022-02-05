<template>
  <div class="form_view">
    <p v-html="value_d"></p>
    <input type="hidden" :name="form_data.name" :value="value" v-if="mode==='view_with_input_hidden'">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { FormData, FormValue } from "@/types";
import isArray from "@/lib/isArray"

export default defineComponent({
  name: "FormView",
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
    },
  },
  setup(props){
    const value = computed( ()=> props.values[props.form_data.name] || '');

    const value_d = computed( ()=> {
      let ret = '';
      return ret;
    })


    return {value, value_d};
  }
});

</script>

<style lang="scss">
.form_view{
  padding:5px;
}
</style>