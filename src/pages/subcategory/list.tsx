import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import { useTable, List, EditButton, ShowButton } from "@refinedev/antd";
import { Table, Space } from "antd";
import { useCustom, useApiUrl } from "@refinedev/core";

export const SubcategoryList: React.FC<IResourceComponentsProps> = () => {
  const apiURL = useApiUrl();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  //   const { data, isLoading } = useCustom({
  //     url: `${apiURL}/subcategory`,
  //     method: "get",
  //     config: {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     },
  //   });
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex={["category", "title"]} title="Категория" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column dataIndex="photo" title="Photo" />
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
