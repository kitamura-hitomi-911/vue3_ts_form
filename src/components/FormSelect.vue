<template>
  <div class="form_select">
    <select :name="form_data.name" v-model="value">
      <option v-for="option in form_data.list" :key="option.label" :value="option.value">{{option.label}}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { FormData, FormValue } from "@/types";

export default defineComponent({
  name: "FormSelect",
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
.form_select{

}
</style>