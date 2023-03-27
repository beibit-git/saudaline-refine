import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ProductList2: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column dataIndex={["brand", "name"]} title="Brand" />
        <Table.Column dataIndex="mainPhoto" title="Main Photo" />
        <Table.Column dataIndex="photos" title="Photos" />
        <Table.Column dataIndex={["unitType", "name"]} title="Unit Type" />
        <Table.Column dataIndex="hits" title="Hits" />
        <Table.Column
          dataIndex={["createsDate"]}
          title="Creates Date"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column dataIndex={["category", "title"]} title="Category" />
        <Table.Column
          dataIndex={["subCategory", "title"]}
          title="Sub Category"
        />
        <Table.Column dataIndex={["provider", "name"]} title="Provider" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
