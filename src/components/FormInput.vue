<template>
  <div class="form_input">
    <input type="text" :name="form_data.name" v-model="value">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { FormData, FormValue } from "@/types";

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
    },
  },
  setup(props, context){
    const value = computed({
      get: ():string|number => props.values[props.form_data.name] || '',
      set: (value:FormValue):void => {
        context.emit('updateVal',{[props.form_data.name]:value});
      }
    });

    return {value};
  }
});

</script>

<style lang="scss">
.form_input{
  padding:5px;
}
</style>