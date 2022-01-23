<template>
  <div class="sheet">
    <h1>Sheet{{ mode }}</h1>
    <FormParts v-for="form_parts in form_parts_list" :key="form_parts.id" :form_parts="form_parts" :mode="mode" :values="values"></FormParts>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed,  watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex'
import { FormValues, FormData, ActionToMode } from "@/types"
import FormParts from "@/components/FormParts.vue";
import form_parts_list from "@/const/sheet_form_parts_list"

export default defineComponent({
  name: "Sheet",
  components: {
    FormParts,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
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
    const values = computed(() => store.state.sheet.values);

    const setValues = (param_obj:FormValues):void => {
      store.commit('sheet/setValues',param_obj);
    }

    setValues(form_parts_list.reduce((ret:FormValues, form_parts)=>{
      form_parts.form_data_list.forEach( (form_data:FormData):void => {
        ret[form_data.name] = form_data.list === void 0 ? '' : [];
      });
      return ret;
    }, {}));

    watch(
      () => route.params.action,
      () => {
        router.go(0);
      }
    );
    return { mode, values, form_parts_list, setValues };
  },
});
</script>
