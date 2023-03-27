import {
  useTranslate,
  useApiUrl,
  useGetIdentity,
  BaseKey,
} from "@refinedev/core";

import { Edit, getValueFromEvent, useSelect } from "@refinedev/antd";
import { ICategory, IUser, IBrands, ISubcategory } from "interfaces";
import {
  Drawer,
  DrawerProps,
  Form,
  FormProps,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  ButtonProps,
  Avatar,
  Typography,
  Upload,
  Grid,
} from "antd";
import { useState } from "react";

const { Text } = Typography;

type EditProductProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
  editId?: BaseKey;
};

export const EditProduct: React.FC<EditProductProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
  editId,
}) => {
  const apiUrl = useApiUrl();
  const breakpoint = Grid.useBreakpoint();
  const { data: user } = useGetIdentity<IUser>();

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  const { selectProps: brandSelectProps } = useSelect<IBrands>({
    resource: "brands",
    optionLabel: "name",
    optionValue: "id",
  });

  const { selectProps: subCategorySelectProps } = useSelect<ISubcategory>({
    resource: "subcategory",
  });

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      zIndex={1001}
    >
      <Edit
        resource="product"
        saveButtonProps={saveButtonProps}
        recordItemId={editId}
        contentProps={{
          style: {
            boxShadow: "none",
          },
          bodyStyle: {
            padding: 0,
          },
        }}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item label="Изображение товара">
            <Form.Item
              name={["mainPhoto"]}
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
            label="Названия товара"
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
            label="Описание товара"
            name={["description"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item label="Единицы измерения" name={["unitType"]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Количество товара"
            name={["amount"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Цена"
            name={["price"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Товарный знак"
            name={["brand", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...brandSelectProps} />
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
                  <Text style={{ fontSize: "12px" }}>
                    {/* {t("products.fields.images.validation")} */}
                  </Text>
                </Space>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Категория"
            name={["category", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...categorySelectProps} />
          </Form.Item>
          <Form.Item
            hidden
            label="Поставщик"
            name={["provider", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Подкатегория"
            name={["subCategory", "id"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...subCategorySelectProps} />
          </Form.Item>
        </Form>
      </Edit>
    </Drawer>
  );
};
