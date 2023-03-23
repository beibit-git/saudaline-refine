import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  BaseKey,
  useGetIdentity,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  SaveButton,
  useEditableTable,
  useDrawerForm,
  BooleanField,
} from "@refinedev/antd";
import { FormOutlined, MoreOutlined } from "@ant-design/icons";
import {
  Table,
  Space,
  Form,
  Button,
  Input,
  Checkbox,
  Dropdown,
  Menu,
  Avatar,
  Grid,
} from "antd";
import { ICategories, ISubcategory, IUser } from "interfaces";

export const CategoriesList: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity<IUser>();
  console.log(user?.id);
  // const { tableProps } = ;
  const {
    tableProps,
    formProps,
    isEditing,
    saveButtonProps,
    cancelButtonProps,
    setId: setEditId,
  } = useEditableTable<ICategories>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    filters: {
      initial: [
        {
          field: "userId",
          operator: "eq",
          value: user?.id,
        },
      ],
    },
  });

  const moreMenu = (record: ICategories) => (
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
        icon={
          <FormOutlined
            style={{
              color: "#52c41a",
              fontSize: 17,
              fontWeight: 500,
            }}
          />
        }
        onClick={() => {
          setEditId?.(record.id as BaseKey);
        }}
      >
        Редактировать
      </Menu.Item>
    </Menu>
  );

  const breakpoint = Grid.useBreakpoint();

  return (
    <List>
      <Form {...formProps}>
        <Table
          {...tableProps}
          expandable={{
            expandedRowRender: !breakpoint.xs ? expandedRowRender : undefined,
          }}
          rowKey="id"
          onRow={(record) => ({
            // eslint-disable-next-line
            onClick: (event: any) => {
              if (event.target.nodeName === "TD") {
                setEditId && setEditId(record.id);
              }
            },
          })}
        >
          <Table.Column dataIndex="id" title="id" />
          <Table.Column
            key="title"
            dataIndex="title"
            title="Заголовок"
            render={(value, data: ICategories) => {
              if (isEditing(data.id)) {
                return (
                  <Form.Item name="title" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return value;
            }}
          />
          <Table.Column
            key="isActive"
            dataIndex="isActive"
            title="Статус"
            /*  render={(value) => <BooleanField value={value} />} */
            render={(value, data: ICategories) => {
              if (isEditing(data.id)) {
                return (
                  <Form.Item
                    name="isActive"
                    style={{ margin: 0 }}
                    valuePropName="checked"
                  >
                    <Checkbox />
                  </Form.Item>
                );
              }
              return <BooleanField value={value} />;
            }}
          />
          <Table.Column
            key="description"
            dataIndex="description"
            title="Описание"
            render={(value, data: ICategories) => {
              if (isEditing(data.id)) {
                return (
                  <Form.Item name="description" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return value;
            }}
          />
          <Table.Column
            title="Действия"
            key="actions"
            align="center"
            dataIndex="actions"
            render={(_text, record) => {
              if (isEditing((record as BaseRecord).id as BaseKey)) {
                return (
                  <Space>
                    <SaveButton {...saveButtonProps} size="small">
                      Сохранить
                    </SaveButton>
                    <Button {...cancelButtonProps} size="small">
                      Отмена
                    </Button>
                  </Space>
                );
              }
              return (
                <Dropdown
                  overlay={moreMenu(record as ICategories)}
                  trigger={["click"]}
                >
                  <MoreOutlined
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: 24,
                    }}
                  />
                </Dropdown>
              );
            }}
          />
        </Table>
      </Form>
    </List>
  );
};

const CategorySubcategoryTable: React.FC<{ record: ICategories }> = ({
  record,
}) => {
  const {
    tableProps,
    formProps,
    isEditing,
    saveButtonProps,
    cancelButtonProps,
    setId: setEditId,
  } = useEditableTable<ISubcategory>({
    resource: "subcategory",
    initialSorter: [
      {
        field: "title",
        order: "asc",
      },
    ],
    permanentFilter: [
      {
        field: "catId",
        operator: "eq",
        value: record.id,
      },
    ],
    syncWithLocation: false,
  });

  const moreMenu = (record: ISubcategory) => (
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
        icon={
          <FormOutlined
            style={{
              color: "#52c41a",
              fontSize: 17,
              fontWeight: 500,
            }}
          />
        }
        onClick={() => {
          setEditId?.(record.id as BaseKey);
        }}
      >
        Редактировать
      </Menu.Item>
    </Menu>
  );

  const breakpoint = Grid.useBreakpoint();

  return (
    <List title="Подкатегории">
      <Form {...formProps}>
        <Table
          {...tableProps}
          rowKey="id"
          onRow={(record) => ({
            // eslint-disable-next-line
            onClick: (event: any) => {
              if (event.target.nodeName === "TD") {
                setEditId && setEditId(record.id);
              }
            },
          })}
        >
          <Table.Column
            key="title"
            dataIndex="title"
            title="Заголовок"
            render={(value, data: ICategories) => {
              if (isEditing(data.id)) {
                return (
                  <Form.Item name="title" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return value;
            }}
          />
          <Table.Column
            key="isActive"
            dataIndex="isActive"
            title="Статус"
            render={(value) => <BooleanField value={value} />}
          />
          <Table.Column
            key="description"
            dataIndex="description"
            title="Описание"
            render={(value, data: ICategories) => {
              if (isEditing(data.id)) {
                return (
                  <Form.Item name="description" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return value;
            }}
          />
          <Table.Column
            title="Действия"
            key="actions"
            align="center"
            dataIndex="actions"
            render={(_text, record) => {
              if (isEditing((record as BaseRecord).id as BaseKey)) {
                return (
                  <Space>
                    <SaveButton {...saveButtonProps} size="small">
                      Сохранить
                    </SaveButton>
                    <Button {...cancelButtonProps} size="small">
                      Отмена
                    </Button>
                  </Space>
                );
              }
              return (
                <Dropdown
                  overlay={moreMenu(record as ISubcategory)}
                  trigger={["click"]}
                >
                  <MoreOutlined
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: 24,
                    }}
                  />
                </Dropdown>
              );
            }}
          />
        </Table>
      </Form>
    </List>
  );
};

const expandedRowRender = (record: ICategories) => {
  return <CategorySubcategoryTable record={record} />;
};
