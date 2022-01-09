<template>
  <div class="sheet">
    <h1>Sheet{{ action }}</h1>
    <FormParts :form_parts="form_parts" :mode="mode" :values="values"></FormParts>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex'
import FormParts from "@/components/FormParts.vue";

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

    store.commit('sheet/setValues',{aa:'hoge',bb:['aa']});
    
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

    const form_parts = {
      id:'aa',
      ttl_label:'見出し文字列',
      form_data_list:[
        {
          name:'user_name',
          component:'FormInput',
          list:[
            {
              label:'選択してください',
              value:''
            }
          ]
        }
      ]
    }
    watch(
      () => route.params.action,
      () => {
        router.go(0);
      }
    );
    return { action, mode, values, form_parts };
  },
});
</script>
