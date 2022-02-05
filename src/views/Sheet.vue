<template>
  <div class="sheet">
    <h1>Sheet{{ mode }}</h1>
    <FormMain :btn_list="btn_list" :store_name="store_name" :mode="mode"></FormMain>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed,  watch, ref } from "vue";
import { useRoute } from "vue-router";

import { ActionToMode, Btn } from "@/types"
import FormMain from "@/components/FormMain.vue";

export default defineComponent({
  name: "Sheet",
  components: {
    FormMain,
  },
  setup() {
    const route = useRoute();

    const actionToMode:ActionToMode = {
      input : "edit",
      confirm : "view_with_input_hidden",
      complete : "view",
      detail : "view"
    }
    const _action:string = Array.isArray(route.params.action) ? route.params.action[0] : route.params.action;
    function isKeyOfActionToMode(key:string, actionToMode:ActionToMode):key is keyof ActionToMode{
      return !!(key in actionToMode);
    }
    const action:keyof ActionToMode = isKeyOfActionToMode(_action, actionToMode) ? _action : 'input';

    const btn_list:Btn[] = [
      {
        label:'確認',
        classes:['next'],
        action:'toConfirm'
      }
    ];

    const mode = computed(() => {
      return actionToMode[action];
    });
    const store_name = 'sheet';

    return { mode, store_name, btn_list };
  },
});
</script>
