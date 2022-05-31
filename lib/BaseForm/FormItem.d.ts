import * as React from "react";
import { SFSchemaType } from "../interface";
declare type itemType = {
    type: SFSchemaType | "custom";
    name: any;
    render?: any;
    props: any;
};
declare const FormItem: React.FC<itemType>;
export default FormItem;
