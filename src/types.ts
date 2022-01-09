export {RootState, SheetState, FormValue, FormValues, FormData, FormParts};

interface RootState {
  version: string;
}

interface SheetState {
  values: FormValues
}

interface FormValues {
  [propName: string]: FormValue
}

type FormValue = string|number|Array<string|number>;

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

