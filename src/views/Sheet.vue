<template>
  <div class="sheet">
    <h1>Sheet{{ mode }}</h1>
    <FormMain :form_parts_list="form_parts_list" :store_name="store_name" :mode="mode"></FormMain>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed,  watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { ActionToMode } from "@/types"
import FormMain from "@/components/FormMain.vue";
import form_parts_list from "@/const/sheet_form_parts_list"

export default defineComponent({
  name: "Sheet",
  components: {
    FormMain,
  },
  setup() {
    const router = useRouter();
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

    const mode = computed(() => {
      return actionToMode[action];
    });
    const store_name = 'sheet';

    watch(
      () => route.params.action,
      () => {
        router.go(0);
      }
    );
    return { mode, store_name, form_parts_list };
  },
});
</script>
