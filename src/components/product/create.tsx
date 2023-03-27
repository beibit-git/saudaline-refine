import { useTranslate, useApiUrl, useGetIdentity } from "@refinedev/core";

import { Create, getValueFromEvent, useSelect } from "@refinedev/antd";
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

const { Text } = Typography;

type CreateProductProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
};

export const CreateProduct: React.FC<CreateProductProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
}) => {
  const apiUrl = useApiUrl();
  const breakpoint = Grid.useBreakpoint();
  const { data: user } = useGetIdentity<IUser>();

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  const { selectProps: brandSelectProps } = useSelect<IBrands>({
    resource: "brands",
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
      <Create
        resource="product"
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
          <Form.Item label="Катинка товара">
            <Form.Item
              name={["mainPhoto"]}
              valuePropName="fileList"
              getValueFromEvent={getValueFromEvent}
              noStyle
              //   rules={[
              //     {
              //       required: true,
              //     },
              //   ]}
            >
              <Upload.Dragger
                name="file"
                action={`${apiUrl}/file/upload-main-photo`}
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
          <Form.Item
            label="Unit Type"
            name={["unitType"]}
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
          >
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
            label="Brand"
            name={["brand"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...brandSelectProps} />
          </Form.Item>
          <Form.Item
            label="Photos"
            name={["photos"]}
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
          >
            <Input />
          </Form.Item>
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
            label="Sub Category"
            name={["subCategory"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...subCategorySelectProps} />
          </Form.Item>
          {/* <Form.Item label={t("products.fields.isActive")} name="isActive">
            <Radio.Group>
              <Radio value={true}>{t("status.enable")}</Radio>
              <Radio value={false}>{t("status.disable")}</Radio>
            </Radio.Group>
          </Form.Item> */}
        </Form>
      </Create>
    </Drawer>
  );
};
