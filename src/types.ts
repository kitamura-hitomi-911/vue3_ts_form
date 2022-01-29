export {RootState, SheetState, FormValue, FormValues, FormData, FormParts, ActionToMode};

type FormValueCommon = string | number | undefined; //キー名を設定だけした段階は undefined となるので？
type FormValueCheckbox = (string|number)[] | boolean;

type FormValue = FormValueCommon | FormValueCheckbox;

interface RootState {
  version: string;
}

interface FormValues {
  [propName: string]: FormValue
}

interface SheetState {
  values: FormValues,
  tmp_values:FormValues,
}

interface FormData {
  name: string
  component:string
  default_value?: FormValue
  list?: Array<{
    label: string
    value: string|number
    disable?: boolean
  }>
  disable?: boolean
}

interface FormParts {
  id: string|number
  ttl_label: string
  note?: string
  form_data_list: FormData[]
}

interface ActionToMode {
  input: "edit"
  confirm: "view_with_input_hidden"
  complete: "view"
  detail: "view"
}
