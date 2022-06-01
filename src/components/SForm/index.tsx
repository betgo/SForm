/* eslint-disable react/require-default-props */
import { forwardRef, useImperativeHandle, useCallback } from "react";
import Form, { FormInstance, FormItemProps } from "antd/lib/form";
import { ColProps } from "antd/lib/grid";
import SchemaForm from "../BaseForm/SchemaForm";
import { SFSchema } from "../interface";
import * as React from "react";


interface formType {
  schema: SFSchema[];
  formItemLayout?: FormItemProps;
  colLayout?: ColProps;
  layout?: "inline" | "horizontal" | "vertical";
  onValuesChange?: (changedValues: any, allValues: any) => void; // 表单变化回调
}

/**
 * SForm 组件
 *
 */

const SForm: React.ForwardRefRenderFunction<FormInstance, formType> = (
  { schema, formItemLayout, colLayout, layout = "horizontal", onValuesChange },
  ref
) => {
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => form);

  return (
    <SchemaForm
      schema={schema}
      form={form}
      formItemLayout={formItemLayout}
      colLayout={colLayout}
      type="normal"
      layout={layout}
      onValuesChange={onValuesChange}
    />
  );
};

export default forwardRef(SForm);

// Form.create<formType>({
//   name: "SForm",
//   onValuesChange: (props: any, changedValues: any, allValues: any) => {
//     props.onValuesChange && props.onValuesChange(changedValues, allValues);
//   },
// })(SForm);
