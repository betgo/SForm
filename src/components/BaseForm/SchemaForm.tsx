/* eslint-disable prefer-const */

import { UpOutlined, DownOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  ColProps,
  Form,
  FormInstance,
  FormItemProps,
  Row,
} from "antd";
import * as moment from "moment";

import * as React from "react";
import { useState, useMemo, useCallback, useRef } from "react";
import { itemLayout, SFSchema } from "../interface";
import FormItem from "./FormItem";
import style from "./index.module.less";

type sf = {
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
  onValuesChange?: (changedValues: any, allValues: any) => void; // 表单变化回调
};
const InitformItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const InitColLayout = {
  xs: { span: 8 },
  xxl: { span: 6 },
};
const SchemaForm: React.FC<sf> = ({
  schema = [],
  form,
  name,
  layout = "horizontal",
  type: formType,
  formItemLayout = InitformItemLayout,
  colLayout = InitColLayout,
  initExpand = false,
  onSearch,
  onReset,
}) => {
  const [expand, setExpand] = useState(initExpand);
  const { getFieldsValue, setFieldsValue } = form;
  const count = useMemo(() => {
    let num = schema.length + 1;
    if (formType === "search") {
      num = 5;
      if (expand) {
        num = schema.length;
      }
    }

    return num;
  }, [expand, formType, schema.length]);

  /** 搜索事件 */
  const handleSearch = (e: any) => {
    e.preventDefault();
    form.validateFields().then((values) => {
      onSearch && onSearch(values);
    });
  };

  /** 重置 */
  const handleReset = () => {
    form.resetFields();
    const res = form.getFieldsValue();
    onReset && onReset(res);
  };

  // 下拉事件
  const handleMore = () => {
    setExpand(!expand);
  };
  // 含全部的select组件互斥事件
  const selectWithAll = useCallback(
    (val: string, label: string | number, withLabel = false) => {
      if (withLabel) {
        if (val) {
          const labelItem = getFieldsValue()[label];
          setFieldsValue({
            [label]: labelItem.filter((item: any) => {
              return item.key !== "";
            }),
          });
        } else {
          setFieldsValue({ [label]: [{ key: "", label: "全部" }] });
        }
      } else if (val !== "") {
        const labelItem = getFieldsValue()[label];
        setFieldsValue({
          [label]: labelItem.filter((item: any) => {
            return item !== "";
          }),
        });
      } else {
        setFieldsValue({ [label]: [""] });
      }
    },
    [setFieldsValue, getFieldsValue]
  );
  // TODO 不能使用深拷贝,暂时这样写
  const list: SFSchema[] = useMemo(() => {
    // const temp = lodash.cloneDeep(schema);
    schema.forEach((item: SFSchema) => {
      if (item.enumsShowAll) {
        if (
          item.type === "select" &&
          (item.props?.mode === "multiple" || item.props?.mode === "tags")
        ) {
          if (item?.enums && item.enums[0].label !== "全部") {
            item.enums?.unshift({ value: "", label: "全部" });
          }
          if (item.enums && !item.defaultValue) {
            item.defaultValue = [""];
          }
          item.props.onSelect = (val: any) => {
            selectWithAll(val, item.key);
          };
        }
      }
    });
    return schema;
  }, [schema]);

  return (
    <Form
      name={name}
      layout={layout}
      className={`${style["schame-form"]} ${
        formType === "search" ? style["search-form"] : ""
      }`}
      form={form}
    >
      <Row gutter={24}>
        {list.map((item: SFSchema, i: number) => {
          let {
            type,
            title,
            key,
            required,
            rules,
            enums,
            props: prePrps,
            readOnly,
            hidden,
            getValueFromEvent,
            itemProps: cusitemlayout,
            format,
            dependencies,
            onDependenciesChange,
            available = true,
            render,
          } = item;

          if (!available) {
            return null;
          }

          let { defaultValue } = item;
          const itemProps = { disabled: readOnly, ...prePrps, enums, format };
          if (type === "datePicker") {
            if (defaultValue && !moment.isMoment(defaultValue)) {
              // eslint-disable-next-line no-param-reassign
              defaultValue = moment(defaultValue);
            }
          }
          if (required && !rules) {
            rules = [{ required: true, message: `请输入${title}` }];
          }
          const iformItemLayout = {
            ...formItemLayout,
            ...cusitemlayout,
          };

          return (
            <Col
              {...colLayout}
              key={key}
              style={{
                display: hidden ? "none" : i < count ? "block" : "none",
              }}
            >
              {dependencies ? (
                <Form.Item noStyle dependencies={dependencies}>
                  {(formTemp) =>
                    onDependenciesChange &&
                    onDependenciesChange(
                      formTemp.getFieldsValue(),
                      formTemp
                    ) && (
                      <Form.Item
                        name={key.split(".")}
                        label={title}
                        {...iformItemLayout}
                        rules={rules || []}
                        getValueFromEvent={getValueFromEvent}
                        initialValue={defaultValue}
                        dependencies={dependencies || []}
                      >
                        <FormItem
                          type={type}
                          props={itemProps}
                          name={title}
                          render={render}
                        />
                      </Form.Item>
                    )
                  }
                </Form.Item>
              ) : (
                <Form.Item
                  name={key.split(".")}
                  label={title}
                  {...iformItemLayout}
                  rules={rules || []}
                  getValueFromEvent={getValueFromEvent}
                  initialValue={defaultValue}
                  dependencies={dependencies || []}
                >
                  <FormItem
                    type={type}
                    props={itemProps}
                    name={title}
                    render={render}
                  />
                </Form.Item>
              )}
            </Col>
          );
        })}
        {formType === "search" ? (
          <Col style={{ marginLeft: "auto" }}>
            <div className={style["schame-form-search-btn-wrap"]}>
              <Button type="primary" htmlType="submit" onClick={handleSearch}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                重置
              </Button>
              {schema.length > 5 || (schema.length > 5 && expand) ? (
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={handleMore}>
                  {expand ? "收起" : "更多筛选"}
                  {expand ? <UpOutlined /> : <DownOutlined />}
                </a>
              ) : null}
            </div>
          </Col>
        ) : null}
      </Row>
    </Form>
  );
};

export default SchemaForm;
