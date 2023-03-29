import React from "react";
import { IResourceComponentsProps, BaseRecord, BaseKey } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  ImageField,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { IBrands } from "interfaces";

export const BrandsList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column<IBrands>
          key="logo.id"
          dataIndex={["logo", "url"]}
          title="Картинка"
          render={(_, record) => {
            return (
              <ImageField
                value={record.logo[0]?.url}
                title={record.logo[0]?.name}
                width={100}
              />
            );
          }}
        />
        <Table.Column dataIndex="name" title="Название" />
        <Table.Column
          title="Действия"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              {/* <ShowButton hideText size="small" recordItemId={record.id} /> */}
              <DeleteButton
                hideText
                size="small"
                recordItemId={(record as BaseRecord).id as BaseKey}
                resource="brands"
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
