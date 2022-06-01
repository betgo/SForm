/// <reference types="react" />
import { FormItemProps } from "antd/lib/form/FormItem";
export declare type SFLayout = "horizontal" | "vertical" | "inline";
export declare type itemLayout = {
    labelCol: {
        span: number;
    };
    wrapperCol: {
        span: number;
    };
};
export interface SFSchemaEnum {
    [key: string]: any;
    /** 是否禁用状态 */
    disabled?: boolean;
    /** 文本 */
    label?: any;
    /** 值 */
    value?: any;
    /** 是否选中 */
    checked?: boolean;
}
export declare type SFSchemaType = "input" | "inputNumber" | "select" | "textarea" | "password" | "checkbox" | "datePicker" | "radio" | "radioGroup" | "rangePicker" | "tooltipInput" | "treeSelect" | "timePicker";
export declare type SFSchemaEnumType = SFSchemaEnum;
interface SFSchemaBase {
    key: string;
    /**
     * 组件类型,如 'input','radio'
     */
    enums?: SFSchemaEnumType[];
    /**
     * 枚举是否显示全部
     */
    enumsShowAll?: boolean;
    /**
     * 必填
     */
    required?: boolean;
    /**
     * 必填规则
     */
    rules?: any[];
    /**
     * 组件属性
     */
    props?: any;
    /**
     * 数据格式
     */
    format?: string;
    /**
     * 属性描述，相当于 `label` 值：
     */
    title?: string | null;
    /**
     * 默认值
     */
    defaultValue?: any;
    /**
     * 是否只读状态
     */
    readOnly?: boolean;
    /**
     * 是否隐藏（只是显示隐藏，还是会渲染）
     */
    hidden?: boolean;
    /**
     * 是否存在（false时，前端不渲染）
     */
    available?: boolean;
    /**
     * 把 onChange 的参数（如 event）转化为控件的值
     */
    getValueFromEvent?: (value: any) => any;
    /**
     *  Form.Item属性，常用于组件间距调整
     */
    itemProps?: FormItemProps;
    /**
     *  表单数据变化时执行，返回值为false时跳过，多用于表单联动
     */
    onValuesChange?: (values: any) => boolean;
}
interface SFSchemaWithType extends SFSchemaBase {
    type: SFSchemaType;
    /**
     * 枚举，静态数据源，例如：`radio`、`checkbox` 等
     *
     * - `disabled` 属性表示：禁用状态
     * - `label` 属性表示：文本
     * - `value` 属性表示：返回值
     */
    render?: any;
}
interface SFSchemaWithCustom extends SFSchemaBase {
    type: "custom";
    /**
     * 自定义渲染表单组件
     */
    render: ({ value, onChange, ...rest }: any) => React.ReactElement;
}
/**
 * JSON Schema Form 结构体
 *
 *
 */
export declare type SFSchema = SFSchemaWithType | SFSchemaWithCustom;
export {};