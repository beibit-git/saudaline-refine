import React from "react";
import { IResourceComponentsProps, useApiUrl } from "@refinedev/core";
import { Edit, useForm, useSelect, getValueFromEvent } from "@refinedev/antd";
import {
  Form,
  Input,
  Checkbox,
  DatePicker,
  Upload,
  Select,
  Typography,
  Space,
} from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export const PromotionEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const apiUrl = useApiUrl();

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
                <Text
                  style={{
                    fontWeight: 800,
                    fontSize: "16px",
                    marginTop: "8px",
                  }}
                >
                  Загрузить картинку товара
                </Text>
              </Space>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Edit>
  );
};
