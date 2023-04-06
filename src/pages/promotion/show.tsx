import React, { ReactNode } from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
  Show,
  NumberField,
  TagField,
  TextField,
  BooleanField,
  DateField,
  ImageField,
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
import { Typography, Row, Col, Card, Avatar, Space } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import { BikeWhiteIcon } from "components/icons";
import { PromotionStatus } from "components/promotion/promotionStatus";

const { Title } = Typography;
const { Text } = Typography;

export const PromotionShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

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
        <Col xl={12} lg={10}>
          <Courier>
            <Avatar size={108} src={record?.photo[0]?.url} />
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
            </CourierInfoText>
          </Courier>
        </Col>
        <CourierBoxContainer xl={12} lg={14} md={24}>
          {promotionStartDate(
            "Дата начала",
            <FieldTimeOutlined style={{ color: "#ffff", fontSize: 32 }} />,
            record?.startDate
          )}
          {promotionFinishDate(
            "Дата окончания",
            <FieldTimeOutlined style={{ color: "#ffff", fontSize: 32 }} />,
            record?.finishDate
          )}
        </CourierBoxContainer>
        {/* <Col xl={12} lg={10} className="customer-details">
          <Col>
            <Text>
              <strong>ФИО заказчика:</strong> {order?.deliveryDetails.fio}
            </Text>
            <br />
            <Text>
              <strong>Телефон:</strong> {order?.deliveryDetails.tel}
            </Text>
            <br />
          </Col>
          <Col>
            <Text>
              <strong>Эл. почта:</strong> {order?.deliveryDetails.email}
            </Text>
            <br />
            <Text>
              <strong>Регион:</strong> {order?.deliveryDetails.region.nameRu}
              {"   "}
              <strong>Город:</strong>
              {order?.deliveryDetails.city.name}
            </Text>
          </Col>
        </Col> */}
        {/* <Col xl={12} lg={10}></Col> */}
      </Row>
    </Card>
  );

  return (
    <Show isLoading={isLoading}>
      <Space size={20} direction="vertical" style={{ width: "100%" }}>
        {/* {renderOrderSteps()} */}
        {renderCourierInfo()}
      </Space>
      <Row>
        <Col span={15}>
          <TextField
            value={record?.title}
            style={{ fontSize: 18, fontWeight: "bold" }}
          />
          <Title level={5}>Подзаголовок</Title>
          <TextField value={record?.subTitle} />
          <Title level={5}>Описание</Title>
          <TextField value={record?.description} />
          <Title level={5}>Скидка</Title>
          <NumberField value={record?.discount ?? ""} />
          <Title level={5}>Является активным</Title>
          <BooleanField value={record?.isActive} />
          <Title level={5}>Дата начала</Title>
          <DateField value={record?.startDate} />
          <Title level={5}>Дата окончания</Title>
          <DateField value={record?.finishDate} />
          <Title level={5}>Products</Title>
          {/* {productsIsLoading ? <>Loading...</> : <></>} */}
          <Title level={5}>Поставщик</Title>
          <TextField value={record?.provider?.name} />
        </Col>
        <Col span={8}>
          <ImageField
            value={record?.photo[0]?.url}
            title={record?.photo[0]?.name}
            width={"95%"}
          />
        </Col>
      </Row>
    </Show>
  );
};
