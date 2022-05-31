/* eslint-disable no-param-reassign */
/* eslint-disable react/require-default-props */

import Form, { FormItemProps } from "antd/lib/form";
import { ColProps } from "antd/lib/grid";
import * as React from "react";
import SchemaForm from "./Form/SchemaForm";
import { SFSchema } from "./interface";

interface Filter {
  schema: SFSchema[];
  formItemLayout?: FormItemProps;
  colLayout?: ColProps;
  expand?: boolean;
  onSearch?: (v: any) => void;
  onReset?: (v: any) => void;
}
function FilterForm({
  schema,
  formItemLayout,
  colLayout,
  expand,
  onSearch,
  onReset,
}: Filter) {
  const [form] = Form.useForm();
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
