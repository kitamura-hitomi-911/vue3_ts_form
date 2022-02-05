import {FormData, FormParts, FormValues} from '@/types';

const getInitValuesFromFormParts = (form_parts_list:FormParts[]):FormValues => {
    return form_parts_list.reduce((ret: FormValues, form_parts: FormParts): FormValues => {
        form_parts.form_data_list.forEach((form_data: FormData): void => {
            ret[form_data.name] = form_data.component === 'FormCheckbox' ? [] : '';
        });
        return ret;
    }, {});
};
export default getInitValuesFromFormParts