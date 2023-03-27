import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  BaseKey,
  useGetIdentity,
  useDelete,
} from "@refinedev/core";
import {
  List,
  EditButton,
  SaveButton,
  useEditableTable,
  useDrawerForm,
  BooleanField,
  CreateButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space, Form, Button, Input, Checkbox, Grid } from "antd";
import { SubcategoryCreate } from "../../components/subcategory/create";
import { ICategories, ISubcategory, IUser } from "interfaces";

export const CategoriesList: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity<IUser>();
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
        field: "title",
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
              // console.log(value);
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
                <Space>
                  <EditButton
                    hideText
                    size="small"
                    onClick={() => {
                      setEditId?.((record as BaseRecord).id as BaseKey);
                    }}
                  />
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={(record as BaseRecord).id as BaseKey}
                  />
                </Space>
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
  const { mutate: mutateDelete } = useDelete();
  const {
    tableProps,
    formProps,
    isEditing,
    saveButtonProps,
    cancelButtonProps,
    sorters,
    setId: setEditId,
  } = useEditableTable<ISubcategory>({
    resource: "subcategory",
    permanentFilter: [
      {
        field: "catId",
        operator: "eq",
        value: record.id,
      },
    ],
    syncWithLocation: false,
  });

  const {
    drawerProps: createDrawerProps,
    formProps: createFormProps,
    saveButtonProps: createSaveButtonProps,
    show: createShow,
  } = useDrawerForm<ISubcategory>({
    action: "create",
    resource: "subcategory",
    redirect: false,
  });

  const breakpoint = Grid.useBreakpoint();

  return (
    <List
      title="Подкатегории"
      headerButtons={
        <CreateButton onClick={() => createShow()}>
          Создать подкатегорию
        </CreateButton>
      }
    >
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
            // render={(value) => <BooleanField value={value} />}
            render={(value, data: ISubcategory) => {
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
                <Space>
                  <EditButton
                    hideText
                    size="small"
                    onClick={() => {
                      setEditId?.((record as BaseRecord).id as BaseKey);
                    }}
                  />
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={(record as BaseRecord).id as BaseKey}
                    resource="subcategory"
                  />
                </Space>
              );
            }}
          />
        </Table>
      </Form>
      <SubcategoryCreate
        drawerProps={createDrawerProps}
        formProps={createFormProps}
        saveButtonProps={createSaveButtonProps}
      />
    </List>
  );
};

const expandedRowRender = (record: ICategories) => {
  return <CategorySubcategoryTable record={record} />;
};
