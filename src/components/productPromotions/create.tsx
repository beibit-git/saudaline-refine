import {
  useTranslate,
  useApiUrl,
  useGetIdentity,
  BaseKey,
} from "@refinedev/core";

import { Create, getValueFromEvent, useSelect } from "@refinedev/antd";
import { ICategory, IUser, IBrands, ISubcategory, IProduct } from "interfaces";
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
  Col,
} from "antd";
import { useState } from "react";

const { Text } = Typography;
const { Title } = Typography;

type CreateProductPromotionProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
  promotionId?: BaseKey;
};

export const ProductPromotionProduct: React.FC<CreateProductPromotionProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
  promotionId,
}) => {
  const apiUrl = useApiUrl();
  const breakpoint = Grid.useBreakpoint();
  const { data: user } = useGetIdentity<IUser>();
  const [selectCategory, setSelectCategory] = useState(0);

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
    filters: [
      {
        field: "userId",
        operator: "eq",
        value: user?.id,
      },
    ],
  });

  const { selectProps: brandSelectProps } = useSelect<IBrands>({
    resource: "brands",
    optionLabel: "name",
  });

  const { selectProps: productSelectProps } = useSelect<IProduct>({
    resource: "product",
    optionLabel: "title",
    filters: [
      {
        field: "catId",
        operator: "eq",
        value: selectCategory,
      },
    ],
    onSearch: (value) => [
      {
        field: "q",
        operator: "contains",
        value,
      },
    ],
  });

  const { selectProps: subCategorySelectProps } = useSelect<ISubcategory>({
    resource: "subcategory",
    filters: [
      {
        field: "catId",
        operator: "eq",
        value: selectCategory,
      },
    ],
  });

  const handleSelectCategory = (e: any) => {
    setSelectCategory(e);
  };

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      zIndex={1001}
    >
      <Create
        title="Добавление товар в акцию"
        resource="promotion-product"
        saveButtonProps={saveButtonProps}
        goBack={false}
        breadcrumb={false}
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
          <Title level={5}>Выберите товар</Title>
          <Col>
            <Title level={5}>Категория</Title>
            <Select
              style={{ width: "100%", marginBottom: "15px" }}
              {...categorySelectProps}
              onChange={handleSelectCategory}
            />
          </Col>
          <Form.Item
            hidden
            label="Акция"
            name={["promotion"]}
            initialValue={promotionId}
            rules={[
              {
                required: true,
              },
            ]}
          ></Form.Item>
          {selectCategory ? (
            <>
              <Col>
                <Title level={5}>Подкатегория</Title>
                <Select
                  style={{ width: "100%", marginBottom: "15px" }}
                  {...subCategorySelectProps}
                />
              </Col>
              <Title level={5}>Товар</Title>
              <Form.Item
                name={["product", "id"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select {...productSelectProps} />
              </Form.Item>
            </>
          ) : null}
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
      </Create>
    </Drawer>
  );
};
