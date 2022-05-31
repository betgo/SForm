# Schema Form (json 表单)

Schema Form 是可配置的表单

### 特点

- 基于 antd 组件
- 可配置表单

### 使用

### SForm (json 表单)

```javascript
<SForm schema={schema} />
```

#### FilterForm (过滤表单,用于搜索)

```javascript
<FilterForm schema={schema} onSearch={onSearch} onReset={onReset} />
```

### API

#### SForm

| 参数           | 说明                        | 类型                                                     | 默认值                                           |
| -------------- | --------------------------- | -------------------------------------------------------- | ------------------------------------------------ |
| schema         | 必填,json 数据格式,标准见下 | SFSchema[]                                               | --                                               |
| formItemLayout | formItem 布局间隔           | object                                                   | {labelCol: {span: 4,},wrapperCol: {span: 16,},}; |
| colLayout      | Col 布局间隔                | object                                                   | {xs: { span: 8 },xxl: { span: 6 },};             |
| layout         | 表单布局                    | 'horizontal''vertical''inline'                           | 'horizontal'                                     |
| onValuesChange | 表单值变化回调              | (props: any, changedValues: any, allValues: any) => void |                                                 

#### FilterForm

| 参数           | 说明                        | 类型           | 默认值                                           |
| -------------- | --------------------------- | -------------- | ------------------------------------------------ |
| schema         | 必填,json 数据格式,标准见下 | SFSchema[]     | --                                               |
| expand         | 是否展开                    | boolean        | false                                            |
| onSearch       | 搜索方法                    | (values)=>void | --                                               |
| onReset        | 重置调用方法                | ()=>void       | --                                               |
| formItemLayout | formItem 布局间隔           | object         | {labelCol: {span: 4,},wrapperCol: {span: 16,},}; |
| colLayout      | Col 布局间隔                | object         | {xs: { span: 8 },xxl: { span: 6 },};             |

### JSON Schema Form 结构体

| 参数         | 说明                                             | 类型          | 默认值 |
| ------------ | ------------------------------------------------ | ------------- | ------ |
| key          | 必填项,主键,表单组件 id                          | string        | --     |
| type         | 必填项,组件类型,如 'input','select'              | string        | --     |
| title        | 必填项,属性描述,相当于 label                     | string        | --     |
| enums        | 枚举数据,{disabled：true,label:'test',value:1}   | object[]      | --     |
| rules        | 校验规则                                         | []            | --     |
| props        | 组件属性                                         | {}            | --     |
| format       | 数据格式,组件为 datePicker 时使用,如'YYYY-MM-DD' | string        | --     |
| defaultValue | 默认值                                           | any           | --     |
| readOnly     | 是否只读状态                                     | boolean       | false  |
| hidden       | 是否隐藏                                         | boolean       | false  |
| itemProps    | FormItemProps                                    | FormItemProps | --     |

> ### 备注
>
> 参考数据

```json
  const schema = [
    {
      title: '测试',
      type: 'input',
      key: 'test',
      defaultValue: '32123',
    },
    {
      title: '测试2',
      type: 'input',
      key: 'test2',
      rules: [{ required: true, message: '必填' }],
    },
    {
      title: '测试3',
      type: 'select',
      key: 'test3',
      enums: [{ label: '1111', value: 1 }],
    },
    {
      title: '测试4',
      type: 'input',
      key: 'test4',
      defaultValue: '默认值',
      readOnly: true,
    },
    {
      title: '测试5',
      type: 'datePicker',
      key: 'test5',
      format: 'YYYY-MM-DD',
      defaultValue: new Date(),
    },
    {
      title: '测试6',
      type: 'select',
      key: 'test6',
      enums: [
        { label: '1111', value: 1 },
        { label: '2222', value: 2 },
        { label: '3333', value: 3 },
      ],
      props: {
        mode: 'multiple',
      },
    },
    {
      title: '测试7',
      type: 'input',
      key: 'test7',
    },
  ];
```
