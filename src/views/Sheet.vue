<template>
  <div class="sheet">
    <h1>Sheet{{action}}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'

interface ModeSettings {
  [key:string]:string
}

export default defineComponent({
  name: 'Sheet',
  setup(){
    const router = useRouter();
    const route = useRoute();
    const action = ref<string>(Array.isArray(route.params.action) ? route.params.action[0] : route.params.action);// 配列の可能性がある…？？
    const getMode = <S, T extends keyof S>(obj: S, key: T) => {
      return obj[key];
    };
    const mode_settings:ModeSettings = {
        input:'edit',
        edit:'edit',
        confirm:'view_with_input_hidden',
        complete:'view',
        show:'view',
    }
    const mode = computed(() => {
      return getMode(mode_settings, action.value) || null;
    })
    if(!mode.value){
        // 
    }
    watch(
      () => route.params.action,
      () => {
        router.go(0);
      }
    )
    return {action, mode}
  }
})
</script>
