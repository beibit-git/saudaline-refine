import React from "react";
import { IResourceComponentsProps, useGetIdentity } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Checkbox, Form, Input, Radio } from "antd";
import { IUser } from "interfaces";

export const CategoriesCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const { data: user } = useGetIdentity<IUser>();
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          isActive: true,
        }}
      >
        <Form.Item
          hidden
          label="Поставщик"
          name={["provider"]}
          initialValue={user?.id}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input value={user?.id} disabled />
        </Form.Item>
        <Form.Item
          label="Названия категории"
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
          label="Описание"
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
          label="Статус"
          valuePropName="checked"
          name={["isActive"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Checkbox>активный</Checkbox>
        </Form.Item>
      </Form>
    </Create>
  );
};
