<template>
  <div class="form_radio">
    <p v-for="radio in form_data.list" :key="radio.label">
      <input type="radio" :value="radio.value" :name="form_data.name" :id="form_data.name+'_'+radio.value" v-model="value">
      <label :for="form_data.name+'_'+radio.value">{{radio.label}}</label>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { FormData, FormValue } from "@/types";

export default defineComponent({
  name: "FormRadio",
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
.form_radio{
  .form_radio-item{
    font-size:12px;
    line-height:18px;
  }
  input[type=radio]{
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
      border-radius: 0.5em;
      border: 1px solid #aaa;
    }
    &::after{
      width: 0.5em;
      height: 0.5em;
      top: 50%;
      left: 0.25em;
      margin-top:-0.25em;
      border-radius:0.25em;
      box-sizing: border-box;
      background-color: #a6fd64;
      opacity: 0;
      transition: opacity 0.2s linear;
    }

		}
		input[type=radio]:checked + label::after{
			opacity: 1;
		}
		input[type=radio]:disabled  + label{
			color:#999;
			&::after{
				border-color:#aaa;
			}
		}
}
.form_radio.is-inline{
  .form_radio-item{
    display:inline-block;
  }
}
</style>