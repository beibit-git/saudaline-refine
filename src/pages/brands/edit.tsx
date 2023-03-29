import React from "react";
import { IResourceComponentsProps, useApiUrl } from "@refinedev/core";
import { Edit, useForm, getValueFromEvent } from "@refinedev/antd";
import { Form, Input, Upload, Space, Avatar, Typography } from "antd";

const { Text } = Typography;

export const BrandsEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const apiUrl = useApiUrl();
  const Data = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Название"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Логотип">
          <Form.Item
            name={["logo"]}
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
                  Логотип
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
