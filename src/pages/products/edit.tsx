import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { IBrands, ICategories, ISubcategory } from "interfaces";

export const ProductEdit: React.FC<IResourceComponentsProps> = () => {
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

  const Data = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Id"
          name={["id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input readOnly disabled />
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
        <Form.Item
          label="Main Photo"
          name={["mainPhoto"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
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
          label="Hits"
          name={["hits"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Creates Date"
          name={["createsDate"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
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
    </Edit>
  );
};
