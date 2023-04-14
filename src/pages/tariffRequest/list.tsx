import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import { useTable, List, DateField } from "@refinedev/antd";
import { Table, Space } from "antd";
import { TariffStatus } from "components/tariffRequest/tariffRequestStatus";
import { ITariffRequest } from "interfaces";
import { TariffActions } from "components/tariffRequest/tariffActions";

export const TariffRequestList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Ид" />
        <Table.Column dataIndex={["tariff", "title"]} title="Тариф" />
        <Table.Column dataIndex={["provider", "name"]} title="Поставщик" />
        <Table.Column
          dataIndex={["created"]}
          title="Время"
          render={(value: any) => (
            <DateField value={value} format="YYYY-MM-DD HH:MM" />
          )}
        />
        <Table.Column
          dataIndex="status"
          title="Статус"
          render={(value) => {
            return <TariffStatus status={value} />;
          }}
        />
        <Table.Column dataIndex="tel" title="Телефон" />
        <Table.Column dataIndex="sum" title="Сумма" />
        <Table.Column<ITariffRequest>
          fixed="right"
          title="Действия"
          dataIndex="actions"
          key="actions"
          align="center"
          render={(_value, record) => <TariffActions record={record} />}
        />
      </Table>
    </List>
  );
};
