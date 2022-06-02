import { FormInstance, FormItemProps } from "antd/lib/form";
import { ColProps } from "antd/lib/grid";
import { SFSchema } from "../interface";
import * as React from "react";
interface formType {
    schema: SFSchema[];
    formItemLayout?: FormItemProps;
    colLayout?: ColProps;
    layout?: "inline" | "horizontal" | "vertical";
    onValuesChange?: (changedValues: any, allValues: any) => void;
}
/**
 * SForm 组件
 *
 */
declare const _default: React.ForwardRefExoticComponent<formType & React.RefAttributes<FormInstance<any>>>;
export default _default;
