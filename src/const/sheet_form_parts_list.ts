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
  {
    id:'cc',
    ttl_label:'ラジオ選択',
    form_data_list:[
      {
        name:'radio_desu',
        component:'FormRadio',
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
  {
    id:'dd',
    ttl_label:'メモ',
    form_data_list:[
      {
        name:'free',
        component:'FormTextarea'
      }
    ]
  },
  {
    id:'ee',
    ttl_label:'選択肢',
    form_data_list:[
      {
        name:'select_dayo',
        component:'FormSelect',
        list:[
          {
            label: '選択してください',
            value: ''
          },
          {
            label: '選択肢１',
            value: '1'
          },
          {
            label: '選択肢２',
            value: '2'
          },
          {
            label: '選択肢３',
            value: '3'
          },
        ]
      }
    ]
  },
];

export default form_parts_list;