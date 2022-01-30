<template>
  <p class="btn" :class="classes">
    <a href="#" @click.prevent="onBtnClick">{{btn.label}}</a>
  </p>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import {Btn} from "@/types";

export default defineComponent({
  name: 'Btn',
  props:{
    btn:{
      type: Object as PropType<Btn>,
      required:true
    }
  },
  setup(props, context){
    const classes = computed(() => {
      return props.btn.classes !== undefined
          ? props.btn.classes.map( (class_name):string => {
              return 'btn-' + class_name;
            })
          :'';
    });
    const onBtnClick = () => {
      context.emit('onBtnClick',props.btn);
    };
    return {classes, onBtnClick}
  }
});
</script>

<style>

</style>