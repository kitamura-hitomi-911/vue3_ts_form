<template>
  <div class="form_checkbox">
    <p v-for="checkbox in form_data.list" :key="checkbox.label">
      <input type="checkbox" :value="checkbox.value" :name="form_data.name" :id="form_data.name+'_'+checkbox.value" v-model="value">
      <label :for="form_data.name+'_'+checkbox.value">{{checkbox.label}}</label>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useStore } from 'vuex';
import { FormData, FormValues, FormValue } from "@/types";

export default defineComponent({
  name: "FormCheckbox",
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
      get: ():Array<string|number> => Array.isArray(props.values[props.form_data.name]) ? props.values[props.form_data.name] : [],
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
.form_checkbox{
  .form_checkbox-item{
    font-size:12px;
    line-height:18px;
  }
  input[type=checkbox]{
    display: none;
  }
  label{
			position: relative;
			display: block;
			padding:2px 1em 2px 1.5em;

			&::before,
			&::after{
				position: absolute;
				display:block;
				content:"";
			}
			&::before{
				width: 1em;
				height: 1em;
				top: 50%;
				left: 0;
				margin-top:-0.5em;
				box-sizing: border-box;
				border-radius: 2px;
				border: 1px solid #aaa;
			}
			&::after{
				width: 0.3em;
				height: 0.6em;
				top: 50%;
				left: 0.30em;
				margin-top:-0.5em;
				border-right: 2px solid #8d5cff;
				border-bottom: 2px solid #8d5cff;
				transform: rotate(45deg);
				opacity: 0;
				transition: opacity 0.2s linear;
			}

		}
		input[type=checkbox]:checked + label::after{
			opacity: 1;
		}
		input[type=checkbox]:disabled  + label{
			color:#999;
			&::after{
				border-color:#aaa;
			}
		}
}
.form_checkbox.is-inline{
  .form_checkbox-item{
    display:inline-block;
  }
}
</style>