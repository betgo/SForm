/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */

import Form, { FormInstance, FormItemProps } from "antd/lib/form";
import { ColProps } from "antd/lib/grid";
import * as React from "react";
import SchemaForm from "../BaseForm/SchemaForm";
import { SFSchema } from "../interface";

interface Filter {
  schema: SFSchema[];
  formItemLayout?: FormItemProps;
  colLayout?: ColProps;
  expand?: boolean;
  form?: FormInstance;
  onSearch?: (v: any) => void;
  onReset?: (v: any) => void;
}
/**
 * FilterForm 组件
 *
 */
function FilterForm({
  schema,
  formItemLayout,
  colLayout,
  expand,
  form,
  onSearch,
  onReset,
}: Filter) {
  const [customForm] = Form.useForm();
  if (!form) {
    form = customForm;
  }
  return (
    <SchemaForm
      schema={schema}
      form={form}
      type="search"
      formItemLayout={formItemLayout}
      colLayout={colLayout}
      onSearch={onSearch}
      onReset={onReset}
      initExpand={expand}
    />
  );
}

export default FilterForm;
