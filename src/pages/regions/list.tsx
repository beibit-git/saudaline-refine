import { IResourceComponentsProps, BaseRecord, BaseKey } from "@refinedev/core";
import { AntdInferencer } from "@refinedev/inferencer/antd";
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
import { CityCreate } from "components/city/create";
import { IUser, IRegion, ICity } from "interfaces";

export const RegionList: React.FC<IResourceComponentsProps> = () => {
  const {
    tableProps,
    formProps,
    isEditing,
    saveButtonProps,
    cancelButtonProps,
    setId: setEditId,
  } = useEditableTable<IRegion>({
    initialSorter: [
      {
        field: "nameRu",
        order: "desc",
      },
    ],
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
            key="nameRu"
            dataIndex="nameRu"
            title="Названия на русском"
            render={(value, data: IRegion) => {
              if (isEditing(data.id)) {
                return (
                  <Form.Item name="nameRu" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return value;
            }}
          />
          <Table.Column
            key="nameKz"
            dataIndex="nameKz"
            title="Названия на казахском"
            render={(value, data: IRegion) => {
              if (isEditing(data.id)) {
                return (
                  <Form.Item name="nameKz" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return value;
            }}
          />
          <Table.Column
            key="nameEn"
            dataIndex="nameEn"
            title="Названия на английском"
            render={(value, data: IRegion) => {
              if (isEditing(data.id)) {
                return (
                  <Form.Item name="nameEn" style={{ margin: 0 }}>
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

const RegionCityTable: React.FC<{ record: IRegion }> = ({ record }) => {
  const {
    tableProps,
    formProps,
    isEditing,
    saveButtonProps,
    cancelButtonProps,
    sorters,
    setId: setEditId,
  } = useEditableTable<ICity>({
    resource: "city",
    permanentFilter: [
      {
        field: "regionId",
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
  } = useDrawerForm<ICity>({
    action: "create",
    resource: "city",
    redirect: false,
  });

  const breakpoint = Grid.useBreakpoint();

  return (
    <List
      title="Города"
      headerButtons={
        <CreateButton onClick={() => createShow()}>Добавить город</CreateButton>
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
            key="name"
            dataIndex="name"
            title="Назания на казахском"
            render={(value, data: IRegion) => {
              if (isEditing(data.id)) {
                return (
                  <Form.Item name="name" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return value;
            }}
          />
          {/* <Table.Column
            key="nameKz"
            dataIndex="nameKz"
            title="Назания на казахском"
            render={(value, data: IRegion) => {
              if (isEditing(data.id)) {
                return (
                  <Form.Item name="nameKz" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return value;
            }}
          />
          <Table.Column
            key="nameRu"
            dataIndex="nameRu"
            title="Назания на русском"
            render={(value, data: IRegion) => {
              if (isEditing(data.id)) {
                return (
                  <Form.Item name="nameRu" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return value;
            }}
          />
          <Table.Column
            key="nameEn"
            dataIndex="nameEn"
            title="Назания на английском"
            render={(value, data: IRegion) => {
              if (isEditing(data.id)) {
                return (
                  <Form.Item name="nameEn" style={{ margin: 0 }}>
                    <Input />
                  </Form.Item>
                );
              }
              return value;
            }}
          /> */}
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
                    resource="city"
                  />
                </Space>
              );
            }}
          />
        </Table>
      </Form>
      <CityCreate
        drawerProps={createDrawerProps}
        formProps={createFormProps}
        saveButtonProps={createSaveButtonProps}
      />
    </List>
  );
};

const expandedRowRender = (record: IRegion) => {
  return <RegionCityTable record={record} />;
};
