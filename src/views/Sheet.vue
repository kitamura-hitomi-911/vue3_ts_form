<template>
  <div class="sheet">
    <h1>Sheet{{ action }}</h1>
    <FormParts v-for="form_parts in form_parts_list" :key="form_parts.id" :form_parts="form_parts" :mode="mode" :values="values"></FormParts>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed,  watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex'
import { FormValues, FormData } from "@/types"
import FormParts from "@/components/FormParts.vue";
import form_parts_list from "@/const/sheet_form_parts_list"

interface ModeSettings {
  [key: string]: string;
}

export default defineComponent({
  name: "Sheet",
  components: {
    FormParts,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    
    const action = ref<string>(
      Array.isArray(route.params.action)
        ? route.params.action[0]
        : route.params.action
    ); // 配列の可能性がある…？？
    const getMode = <S, T extends keyof S>(obj: S, key: T) => {
      return obj[key];
    };
    const mode_settings: ModeSettings = {
      input: "edit",
      confirm: "view_with_input_hidden",
      complete: "view",
      detail: "view",
    };
    const mode = computed(() => {
      return getMode(mode_settings, action.value) || 'view';
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
    return { action, mode, values, form_parts_list, setValues };
  },
});
</script>
