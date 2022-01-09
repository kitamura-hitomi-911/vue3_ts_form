<template>
  <div class="form_parts">
    <dl>
      <dt>{{form_parts.ttl_label}}</dt>
      <dd>
        <FormInput v-for="form_data in form_parts.form_data_list" :form_data="form_data" :key="form_data.name" :values="values" :mode="mode"></FormInput>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import FormInput from "@/components/FormInput.vue";
import {FormParts, SheetState} from "@/types";


export default defineComponent({
  name: "FormParts",
  components: {
    FormInput,
  },
  props:{
      mode:{
          type:String,
          required:true
      },
      form_parts:{
          type:Object as PropType<FormParts>,
          required:true
      },
      values:{
        type:Object as PropType<SheetState>,
        required:true
      }
  },
  setup(props){
    console.log(props.values);
    const hoge = ref('aa');
    return {hoge};
  },
});
</script>

<style lang="scss">
.form_parts{
    dl{
        display: flex;
    }
}
</style>