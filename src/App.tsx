import { Button, FormInstance } from "antd";
import * as React from "react";
import "./App.less";
import { SFSchema } from "./components/interface";
import { SForm } from "./components";

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
    },
    {
      title: "测试7",
      type: "input",
      key: "test7",
    },
  ];
  const ref = React.useRef<FormInstance>();
  const onSubmit = () => {
    console.log(ref.current.getFieldsValue());
  };

  return (
    <div className="App">
      <h1> Hello, Wxx! </h1>
      <SForm ref={ref} schema={schema} />
      <Button onClick={onSubmit}>提交</Button>
    </div>
  );
};

export default App;
