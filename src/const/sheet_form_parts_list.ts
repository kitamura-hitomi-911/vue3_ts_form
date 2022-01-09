const form_parts_list = [
  {
    id:'aa',
    ttl_label:'名前',
    form_data_list:[
      {
        name:'user_name',
        component:'FormInput'
      }
    ]
  },
  {
    id:'bb',
    ttl_label:'希望する方向性',
    form_data_list:[
      {
        name:'needs',
        component:'FormCheckbox',
        list:[
          {
            label:'希望1',
            value:1
          },
          {
            label:'希望2',
            value:2
          },
          {
            label:'希望3',
            value:3
          }
        ]
      }
    ]
  },
];

export default form_parts_list;