import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useNavigation,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  TextField,
} from "@refinedev/antd";
import { OrderActions } from "components/order/orderActions";
import { OrderStatus } from "components/order/orderStatus";
import { IOrder } from "interfaces";
import { Table, Space } from "antd";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
  const { show } = useNavigation();
  const user = localStorage.getItem("user");
  const { id } = JSON.parse(user!);
  const userId = id;
  const { tableProps } = useTable<IOrder>({
    syncWithLocation: true,
    filters: {
      initial: [
        {
          field: "userId",
          operator: "eq",
          value: userId,
        },
      ],
    },
  });

  return (
    <List canCreate={false}>
      <Table
        {...tableProps}
        rowKey="id"
        onRow={(record) => {
          return {
            onClick: () => {
              show("orders", record.id);
            },
          };
        }}
      >
        <Table.Column dataIndex="id" title="Номер" />
        <Table.Column
          dataIndex="status"
          title="Статус заказа"
          render={(value) => {
            return <OrderStatus status={value} />;
          }}
        />
        <Table.Column
          dataIndex="totalAmount"
          title="Общая сумма (₸)"
          render={(value) => {
            return <p>{value} ₸</p>;
          }}
        />
        <Table.Column
          dataIndex="totalQuantity"
          title="Количество"
          render={(value) => {
            return <p>{value} шт</p>;
          }}
        />
        <Table.Column dataIndex={["customer", "name"]} title="Заказщик" />
        <Table.Column
          dataIndex={["created"]}
          title="Дата поступления"
          render={(value: any) => (
            <DateField format="DD-MM-YYYY HH:mm" value={value} />
          )}
        />
        <Table.Column<IOrder>
          fixed="right"
          title="Действия"
          dataIndex="actions"
          key="actions"
          align="center"
          render={(_value, record) => <OrderActions record={record} />}
        />
      </Table>
    </List>
  );
};
