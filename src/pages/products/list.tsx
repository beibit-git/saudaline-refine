import {
  useTranslate,
  IResourceComponentsProps,
  CrudFilters,
  HttpError,
  getDefaultFilter,
  useExport,
  useNavigation,
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
  ExportButton,
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
  const { show } = useNavigation();
  const user = localStorage.getItem("user");
  const { id } = JSON.parse(user!);
  const userId = id;
  const {
    tableProps,
    sorter,
    searchFormProps: searchFormProps,
    filters: filters,
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
    filters: {
      initial: [
        {
          field: "userId",
          operator: "eq",
          value: userId,
        },
      ],
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

  const { isLoading, triggerExport } = useExport<IProduct>({
    sorter,
    filters,
    pageSize: 50,
    maxItemCount: 50,
    mapData: (item) => {
      return {
        id: item.id,
        // amount: item.amount,
        // orderNumber: item.orderNumber,
        // status: item.status.text,
        provider: item.provider.name,
        // user: item.user.firstName,
      };
    },
  });

  const Actions: React.FC = () => (
    <ExportButton onClick={triggerExport} loading={isLoading} />
  );

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
          <List
            headerButtons={
              <CreateButton onClick={() => createShow()}>
                Добавить товар
              </CreateButton>
            }
            // headerProps={{
            //   extra: <Actions />,
            // }}
          >
            <Table
              {...tableProps}
              rowKey="id"
              onRow={(record) => {
                return {
                  onClick: () => {
                    show("product", record.id);
                  },
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
                  return (
                    <ImageField
                      value={record.mainPhoto[0].url}
                      title={record.mainPhoto[0].name}
                      width={100}
                    />
                  );
                }}
              />
              <Table.Column
                key="title"
                dataIndex={["title"]}
                title="Названия"
              />
              <Table.Column
                key="category.id"
                dataIndex={["category", "title"]}
                title="Категория"
              />
              <Table.Column
                key="category.id"
                dataIndex={["subcategory", "title"]}
                title="Подкатегория"
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

              {/* <Table.Column
                key="provider.id"
                dataIndex={["provider", "name"]}
                title="Поставщик"
              /> */}

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
            </Table>
          </List>
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
