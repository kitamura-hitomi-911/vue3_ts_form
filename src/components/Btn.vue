<template>
  <p class="btn">
    <a href="#">{{btn.label}}</a>
  </p>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {Btn} from "@/types";

export default defineComponent({
  name: 'Btn',
  props:{
    btn:{
      type: Object as PropType<Btn>,
      required:true
    }
  },
  setup(){
    return {}
  }
});
</script>

<style>

</style>