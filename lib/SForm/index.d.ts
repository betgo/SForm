import { FormInstance, FormItemProps } from "antd/lib/form";
import { ColProps } from "antd/lib/grid";
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
    onValuesChange?: (changedValues: any, allValues: any) => void;
}
/**
 * SForm 组件
 *
 */
declare const _default: React.ForwardRefExoticComponent<formType & React.RefAttributes<FormInstance<any>>>;
export default _default;
