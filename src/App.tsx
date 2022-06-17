import { Button, Form, FormInstance, Input, Popconfirm } from "antd";
import * as React from "react";
import "./App.less";
import { SFSchema } from "./components/interface";
import { SForm, FilterForm } from "./components";

const App = () => {
  const schema: SFSchema[] = [
    {
      title: "测试",
      type: "input",
      key: "test",
      defaultValue: "32123",
    },
    {
      title: "测试2",
      type: "input",
      key: "test2",
      rules: [{ required: true, message: "必填" }],
    },
    {
      title: "测试3",
      type: "select",
      key: "test3",
      enums: [{ label: "1111", value: 1 }],
    },
    {
      title: "测试4",
      type: "input",
      key: "test4",
      defaultValue: "默认值",
      readOnly: true,
    },
    {
      title: "测试5",
      type: "datePicker",
      key: "test5",
      format: "YYYY-MM-DD",
      defaultValue: new Date(),
    },
    {
      title: "测试6",
      type: "select",
      key: "test6",
      enums: [
        { label: "1111", value: 1 },
        { label: "2222", value: 2 },
        { label: "3333", value: 3 },
      ],
      props: {
        mode: "multiple",
      },
      enumsShowAll: true,
    },
    {
      title: "测试7",
      type: "input",
      key: "test7",
    },
    {
      title: "测试8",
      type: "input",
      key: "test8",
      hidden: true,
    },
    {
      title: "APP",
      type: "custom",
      key: "appsecret",
      // readOnly: true,
      render: ({ value, onChange, ...rest }) => {
        return (
          <div style={{ position: "relative" }}>
            <Input.Password
              placeholder="请输入APPSecret"
              value={value}
              // onChange={onChange}
              {...rest}
            />
            <Popconfirm
              title="更换后原秘钥将失效，确定要更换吗？"
              okText="确定"
              onConfirm={onSecretChange}
              cancelText="取消"
              style={{ width: "213px" }}
            >
              <span
                style={{
                  position: "absolute",
                  whiteSpace: "nowrap",
                  color: "#0659E2",
                  cursor: "pointer",
                }}
              >
                &nbsp;换一换
              </span>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const filterShcema: SFSchema[] = [
    {
      title: "测试",
      type: "input",
      key: "testz",
      defaultValue: "32123",
    },
    {
      title: "测试2",
      type: "input",
      key: "test2z",
      rules: [{ required: true, message: "必填" }],
    },
    {
      title: "测试3",
      type: "select",
      key: "test3z",
      enums: [{ label: "1111", value: 1 }],
    },
    {
      title: "测试5",
      type: "datePicker",
      key: "test5z",
      format: "YYYY-MM-DD",
      defaultValue: new Date(),
    },
    {
      title: "测试6",
      type: "select",
      key: "test6z",
      enums: [
        { label: "1111", value: 1 },
        { label: "2222", value: 2 },
        { label: "3333", value: 3 },
      ],
      props: {
        mode: "multiple",
      },
    },
    {
      title: "测试7",
      type: "input",
      key: "test7z",
    },
    {
      title: "测试8",
      type: "input",
      key: "test8z",
      hidden: true,
    },
  ];

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const test = Form.useWatch("test", form);
  const onSecretChange = () => {
    form.setFieldsValue({ appsecret: 12321 });
  };
  const onSubmit = () => {
    // console.log(ref.current.getFieldsValue());
    console.log(form.getFieldsValue());
    console.log(form2.getFieldsValue());
    // console.log("test", test);
  };

  return (
    <div className="App">
      <h1> Hello, Wxx! </h1>
      <SForm schema={schema} form={form} />
      {/* <SForm schema={filterShcema} form={form2} />
      <FilterForm schema={filterShcema} /> */}
      <Button onClick={onSubmit}>提交</Button>
    </div>
  );
};

export default App;
