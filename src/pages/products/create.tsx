import React from "react";
import { IResourceComponentsProps, useApiUrl } from "@refinedev/core";
import { Create, useForm, useSelect, getValueFromEvent } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, Upload } from "antd";
import dayjs from "dayjs";

import { IBrands, ICategories, ISubcategory } from "interfaces";

export const ProductCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const { selectProps: brandSelectProps } = useSelect<IBrands>({
    resource: "brands",
  });

  const { selectProps: categorySelectProps } = useSelect<ICategories>({
    resource: "categories",
  });

  const { selectProps: subCategorySelectProps } = useSelect<ISubcategory>({
    resource: "subcategory",
  });

  const apiUrl = useApiUrl();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
          <Input />
        </Form.Item>
        <Form.Item
          label="Brand"
          name={["brand", "name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...brandSelectProps} />
        </Form.Item>
        <Form.Item label="Image">
          <Form.Item
            name="image"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            noStyle
          >
            <Upload.Dragger
              name="file"
              action={`${apiUrl}/file/upload-main-photo`}
              listType="picture"
              maxCount={1}
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        {/* <Form.Item
          label="Main Photo"
          name={["mainPhoto"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          label="Photos"
          name={["photos"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Unit Type"
          name={["unitType", "name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name={["category", "title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item
          label="Sub Category"
          name={["subCategory", "title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...subCategorySelectProps} />
        </Form.Item>
        <Form.Item
          label="Provider"
          name={["provider", "name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
