<template>
  <div class="form_textarea">
    <textarea :name="form_data.name" v-model="value"></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { FormData, FormValue } from "@/types";

export default defineComponent({
  name: "FormTextarea",
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
.form_textarea{
  padding:5px;
}
</style>