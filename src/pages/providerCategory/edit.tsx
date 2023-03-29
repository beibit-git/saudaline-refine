import React from "react";
import { IResourceComponentsProps, useApiUrl } from "@refinedev/core";
import { Edit, useForm, getValueFromEvent } from "@refinedev/antd";
import { Form, Input, Upload, Space, Avatar, Typography } from "antd";

const { Text } = Typography;

export const ProviderCategoryEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const apiUrl = useApiUrl();
  const Data = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Название на казахском языке"
          name={["nameKz"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Название на русском языке"
          name={["nameRu"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Название на английском языке"
          name={["nameEn"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Картинки товара">
          <Form.Item
            name={["photos"]}
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            noStyle
          >
            <Upload.Dragger
              name="file"
              action={`${apiUrl}/file/upload-photos`}
              listType="picture"
              maxCount={5}
              multiple
            >
              <Space direction="vertical" size={2}>
                <Avatar
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "256px",
                  }}
                  src="/images/product-default-img.png"
                  alt="Store Location"
                />
                <Text
                  style={{
                    fontWeight: 800,
                    fontSize: "16px",
                    marginTop: "8px",
                  }}
                >
                  Картинки товара
                </Text>
                <Text style={{ fontSize: "12px" }}></Text>
              </Space>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Edit>
  );
};
