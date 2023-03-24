import React from "react";
import { useApiUrl, BaseKey } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import {
  Drawer,
  Form,
  Input,
  Select,
  Checkbox,
  DrawerProps,
  FormProps,
  ButtonProps,
  Grid,
} from "antd";

import { ICategories } from "interfaces";

type CreateSubcategoryProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
};

export const SubcategoryCreate: React.FC<CreateSubcategoryProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
}) => {
  const apiUrl = useApiUrl();

  const breakpoint = Grid.useBreakpoint();

  const { selectProps: categorySelectProps } = useSelect<ICategories>({
    resource: "categories",
  });

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      zIndex={1001}
    >
      <Create
        resource="subcategory"
        saveButtonProps={saveButtonProps}
        goBack={false}
        contentProps={{
          style: {
            boxShadow: "none",
          },
          bodyStyle: {
            padding: 0,
          },
        }}
      >
        <Form
          {...formProps}
          layout="vertical"
          initialValues={{
            isActive: true,
          }}
        >
          <Form.Item
            label="Category"
            name={["category"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...categorySelectProps} />
          </Form.Item>
          <Form.Item
            label="Title"
            name={["title"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name={["description"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item
            label="Is Active"
            valuePropName="checked"
            name={["isActive"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Checkbox>Is Active</Checkbox>
          </Form.Item>
        </Form>
      </Create>
    </Drawer>
  );
};
