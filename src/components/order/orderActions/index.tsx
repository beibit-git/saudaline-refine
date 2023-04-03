import { useTranslate, useUpdate } from "@refinedev/core";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { IOrder } from "interfaces";

enum IOrderStatus {
  "NEW",
  "APPROVED",
  "CANCELED",
  "CLOSED",
}

type OrderActionProps = {
  record: IOrder;
};

export const OrderActions: React.FC<OrderActionProps> = ({ record }) => {
  const t = useTranslate();
  const { mutate } = useUpdate();

  const moreMenu = (record: IOrder) => (
    <Menu
      mode="vertical"
      onClick={({ domEvent }) => domEvent.stopPropagation()}
    >
      <Menu.Item
        key="accept"
        style={{
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        disabled={record.status !== "NEW"}
        icon={
          <CheckCircleOutlined
            style={{
              color: "#52c41a",
              fontSize: 17,
              fontWeight: 500,
            }}
          />
        }
        onClick={() => {
          mutate({
            resource: "orders",
            id: record.id,
            values: {
              orderStatus: "APPROVED",
            },
          });
        }}
      >
        Принимать
      </Menu.Item>
      <Menu.Item
        key="reject"
        style={{
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        icon={
          <CloseCircleOutlined
            style={{
              color: "#EE2A1E",
              fontSize: 17,
            }}
          />
        }
        disabled={record.status === "CLOSED" || record.status === "CANCELED"}
        onClick={() =>
          mutate({
            resource: "orders",
            id: record.id,
            values: {
              orderStatus: "CANCELED",
            },
          })
        }
      >
        Отклонять
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={moreMenu(record)} trigger={["click"]}>
      <MoreOutlined
        onClick={(e) => e.stopPropagation()}
        style={{
          fontSize: 24,
        }}
      />
    </Dropdown>
  );
};
