export {RootState, SheetState, FormData, FormParts};

interface RootState {
  version: string;
}

interface SheetState {
  values: {[propName: string]:string | string[] | number | number[] };
}

interface FormData {
  name: string
  component:string
  default_value?: string|number|string[]|number[]
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

