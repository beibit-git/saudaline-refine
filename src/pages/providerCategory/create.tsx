import React from "react";
import { IResourceComponentsProps, useApiUrl } from "@refinedev/core";
import { Create, useForm, getValueFromEvent } from "@refinedev/antd";
import { Form, Input, Upload, Space, Avatar, Typography } from "antd";

const { Text } = Typography;

export const ProviderCategoryCreate: React.FC<
  IResourceComponentsProps
> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const apiUrl = useApiUrl();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Название на казахском языке" name={["nameKz"]}>
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
        <Form.Item label="Название на английском языке" name={["nameEn"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Изображение категории">
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
              maxCount={1}
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
                  Загрузить картинку для категории
                </Text>
                {/* <Text style={{ fontSize: "12px" }}> */}
                {/* {t("products.fields.images.validation")} */}
                {/* </Text> */}
              </Space>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Create>
  );
};
