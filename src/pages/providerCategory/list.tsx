import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  ImageField,
  TextField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

import { IProviderCategory } from "interfaces";

export const ProviderCategoryList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column<IProviderCategory>
          key="photo.id"
          dataIndex={["photo", "url"]}
          title="Картинка"
          render={(_, record) => {
            return (
              <ImageField
                value={record.photo[0]?.url}
                title={record.photo[0]?.name}
                width={100}
              />
            );
          }}
        />
        <Table.Column dataIndex="nameKz" title="Название на казахском языке" />
        <Table.Column dataIndex="nameRu" title="Название на русском языке" />
        <Table.Column dataIndex="nameEn" title="Название на английском языке" />
        <Table.Column
          title="Действия"
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
