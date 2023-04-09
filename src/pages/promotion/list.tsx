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
  console.log(tableProps);
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
        <Table.Column
          dataIndex={["isActive"]}
          align="center"
          title="Является активным"
          render={(value: any) => <BooleanField value={value} />}
        />
        <Table.Column
          dataIndex={["startDate"]}
          align="center"
          title="Дата начала"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["finishDate"]}
          align="center"
          title="Дата окончания"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex="products"
          align="center"
          title="Товары"
          render={(value: any[]) =>
            isLoading ? (
              <>Loading...</>
            ) : (
              <>
                {value?.length}
                {/* {value?.map((item, index) => (
                  <>
                    <TagField key={index} value={item.title} />
                  </>
                ))} */}
              </>
            )
          }
        />
        <Table.Column dataIndex={["provider", "name"]} title="Поставщик" />
      </Table>
    </List>
  );
};
