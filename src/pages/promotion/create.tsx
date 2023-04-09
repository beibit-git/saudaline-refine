import React from "react";
import {
  IResourceComponentsProps,
  useGetIdentity,
  useApiUrl,
} from "@refinedev/core";
import { Create, useForm, useSelect, getValueFromEvent } from "@refinedev/antd";
import { IUser } from "interfaces";
import {
  Form,
  Input,
  Checkbox,
  DatePicker,
  Select,
  Typography,
  Upload,
  Space,
  Avatar,
} from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export const PromotionCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const { data: user } = useGetIdentity<IUser>();
  const apiUrl = useApiUrl();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Название рекламной акции"
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
          label="Подзаголовок акции"
          name={["subTitle"]}
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
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={5} />
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
          <Checkbox>Сделать активным</Checkbox>
        </Form.Item>
        <Form.Item
          label="Дата начала"
          name={["startDate"]}
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
          label="Дата окончания"
          name={["finishDate"]}
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
        <Form.Item label="Изображение товара">
          <Form.Item
            name={["photo"]}
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
                {/* <Avatar
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "256px",
                  }}
                  src="/images/product-default-img.png"
                  alt="Store Location"
                /> */}
                <Text
                  style={{
                    fontWeight: 800,
                    fontSize: "16px",
                    marginTop: "8px",
                  }}
                >
                  Загрузить картинку товара
                </Text>
                <Text style={{ fontSize: "12px" }}>
                  {/* {t("products.fields.images.validation")} */}
                </Text>
              </Space>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item
          hidden
          label="Provider"
          name={["provider"]}
          initialValue={user?.id}
          rules={[
            {
              required: true,
            },
          ]}
        ></Form.Item>
      </Form>
    </Create>
  );
};
