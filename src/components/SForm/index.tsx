/* eslint-disable react/require-default-props */
import { forwardRef, useImperativeHandle, useCallback } from "react";
import Form, { FormInstance, FormItemProps } from "antd/lib/form";
import { ColProps } from "antd/lib/grid";
import SchemaForm from "../BaseForm/SchemaForm";
import { SFSchema } from "../interface";
import * as React from "react";

interface formType {
  /** 表单内容 */
  schema: SFSchema[];
  /** 表单组件布局，{labelCol: {span: 4,},wrapperCol: {span: 16,}} */
  formItemLayout?: FormItemProps;
  /** 表单行布局，{xs: { span: 8 },xxl: { span: 6 }};*/
  colLayout?: ColProps;
  layout?: "inline" | "horizontal" | "vertical";
  form?: FormInstance;
  /** 表单变化回调*/
  onValuesChange?: (changedValues: any, allValues: any) => void; // 表单变化回调
}

const SForm: React.ForwardRefRenderFunction<FormInstance, formType> = (
  {
    schema,
    formItemLayout,
    colLayout,
    layout = "horizontal",
    form,
    onValuesChange,
  },
  ref
) => {
  const [customForm] = Form.useForm();
  if (!form) {
    form = customForm;
  }

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

/**
 * SForm 组件
 *
 */
export default forwardRef(SForm);
