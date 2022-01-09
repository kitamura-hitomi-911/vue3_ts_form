<template>
  <div class="form_input">
    <input type="text" :value="value" :name="form_data.name">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import {FormData} from "@/types";

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
    const value = computed(() => {
      return props.values[props.form_data.name] || '';
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