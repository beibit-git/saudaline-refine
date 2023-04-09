import React from "react";
import {
  IResourceComponentsProps,
  BaseKey,
  useApiUrl,
  useGetIdentity,
} from "@refinedev/core";
import {
  Edit,
  ImageField,
  TextField,
  useForm,
  useSelect,
} from "@refinedev/antd";
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
  Checkbox,
  Row,
  Col,
} from "antd";
import { IUser, ICategory, ISubcategory, IPromotionProducts } from "interfaces";

type EditProductPromotionProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
  editId?: BaseKey;
};

export const ProductPromotionEdit: React.FC<EditProductPromotionProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
  editId,
}) => {
  const apiUrl = useApiUrl();
  const breakpoint = Grid.useBreakpoint();
  const { data: user } = useGetIdentity<IUser>();

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      zIndex={1001}
    >
      <Edit
        title="Изменить скидку на товар"
        headerButtons={false}
        resource="promotion-product"
        saveButtonProps={saveButtonProps}
        recordItemId={editId}
        breadcrumb={false}
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
        <Form {...formProps} layout="vertical">
          <Form.Item
            label="Id"
            name={["id"]}
            hidden
            rules={[
              {
                required: true,
              },
            ]}
          ></Form.Item>
          <Row>
            <Col span={12}>
              <Typography>
                <strong>Товар:</strong>{" "}
                {formProps?.initialValues?.product?.title}
              </Typography>
              <Typography>
                <strong>Цена:</strong>{" "}
                {formProps?.initialValues?.product?.price} ₸
              </Typography>
            </Col>
            <Col span={12}>
              <ImageField
                value={formProps?.initialValues?.product?.mainPhoto[0]?.url}
                title={formProps?.initialValues?.discount}
                width={"100%"}
              />
            </Col>
          </Row>
          <Form.Item
            name={["product", "id"]}
            hidden
            rules={[
              {
                required: true,
              },
            ]}
          ></Form.Item>
          <Form.Item
            label="Скидка"
            name={["discount"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Сделать активным"
            valuePropName="checked"
            name={["isActive"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Checkbox>Активный</Checkbox>
          </Form.Item>
        </Form>
      </Edit>
    </Drawer>
  );
};
