export {RootState, SheetState, FormValue, FormValues, Errors, FormData, FormParts, ActionToMode, FormMode, Btn};

interface RootState {
  version: string;
}

type FormValueCommon = string | number; //キー名を設定だけした段階は undefined となるので？
type FormValueCheckbox = (string|number)[] | boolean;
type FormValue = FormValueCommon | FormValueCheckbox;

interface FormValues {
  [propName: string]: FormValue
}
interface Errors {
  [propName: string]: string[]
}

interface SheetState {
  values: FormValues,
  tmp_values: FormValues,
  form_parts_list: FormParts[],
  errors: Errors
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
  disabled?: boolean,
  required?: boolean
}

interface FormParts {
  id: string|number
  ttl_label: string
  note?: string
  form_data_list: FormData[]
}

type FormMode = "edit" | "view_with_input_hidden" | "view";

interface ActionToMode {
  input: FormMode
  confirm: FormMode
  complete: FormMode
  detail: FormMode
}

interface Btn {
  label: string,
  link?: string,
  action?: string,
  classes?: string[]
}