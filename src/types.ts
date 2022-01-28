export {RootState, SheetState, FormValue, FormValues, FormData, FormParts, ActionToMode};

interface RootState {
  version: string;
}

interface SheetState {
  values: FormValues
}

interface FormValues {
  [propName: string]: FormValue
}

type FormValueCommon = string | number;
type FormValueCheckbox = (string|number)[] | boolean;

type FormValue = FormValueCommon | FormValueCheckbox;


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
