<template>
  <div class="form_parts">
    <dl>
      <dt>{{form_parts.ttl_label}}</dt>
      <dd>
        <component v-for="form_data in form_parts.form_data_list" :is="form_data.component" :form_data="form_data" :key="form_data.name" :values="values" :mode="mode" @updateVal="updateVal"></component>
        <p class="form_parts-error" v-if="error.length" v-html="error.join('<br>')"></p>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from "vue";
import FormInput from "@/components/FormInput.vue";
import FormCheckbox from "@/components/FormCheckbox.vue";
import FormRadio from "@/components/FormRadio.vue";
import FormTextarea from "@/components/FormTextarea.vue";
import FormSelect from "@/components/FormSelect.vue";
import {FormParts, FormData, FormValue, FormValues, Errors} from "@/types";


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
    errors: {
      type: Object as PropType<Errors>,
      required: true
    },
  },
  setup(props,context){
    const hoge = ref('aa');
    const updateVal = ( paramObj:FormValues ):void => {
      context.emit('updateVal', paramObj);
    }
    const error = computed( () => {
      return props.form_parts.form_data_list.reduce( (ret:string[], form_data:FormData):string[] => {
        ret.push(form_data.name);
        return ret;
      },[]).reduce( (ret:string[], name:FormData['name']):string[] => {
        if(props.errors[name]){
          props.errors[name].forEach( (err_msg:string) => {
            ret.push(err_msg);
          })
        }
        return ret;
      }, []);
    })
    return {hoge, updateVal, error};
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