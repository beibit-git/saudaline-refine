import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useMany,
  useNavigation,
  BaseKey,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  BooleanField,
  DateField,
  TagField,
  ImageField,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { IProduct, IPromotion } from "interfaces";

export const PromotionList: React.FC<IResourceComponentsProps> = () => {
  const { show } = useNavigation();
  const { tableProps } = useTable<IPromotion>({
    syncWithLocation: true,
  });

  const productIds: BaseKey[] = [];

  tableProps?.dataSource?.map((item) => {
    item.products?.map((productItem: any) => {
      productIds.push(productItem.id);
    });
  });

  const { data, isLoading } = useMany<IProduct>({
    resource: "product",
    ids: productIds,
    queryOptions: {
      enabled: productIds.length > 0,
    },
  });

  return (
    <List>
      <Table
        {...tableProps}
        rowKey="id"
        onRow={(record) => {
          return {
            onClick: () => {
              show("promotion", record.id);
            },
          };
        }}
      >
        <Table.Column dataIndex="title" title="Наименование" />
        <Table.Column dataIndex="discount" title="Скидка" />
        <Table.Column
          dataIndex={["isActive"]}
          title="Является активным"
          render={(value: any) => <BooleanField value={value} />}
        />
        <Table.Column
          dataIndex={["startDate"]}
          title="Дата начала"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["finishDate"]}
          title="Дата окончания"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex="products"
          title="Товары"
          render={(value: any[]) =>
            isLoading ? (
              <>Loading...</>
            ) : (
              <>
                {value?.map((item, index) => (
                  <>
                    <TagField key={index} value={item.title} />
                  </>
                ))}
              </>
            )
          }
        />
        <Table.Column dataIndex={["provider", "name"]} title="Поставщик" />
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
