/// <reference types="react" />
import { FormItemProps } from "antd/lib/form";
import { ColProps } from "antd/lib/grid";
import { SFSchema } from "../interface";
interface Filter {
    schema: SFSchema[];
    formItemLayout?: FormItemProps;
    colLayout?: ColProps;
    expand?: boolean;
    onSearch?: (v: any) => void;
    onReset?: (v: any) => void;
}
/**
 * FilterForm 组件
 *
 */
declare function FilterForm({ schema, formItemLayout, colLayout, expand, onSearch, onReset, }: Filter): JSX.Element;
export default FilterForm;
