import { IResourceComponentsProps, usePermissions } from "@refinedev/core";

import {
  List,
  useTable,
  EditButton,
  DateField,
  DeleteButton,
} from "@refinedev/antd";

import { Table, Space } from "antd";

import { ICategory } from "interfaces";
import { useCan } from "@refinedev/core";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable<ICategory>();
  const { data: permissionsData } = usePermissions();
  const { data: canAccess } = useCan({
    resource: "categories",
    action: "field",
    params: { field: "actions" },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" key="title" sorter />
        <Table.Column
          dataIndex="createdAt"
          key="createdAt"
          title="Created At"
          render={(value) => <DateField value={value} format="LLL" />}
          sorter
        />
        {canAccess?.can && (
          <Table.Column<ICategory>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton size="small" hideText recordItemId={record.id} />
                <DeleteButton size="small" hideText recordItemId={record.id} />
              </Space>
            )}
          />
        )}
      </Table>
    </List>
  );
};
