<template>
  <div class="sheet">
    <h1>Sheet{{action}}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Sheet',
  setup(){
    const router = useRouter();
    const route = useRoute();
    console.log(route.params.action);
    const action = ref<string | string[]>(route.params.action);// 配列の可能性がある…？？
    console.log(action);
    if(action.value !== 'input' && action.value !== 'confirm' && action.value !== 'complete'){
        router.push('/sheet');
    }
    return {action}
  }
})
</script>
