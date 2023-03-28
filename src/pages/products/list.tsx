import {
  useTranslate,
  IResourceComponentsProps,
  CrudFilters,
  HttpError,
  getDefaultFilter,
} from "@refinedev/core";

import {
  useSimpleList,
  useTable,
  CreateButton,
  useDrawerForm,
  useSelect,
  List,
  TextField,
  ImageField,
} from "@refinedev/antd";
import { CreateProduct, ProductItem, EditProduct } from "components/product";

import { IProduct, IProvider, IProductFilterVariables } from "interfaces";
import { SearchOutlined } from "@ant-design/icons";
import {
  Row,
  List as AntdList,
  Col,
  Form,
  Input,
  Typography,
  Select,
  Button,
  FormProps,
  DatePicker,
  Card,
  Table,
} from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";
import { image } from "@uiw/react-md-editor";

const { Text } = Typography;

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const {
    listProps,
    searchFormProps: searchFormProps,
    filters: filters,
  } = useSimpleList<
    IProduct,
    HttpError,
    // { name: string; categories: string[] }
    IProductFilterVariables
  >({
    pagination: { pageSize: 12, current: 1 },
    onSearch: (params) => {
      const filters: CrudFilters = [];
      // const { q, store, user, createdAt, status } = params;
      const { q, provider, createdAt } = params;

      filters.push({
        field: "q",
        operator: "eq",
        value: q,
      });

      filters.push({
        field: "provider.id",
        operator: "eq",
        value: provider,
      });

      filters.push(
        {
          field: "createsDate",
          operator: "gte",
          value: createdAt
            ? createdAt[0].startOf("day").toISOString()
            : undefined,
        },
        {
          field: "createsDate",
          operator: "lte",
          value: createdAt
            ? createdAt[1].endOf("day").toISOString()
            : undefined,
        }
      );

      return filters;
    },
    // onSearch: ({ name, categories }) => {
    //   const productFilters: CrudFilters = [];

    //   productFilters.push({
    //     field: "category.id",
    //     operator: "in",
    //     value: categories?.length > 0 ? categories : undefined,
    //   });

    //   productFilters.push({
    //     field: "name",
    //     operator: "contains",
    //     value: name ? name : undefined,
    //   });

    //   return productFilters;
    // },
  });

  const {
    tableProps,
    sorter,
    searchFormProps: searchFormPropsTable,
    filters: filtersTable,
  } = useTable<IProduct, HttpError, IProductFilterVariables>({
    onSearch: (params) => {
      const filters: CrudFilters = [];
      // const { q, store, user, createdAt, status } = params;
      const { q, provider, createdAt } = params;

      filters.push({
        field: "q",
        operator: "eq",
        value: q,
      });

      filters.push({
        field: "provider.id",
        operator: "eq",
        value: provider,
      });

      // filters.push({
      //     field: "user.id",
      //     operator: "eq",
      //     value: user,
      // });

      // filters.push({
      //     field: "status.text",
      //     operator: "in",
      //     value: status,
      // });

      filters.push(
        {
          field: "createsDate",
          operator: "gte",
          value: createdAt
            ? createdAt[0].startOf("day").toISOString()
            : undefined,
        },
        {
          field: "createsDate",
          operator: "lte",
          value: createdAt
            ? createdAt[1].endOf("day").toISOString()
            : undefined,
        }
      );

      return filters;
    },
  });

  const {
    drawerProps: createDrawerProps,
    formProps: createFormProps,
    saveButtonProps: createSaveButtonProps,
    show: createShow,
  } = useDrawerForm<IProduct>({
    action: "create",
    resource: "product",
    redirect: false,
  });

  const {
    drawerProps: editDrawerProps,
    formProps: editFormProps,
    saveButtonProps: editSaveButtonProps,
    show: editShow,
    id: editId,
  } = useDrawerForm<IProduct>({
    action: "edit",
    resource: "product",
    redirect: false,
  });

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col
          xl={6}
          lg={24}
          xs={24}
          style={{
            marginTop: "52px",
          }}
        >
          <Card title="Фильтр">
            <Filter formProps={searchFormProps} filters={filters || []} />
          </Card>
        </Col>
        <Col xl={18} xs={24}>
          <Form
            {...searchFormProps}
            onValuesChange={() => {
              searchFormProps.form?.submit();
            }}
            initialValues={{
              name: getDefaultFilter("name", filters, "contains"),
              categories: getDefaultFilter("category.id", filters, "in"),
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <Text style={{ fontSize: "24px" }} strong>
                Товары
              </Text>
              <Form.Item name="name" noStyle>
                <Input
                  style={{
                    width: "400px",
                  }}
                  placeholder="Поиск товара"
                  suffix={<SearchOutlined />}
                />
              </Form.Item>

              <CreateButton onClick={() => createShow()}>
                Добавить товар
              </CreateButton>
            </div>
            {/* <AntdList
              grid={{
                gutter: 8,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 5,
              }}
              style={{
                height: "100%",
                // overflow: "auto",
                paddingRight: "4px",
              }}
              {...listProps}
              renderItem={(item) => (
                <ProductItem item={item} editShow={editShow} />
              )}
            /> */}
            <List
            // headerProps={{
            //   extra: <Actions />,
            // }}
            >
              <Table
                {...tableProps}
                rowKey="id"
                onRow={(record) => {
                  return {
                    // onClick: () => {
                    //   show("orders", record.id);
                    // },
                  };
                }}
              >
                <Table.Column
                  key="id"
                  dataIndex="id"
                  title="id"
                  render={(value) => <TextField value={value} />}
                />
                {/* <Table.Column<IProduct>
                  key="status.text"
                  dataIndex={["status", "text"]}
                  title={t("orders.fields.status")}
                  render={(value) => {
                    return <OrderStatus status={value} />;
                  }}
                  defaultSortOrder={getDefaultSortOrder("status.text", sorter)}
                  sorter
                /> */}
                <Table.Column<IProduct>
                  key="mainPhoto.id"
                  dataIndex={["mainPhoto", "url"]}
                  title="Фото"
                  render={(_, record) => {
                    console.log(record.mainPhoto[0].url);
                    return (
                      <ImageField
                        value={record.mainPhoto[0].url}
                        title={record.mainPhoto[0].name}
                        width={100}
                      />
                    );
                  }}
                />
                {/* { title: '', dataIndex: 'flag', key: 'flag', render: flag => ( <img src={'${flag}'} style={{ height: '10%' }} /> ), width: '15%', } */}
                <Table.Column
                  key="title"
                  dataIndex={["title"]}
                  title="Названия"
                />
                <Table.Column
                  align="right"
                  key="amount"
                  dataIndex="amount"
                  title="Количество"
                  // defaultSortOrder={getDefaultSortOrder("amount", sorter)}
                  sorter
                  // render={(value) => {
                  //   return (
                  //     <NumberField
                  //       options={{
                  //         currency: "USD",
                  //         style: "currency",
                  //       }}
                  //       value={value / 100}
                  //     />
                  //   );
                  // }}
                />

                <Table.Column
                  key="provider.id"
                  dataIndex={["provider", "name"]}
                  title="Поставщик"
                />
                <Table.Column
                  key="category.id"
                  dataIndex={["category", "title"]}
                  title="Категория"
                />
                <Table.Column<IProduct>
                  key="price"
                  dataIndex="price"
                  title="Цена"
                  // render={(_, record) => (
                  //   <Popover
                  //     content={
                  //       <ul>
                  //         {record.products.map((product) => (
                  //           <li key={product.id}>{product.name}</li>
                  //         ))}
                  //       </ul>
                  //     }
                  //     title="Products"
                  //     trigger="hover"
                  //   >
                  //     {t("orders.fields.itemsAmount", {
                  //       amount: record.products.length,
                  //     })}
                  //   </Popover>
                  // )}
                />
                {/* <Table.Column
                  key="createdAt"
                  dataIndex="createdAt"
                  title={t("orders.fields.createdAt")}
                  render={(value) => <DateField value={value} format="LLL" />}
                  sorter
                /> */}
                {/* <Table.Column<IOrder>
                  fixed="right"
                  title={t("table.actions")}
                  dataIndex="actions"
                  key="actions"
                  align="center"
                  render={(_value, record) => <OrderActions record={record} />}
                /> */}
              </Table>
            </List>
          </Form>
        </Col>
      </Row>
      <CreateProduct
        drawerProps={createDrawerProps}
        formProps={createFormProps}
        saveButtonProps={createSaveButtonProps}
      />
      <EditProduct
        drawerProps={editDrawerProps}
        formProps={editFormProps}
        saveButtonProps={editSaveButtonProps}
        editId={editId}
      />
    </div>
  );
};

