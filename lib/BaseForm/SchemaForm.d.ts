import { ColProps, FormInstance, FormItemProps } from "antd";
import * as React from "react";
import { SFSchema } from "../interface";
declare type sf = {
    schema: SFSchema[];
    form: FormInstance;
    name?: string;
    layout?: "inline" | "horizontal" | "vertical";
    type: "normal" | "search";
    formItemLayout?: FormItemProps;
    colLayout?: ColProps;
    initExpand?: boolean;
    onSearch?: (v: any) => void;
    onReset?: (v: any) => void;
    onValuesChange?: (changedValues: any, allValues: any) => void;
};
declare const SchemaForm: React.FC<sf>;
export default SchemaForm;
