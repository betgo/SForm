import {
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  TimePicker,
  Tooltip,
  TreeSelect,
} from "antd";
import * as moment from "moment";
import * as React from "react";
import { useMemo, useState } from "react";

import { SFSchemaType } from "../interface";
import Style from "./index.module.less";

type itemType = {
  type: SFSchemaType | "custom";
  name: any;
  render?: any;
  props: any;
};
const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem: React.FC<itemType> = (props) => {
  const { type, props: cusprop, name, render, ...supprops } = props;

  const purProps = {
    ...supprops,
    ...cusprop,
    // getPopupContainer: (triggerNode: { parentElement: any }) => triggerNode.parentElement,
  };
  if (type === "input") {
    return <Input placeholder={`请输入${name}`} {...purProps} />;
  }
  if (type === "inputNumber") {
    return <InputNumber placeholder={`请输入${name}`} {...purProps} />;
  }
  if (type === "textarea") {
    return <Input.TextArea placeholder={`请输入${name}`} {...purProps} />;
  }
  if (type === "password") {
    return <Input.Password placeholder={`请输入${name}`} {...purProps} />;
  }
  if (type === "select") {
    return (
      <Select placeholder={`请选择${name}`} {...purProps}>
        {purProps.enums &&
          purProps.enums.map((option: any) => (
            <Option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </Option>
          ))}
      </Select>
    );
  }
  if (type === "treeSelect") {
    return <TreeSelect {...purProps} />;
  }
  if (type === "radio") {
    return <Radio {...purProps} />;
  }
  if (type === "radioGroup") {
    return <Radio.Group {...purProps} />;
  }
  if (type === "checkbox") {
    return <Checkbox {...purProps} />;
  }
  if (type === "datePicker") {
    const MyDatePicker: React.FC<any> = ({
      value,
      onChange,
      format = "YYYY-MM-DD",
      ...rest
    }) => {
      const transformedValue = value ? moment(value, format) : undefined;

      const transformedOnChange = (v: any) => {
        onChange(v ? v.format(format) : undefined);
      };
      return (
        <DatePicker
          {...rest}
          getPopupContainer={(triggerNode: { parentElement: any }) =>
            triggerNode.parentElement
          }
          value={transformedValue}
          onChange={transformedOnChange}
        />
      );
    };

    return <MyDatePicker format="YYYY-MM-DD" {...purProps} />;
  }
  if (type === "rangePicker") {
    return <RangePicker format="YYYY-MM-DD" {...purProps} />;
  }
  // value已格式化的rangePicker
  if (type === "rangePickerFormat") {
    const MyRangePicker: React.FC<any> = ({
      value,
      onChange,
      format = "YYYY-MM-DD",
      ...rest
    }) => {
      const [dates, setDates] = useState(null);
      const [hackValue, setHackValue] = useState(null);
      const transformedValue = useMemo(() => {
        if (!value) {
          return null;
        }
        if (!value[0] && !value[1]) {
          return null;
        }
        return [moment(value[0]), moment(value[1])];
      }, [value]);

      const { disabledDate: disabledDatefn } = rest;
      const disabledDate = (current: any) => {
        if (!disabledDatefn) return false;
        return disabledDatefn(current, dates);
      };
      const onCalendarChange = (
        dates: any,
        dateStrings: [string, string],
        info: { range: "start" | "end" }
      ) => {
        setDates(dates);
      };
      const onOpenChange = (open: boolean) => {
        if (!disabledDatefn) return;
        if (open) {
          setHackValue([null, null]);
          setDates([null, null]);
        } else {
          setHackValue(null);
        }
      };
      const tarnsformedOnChange = (
        dates: any,
        dateStrings: [string, string]
      ) => {
        if (dateStrings[0] == "" && dateStrings[1] == "") {
          onChange(null);
        } else {
          onChange(dateStrings);
        }
      };

      return (
        <RangePicker
          {...rest}
          getPopupContainer={(triggerNode: { parentElement: any }) =>
            triggerNode.parentElement
          }
          value={hackValue || transformedValue}
          onCalendarChange={onCalendarChange}
          disabledDate={disabledDate}
          onChange={tarnsformedOnChange}
          style={{ width: "100%" }}
          onOpenChange={onOpenChange}
        />
      );
    };
    return <MyRangePicker format="YYYY-MM-DD" {...purProps} />;
  }
  if (type === "timePicker") {
    return (
      <TimePicker
        format="h:mm:ss A"
        placeholder={`请选择${name}`}
        {...purProps}
      />
    );
  }
  if (type === "tooltipInput") {
    return (
      <Tooltip title={purProps.value} placement="topLeft" mouseLeaveDelay={0}>
        <div>
          <Input
            className={Style["schame-form-text"]}
            placeholder={`请输入${name}`}
            {...purProps}
          />
        </div>
      </Tooltip>
    );
  }
  if (type === "custom") {
    if (render) {
      // return React.forwardRef((p: any, ref) => {
      //   return render({ ...p, ref });
      // });
      return render(purProps);
    }
    throw Error("自定义组件需要返回render函数");
  }
  if (process.env.NODE_ENV === "development") {
    throw Error(`FormItem未找到:${type}表单组件`);
  }
  return null;
};

export default FormItem;