const Filter: React.FC<{ formProps: FormProps; filters: CrudFilters }> = (
  props
) => {
  const t = useTranslate();

  const { formProps, filters } = props;
  const { selectProps: providerSelectProps } = useSelect<IProvider>({
    resource: "provider",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: getDefaultFilter("provider.id", filters),
  });

  const { RangePicker } = DatePicker;

  const createdAt = useMemo(() => {
    const start = getDefaultFilter("createdAt", filters, "gte");
    const end = getDefaultFilter("createdAt", filters, "lte");

    const startFrom = dayjs(start).format("DD/MM/YYYY");
    const endAt = dayjs(end).format("DD/MM/YYYY");

    if (start && end) {
      console.log(startFrom, endAt);
      return [startFrom, endAt];
    }
    return undefined;
  }, [filters]);

  return (
    <Form
      layout="vertical"
      {...formProps}
      initialValues={{
        q: getDefaultFilter("q", filters),
        store: getDefaultFilter("store.id", filters),
        user: getDefaultFilter("user.id", filters),
        status: getDefaultFilter("status.text", filters, "in"),
        createdAt,
      }}
    >
      <Row gutter={[10, 0]} align="bottom">
        <Col xl={24} md={8} sm={12} xs={24}>
          <Form.Item label="Фильтр товароа" name="q">
            <Input placeholder="Поиск" prefix={<SearchOutlined />} />
          </Form.Item>
        </Col>
        <Col xl={24} md={8} sm={12} xs={24}>
          <Form.Item label="Поставщик" name="store">
            <Select
              {...providerSelectProps}
              allowClear
              placeholder="Поставщик"
            />
          </Form.Item>
        </Col>
        <Col xl={24} md={8} sm={12} xs={24}>
          <Form.Item label="По дате создание" name="createdAt">
            <RangePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
        </Col>
        <Col xl={24} md={8} sm={12} xs={24}>
          <Form.Item>
            <Button htmlType="submit" type="primary" size="large" block>
              Применить фильтр
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
