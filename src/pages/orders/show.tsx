import { ReactNode, useState } from "react";
import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
  useUpdate,
} from "@refinedev/core";
import { List } from "@refinedev/antd";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  MobileOutlined,
} from "@ant-design/icons";

import {
  Row,
  Col,
  Button,
  Steps,
  Grid,
  Space,
  Avatar,
  Typography,
  Card,
  Table,
  Skeleton,
} from "antd";

import dayjs from "dayjs";
import {
  YMaps,
  Map,
  ZoomControl,
  FullscreenControl,
  SearchControl,
  GeolocationControl,
  Placemark,
} from "react-yandex-maps";
import { BikeWhiteIcon } from "components/icons";
// import { useOrderCustomKbarActions } from "hooks";
import { IOrder, IProduct, IOrderDetails } from "interfaces";
import "./style.css";

import {
  Courier,
  CourierBoxContainer,
  CourierInfoBox,
  CourierInfoBoxText,
  CourierInfoText,
  PageHeader,
  Product,
  ProductFooter,
  ProductText,
} from "./styled";
import { OrderStatus } from "components/order/orderStatus";

const { useBreakpoint } = Grid;
const { Text } = Typography;

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const screens = useBreakpoint();
  const { queryResult } = useShow<IOrder>();

  const [coords, setCoords] = useState();
  const [mapState, setMapState] = useState({
    center: [41.2825125, 69.1392826],
    zoom: 9,
  });
  const { data } = queryResult;
  const { mutate } = useUpdate();
  const orderDetails = data?.data.details;
  const order = data?.data;

  const canAcceptOrder = order?.status === "NEW";
  const canRejectOrder =
    order?.status === "NEW" || order?.status === "APPROVED";

  const currentBreakPoints = Object.entries(screens)
    .filter((screen) => !!screen[1])
    .map((screen) => screen[0]);

  const onMapClick = (e: any) => {
    const coords = e.get("coords");
    // setCoords(coords);
    // setMapState({ coords: coords })
  };

  const renderOrderSteps = () => {
    //   const notFinishedCurrentStep = (event: IEvent, index: number) =>
    //       event.status !== "Cancelled" &&
    //       event.status !== "Delivered" &&
    //       record?.events.findIndex(
    //           (el) => el.status === record?.status?.text,
    //       ) === index;

    //   const stepStatus = (event: IEvent, index: number) => {
    //       if (!event.date) return "wait";
    //       if (event.status === "Cancelled") return "error";
    //       if (notFinishedCurrentStep(event, index)) return "process";
    //       return "finish";
    //   };

    const handleMutate = (status: { text: string }) => {
      if (order) {
        mutate({
          resource: "orders",
          id: order.id.toString(),
          values: {
            orderStatus: `${status.text}`,
          },
        });
      }
    };

    //   useOrderCustomKbarActions(record);

    return (
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={`Заказ номер: ${order?.id ?? ""}`}
        key={order?.id}
        // subTitle={`#${order?.id ?? ""}`}
        extra={[
          <Text>
            Статус заказа: <OrderStatus status={order?.status} />
          </Text>,
          <Button
            disabled={!canAcceptOrder}
            key="accept"
            icon={<CheckCircleOutlined />}
            type="primary"
            onClick={() =>
              handleMutate({
                text: "APPROVED",
              })
            }
          >
            Принимать
          </Button>,
          <Button
            disabled={!canRejectOrder}
            key="reject"
            danger
            icon={<CloseCircleOutlined />}
            onClick={() =>
              handleMutate({
                text: "CLOSED",
              })
            }
          >
            Отклонять
          </Button>,
        ]}
      >
        {/* <YMaps>
          <Map defaultState={defaultState}> */}
        {/* <Placemark geometry={[55.684758, 37.738521]} /> */}
        {/* <GeolocationControl options={{ float: "left" }} />
          </Map>
        </YMaps> */}
        {/* <Steps
                  direction={
                      currentBreakPoints.includes("lg")
                          ? "horizontal"
                          : "vertical"
                  }
                  current={record?.events.findIndex(
                      (el) => el.status === record?.status?.text,
                  )}
              >
                  {record?.events.map((event: IEvent, index: number) => (
                      <Steps.Step
                          status={stepStatus(event, index)}
                          key={index}
                          title={t(`enum.orderStatuses.${event.status}`)}
                          icon={
                              notFinishedCurrentStep(event, index) && (
                                  <LoadingOutlined />
                              )
                          }
                          description={
                              event.date && dayjs(event.date).format("L LT")
                          }
                      />
                  ))}
              </Steps>
              {!record && <Skeleton paragraph={{ rows: 1 }} />} */}
      </PageHeader>
    );
  };

  const courierInfoBox = (text: string, icon: ReactNode, value?: string) => (
    <CourierInfoBox>
      {icon}
      <CourierInfoBoxText>
        <Text style={{ color: "#ffffff" }}>{text.toUpperCase()}</Text>
        <Text style={{ color: "#ffffff" }}>{value}</Text>
      </CourierInfoBoxText>
    </CourierInfoBox>
  );

  const renderCourierInfo = () => (
    <Card>
      <Row justify="center">
        <Col xl={12} lg={10}>
          <Courier>
            <Avatar size={108} src={order?.customer.logotype[0].url} />
            <CourierInfoText>
              <Text style={{ fontSize: 16 }}>ЗАКАЗЧИК:</Text>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {order?.customer.businessType.name} {order?.customer.name}
              </Text>
              <Text>ID #{order?.customer.id}</Text>
            </CourierInfoText>
          </Courier>
        </Col>
        <CourierBoxContainer xl={12} lg={14} md={24}>
          {courierInfoBox(
            "Телефон",
            <MobileOutlined style={{ color: "#ffff", fontSize: 32 }} />,
            order?.customer.phone
          )}
          {courierInfoBox(
            "Адрес",
            <BikeWhiteIcon style={{ color: "#ffff", fontSize: 32 }} />,
            order?.customer.address
          )}
        </CourierBoxContainer>
        <Col xl={12} lg={10} className="customer-details">
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
        </Col>
        <Col xl={12} lg={10}></Col>
      </Row>
    </Card>
  );

  const renderDeliverables = () => (
    <List
      headerProps={{ style: { marginTop: 20 } }}
      canCreate={false}
      title={<Text style={{ fontSize: 22, fontWeight: 800 }}>Товары</Text>}
    >
      <Table
        pagination={false}
        dataSource={orderDetails}
        footer={(_data) => (
          <>
            <ProductFooter>
              <Text>Общие количество: </Text>
              <Text>{order?.totalQuantity} шт</Text>
            </ProductFooter>
            <ProductFooter>
              <Text>Сумма: </Text>
              <Text> {order?.totalAmount} ₸</Text>
            </ProductFooter>
            <ProductFooter>
              <Text>Скидка: </Text>
              <Text>
                -{" "}
                {order?.totalAmountWithDiscount
                  ? order?.totalAmount - order?.totalAmountWithDiscount
                  : 0}{" "}
                ₸
              </Text>
            </ProductFooter>
            <ProductFooter>
              <Text style={{ fontSize: "18px", color: "#1677ff" }}>
                Итого:{" "}
              </Text>
              <Text style={{ fontSize: "18px" }}>
                {" "}
                {order?.totalAmountWithDiscount} ₸
              </Text>
            </ProductFooter>
          </>
        )}
      >
        <Table.Column<IOrderDetails>
          defaultSortOrder="descend"
          sorter={(a: IOrderDetails, b: IOrderDetails) =>
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
                src={record.product.mainPhoto[0].url}
              />
              <ProductText>
                <Text style={{ fontWeight: 700 }}>{record.product.title}</Text>
                <Text>#{record.id}</Text>
              </ProductText>
            </Product>
          )}
        />
        <Table.Column<IOrderDetails>
          title="Количество"
          dataIndex="quantity"
          sorter={(a: IOrderDetails, b: IOrderDetails) =>
            a.quantity - b.quantity
          }
          render={(value, record) => (
            <Text style={{ fontWeight: 800 }}>{record.quantity} шт</Text>
          )}
        />
        <Table.Column<IOrderDetails>
          defaultSortOrder="descend"
          sorter={(a: IOrderDetails, b: IOrderDetails) => a.price - b.price}
          dataIndex="price"
          title="Цена"
          render={(value, record) => (
            <Text style={{ fontWeight: 800 }}>{record?.price} ₸</Text>
          )}
        />
        <Table.Column<IOrderDetails>
          defaultSortOrder="descend"
          sorter={(a: IOrderDetails, b: IOrderDetails) =>
            a.discount - b.discount
          }
          dataIndex="price"
          align="center"
          title="Скидка"
          render={(value, record) => (
            <Text style={{ fontWeight: 800 }}>
              {record?.discount != 0 ? <>{record?.discount} %</> : <>-</>}
            </Text>
          )}
        />
        <Table.Column<IOrderDetails>
          defaultSortOrder="descend"
          sorter={(a: IOrderDetails, b: IOrderDetails) =>
            a.discount - b.discount
          }
          dataIndex="price"
          align="center"
          title="Цена со скидкой"
          render={(value, record) => (
            <Text style={{ fontWeight: 800 }}>
              {record?.discount != 0 ? (
                <>{record?.priceWithDiscount} ₸</>
              ) : (
                <>-</>
              )}
            </Text>
          )}
        />
        <Table.Column<IOrderDetails>
          defaultSortOrder="descend"
          sorter={(a: IOrderDetails, b: IOrderDetails) =>
            a.price * a.quantity - b.price * b.quantity
          }
          dataIndex="price"
          title="Итого"
          render={(value, record) => (
            <Text style={{ fontWeight: 800 }}>
              {record?.discount != 0 ? (
                <>{record?.sumWithDiscount} ₸</>
              ) : (
                <>{record.sum} ₸</>
              )}
            </Text>
          )}
        />
      </Table>
    </List>
  );
  console.log(order);

  return (
    <>
      <Space size={20} direction="vertical" style={{ width: "100%" }}>
        {renderOrderSteps()}
        {/* <div style={{ height: "500px", width: "100%" }}>
          <Map
                        center={{
                            lat: 40.73061,
                            lng: -73.935242,
                        }}
                        zoom={9}
                    >
                        <MapMarker
                            key={`user-marker-${record?.user.id}`}
                            icon={{
                                url: "/images/marker-location.svg",
                            }}
                            position={{
                                lat: Number(record?.adress.coordinate[0]),
                                lng: Number(record?.adress.coordinate[1]),
                            }}
                        />
                        <MapMarker
                            key={`user-marker-${record?.user.id}`}
                            icon={{
                                url: "/images/marker-courier.svg",
                            }}
                            position={{
                                lat: Number(
                                    record?.store.address.coordinate[0],
                                ),
                                lng: Number(
                                    record?.store.address.coordinate[1],
                                ),
                            }}
                        />
                    </Map>
        </div> */}
        {renderCourierInfo()}
      </Space>
      {renderDeliverables()}
      <>
        {/* <Map
          modules={["Placemark", "geocode", "geoObject.addon.balloon"]}
          onClick={onMapClick}
          state={mapState}
          width="100%"
          height="500px"
        >
          {coords ? <Placemark geometry={coords} /> : null}
          <ZoomControl />
          <FullscreenControl />
          <SearchControl />
          <GeolocationControl />
        </Map> */}
      </>
    </>
  );
};
