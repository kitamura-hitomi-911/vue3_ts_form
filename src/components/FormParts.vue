<template>
  <div class="form_parts">
    <dl>
      <dt>{{form_parts.ttl_label}}</dt>
      <dd>
        <component v-for="form_data in form_parts.form_data_list" :is="form_data.component" :form_data="form_data" :key="form_data.name" :values="values" :mode="mode" @updateVal="updateVal"></component>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import FormInput from "@/components/FormInput.vue";
import FormCheckbox from "@/components/FormCheckbox.vue";
import FormRadio from "@/components/FormRadio.vue";
import FormTextarea from "@/components/FormTextarea.vue";
import FormSelect from "@/components/FormSelect.vue";
import {FormParts, FormValue, FormValues} from "@/types";


export default defineComponent({
  name: "FormParts",
  components: {
    FormInput,
    FormCheckbox,
    FormRadio,
    FormSelect,
    FormTextarea
  },
  props:{
    mode: {
      type: String,
      required: true
    },
    form_parts: {
      type: Object as PropType<FormParts>,
      required: true
    },
    values: {
      type: Object as PropType<FormValue>,
      required: true
    },
  },
  setup(props,context){
    const hoge = ref('aa');
    const updateVal = ( paramObj:FormValues ):void => {
      context.emit('updateVal', paramObj);
    }
    return {hoge, updateVal};
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