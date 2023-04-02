import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
} from "@refinedev/antd";
import { OrderActions } from "components/order/orderActions";
import { IOrder } from "interfaces";
import { Table, Space } from "antd";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
  const user = localStorage.getItem("user");
  const { id } = JSON.parse(user!);
  const userId = id;
  const { tableProps } = useTable({
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
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Номер" />
        <Table.Column dataIndex="status" title="Статус заказа" />
        <Table.Column dataIndex="totalAmount" title="Общая сумма (₸)" />
        <Table.Column dataIndex="totalQuantity" title="Количество" />
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
        {/* <Table.Column
          title="Действия"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        /> */}
      </Table>
    </List>
  );
};
