import React, { ReactNode, useEffect } from "react";
import {
  IResourceComponentsProps,
  useShow,
  BaseKey,
  BaseRecord,
} from "@refinedev/core";
import {
  Show,
  NumberField,
  TagField,
  TextField,
  BooleanField,
  DateField,
  List,
  ImageField,
  CreateButton,
  DeleteButton,
  EditButton,
  useDrawerForm,
  RefreshButton,
} from "@refinedev/antd";
import {
  Courier,
  CourierBoxContainer,
  PromotionInfoBox,
  CourierInfoBoxText,
  CourierInfoText,
  PromotionFinishDateBox,
  PageHeader,
  Product,
  ProductFooter,
  ProductText,
} from "./styled";
import {
  Typography,
  Row,
  Col,
  Card,
  Avatar,
  Space,
  Table,
  Tag,
  Button,
} from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import { BikeWhiteIcon } from "components/icons";
import { PromotionStatus } from "components/promotion/promotionStatus";
import { IProduct, IPromotionProducts } from "interfaces";
import {
  ProductPromotionEdit,
  ProductPromotionProduct,
} from "components/productPromotions";

const { Title } = Typography;
const { Text } = Typography;

export const PromotionShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const products = data?.data.products;

  const record = data?.data;

  const {
    drawerProps: createDrawerProps,
    formProps: createFormProps,
    saveButtonProps: createSaveButtonProps,
    show: createShow,
    id: promotionId,
  } = useDrawerForm<IPromotionProducts>({
    action: "create",
    resource: "promotion-product",
    redirect: false,
  });

  const {
    drawerProps: editDrawerProps,
    formProps: editFormProps,
    saveButtonProps: editSaveButtonProps,
    show: editShow,
    id: editId,
  } = useDrawerForm<IPromotionProducts>({
    action: "edit",
    resource: "promotion-product",
    redirect: false,
  });

  const promotionStartDate = (
    text: string,
    icon: ReactNode,
    value?: string
  ) => (
    <PromotionInfoBox>
      {icon}
      <CourierInfoBoxText>
        <Text style={{ color: "#ffffff" }}>{text.toUpperCase()}</Text>
        <DateField
          format="DD-MM-YYYY HH:mm"
          style={{ color: "#ffffff", fontWeight: "600", fontSize: "16px" }}
          value={value}
        />
      </CourierInfoBoxText>
    </PromotionInfoBox>
  );

  const promotionFinishDate = (
    text: string,
    icon: ReactNode,
    value?: string
  ) => (
    <PromotionFinishDateBox>
      {icon}
      <CourierInfoBoxText>
        <Text style={{ color: "#ffffff" }}>{text.toUpperCase()}</Text>
        <DateField
          format="DD-MM-YYYY HH:mm"
          style={{ color: "#ffffff", fontWeight: "600", fontSize: "16px" }}
          value={value}
        />
      </CourierInfoBoxText>
    </PromotionFinishDateBox>
  );

  const renderCourierInfo = () => (
    <Card>
      <Row justify="center">
        <Col xl={16} lg={14}>
          <Courier>
            <CourierInfoText>
              <Text>ID #{record?.id}</Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {record?.title}
              </Text>
              <Text>
                Статус акции: <PromotionStatus status={record?.isActive} />
              </Text>
              <Title level={5}>Поставщик</Title>
              <TextField value={record?.provider?.name} />
              <Title level={5}>Подзаголовок</Title>
              <TextField value={record?.subTitle} />
              <Title level={5}>Описание</Title>
              <TextField value={record?.description} />
            </CourierInfoText>
          </Courier>
        </Col>
        <CourierBoxContainer xl={8} lg={10} md={24}>
          {promotionStartDate(
            "Дата начала",
            <FieldTimeOutlined style={{ color: "#ffff", fontSize: 28 }} />,
            record?.startDate
          )}
          {promotionFinishDate(
            "Дата окончания",
            <FieldTimeOutlined style={{ color: "#ffff", fontSize: 28 }} />,
            record?.finishDate
          )}
          <ImageField
            value={record?.photo[0]?.url}
            title={record?.photo[0]?.title}
            width={"80%"}
          />
        </CourierBoxContainer>
      </Row>
    </Card>
  );

  const renderProducts = () => (
    <List
      breadcrumb={false}
      headerProps={{ style: { marginTop: 20 } }}
      headerButtons={
        <>
          <RefreshButton />
          <Button type="primary" onClick={() => createShow(record?.id)}>
            Добавить товар
          </Button>
        </>
      }
      title={<Text style={{ fontSize: 22, fontWeight: 800 }}>Товары</Text>}
    >
      <Table pagination={false} dataSource={products}>
        <Table.Column<IPromotionProducts>
          defaultSortOrder="descend"
          sorter={(a: IPromotionProducts, b: IPromotionProducts) =>
            a.product.title > b.product.title ? 1 : -1
          }
          dataIndex="name"
          title="Товар"
          render={(value, record) => (
            <Product>
              <Avatar
                size={{
                  md: 60,
                  lg: 108,
                  xl: 108,
                  xxl: 108,
                }}
                src={record?.product?.mainPhoto[0]?.url}
              />
              <ProductText>
                <Text style={{ fontWeight: 700 }}>
                  {record?.product?.title}
                </Text>
                <Text>#{record.id}</Text>
              </ProductText>
            </Product>
          )}
        />
        <Table.Column<IPromotionProducts>
          title="Является активным"
          dataIndex="isActive"
          align="center"
          render={(value: any) => <BooleanField value={value} />}
        />
        <Table.Column<IPromotionProducts>
          title="Цена без скидки"
          dataIndex="discount"
          sorter={(a: IPromotionProducts, b: IPromotionProducts) =>
            a.product?.price - b.product?.price
          }
          render={(value, record) => (
            <Text style={{ fontWeight: 600, fontSize: "18px" }}>
              {record?.product?.price} ₸
            </Text>
          )}
        />
        <Table.Column<IPromotionProducts>
          title="Скидка"
          dataIndex="discount"
          align="center"
          sorter={(a: IPromotionProducts, b: IPromotionProducts) =>
            a?.discount - b?.discount
          }
          render={(value, record) => (
            <Tag style={{ fontWeight: 600, fontSize: "18px" }} color={"green"}>
              {record?.discount} %
            </Tag>
          )}
        />
        <Table.Column<IPromotionProducts>
          title="Цена со скидкой"
          dataIndex="discount"
          align="center"
          sorter={(a: IPromotionProducts, b: IPromotionProducts) =>
            a?.discountPrice - b?.discountPrice
          }
          render={(value, record) => (
            <Text style={{ fontWeight: 600, fontSize: "18px" }}>
              {record?.discountPrice}₸
            </Text>
          )}
        />
        <Table.Column<IPromotionProducts>
          title="Действия"
          key="actions"
          align="center"
          dataIndex="actions"
          render={(_text, record) => {
            return (
              <Space>
                <EditButton
                  hideText
                  size="small"
                  resource="promotion-product"
                  onClick={() => editShow(record.id)}
                />
                <DeleteButton
                  hideText
                  size="small"
                  recordItemId={(record as BaseRecord).id as BaseKey}
                  resource="promotion-product"
                />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );

  return (
    <Show isLoading={isLoading}>
      <Space size={20} direction="vertical" style={{ width: "100%" }}>
        {/* {renderOrderSteps()} */}
        {renderCourierInfo()}
      </Space>
      {renderProducts()}
      <ProductPromotionEdit
        drawerProps={editDrawerProps}
        formProps={editFormProps}
        saveButtonProps={editSaveButtonProps}
        editId={editId}
      />
      <ProductPromotionProduct
        drawerProps={createDrawerProps}
        formProps={createFormProps}
        saveButtonProps={createSaveButtonProps}
        promotionId={promotionId}
      />
    </Show>
  );
};
