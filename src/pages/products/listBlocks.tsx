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
} from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

const { Text } = Typography;

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const {
    listProps,
    searchFormProps: searchFormPropsList,
    filters: filtersList,
  } = useSimpleList<
    IProduct,
    HttpError,
    { name: string; categories: string[] }
  >({
    pagination: { pageSize: 12, current: 1 },
    onSearch: ({ name, categories }) => {
      const productFilters: CrudFilters = [];

      productFilters.push({
        field: "category.id",
        operator: "in",
        value: categories?.length > 0 ? categories : undefined,
      });

      productFilters.push({
        field: "name",
        operator: "contains",
        value: name ? name : undefined,
      });

      return productFilters;
    },
  });

  const { tableProps, sorter, searchFormProps, filters } = useTable<
    IProduct,
    HttpError,
    IProductFilterVariables
  >({
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
          {/* <Form.Item name="categories">
                <ProductCategoryFilter />
              </Form.Item> */}
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
            <AntdList
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
            />
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
    resource: "provider/",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: getDefaultFilter("provider.id", filters),
  });

  // const { selectProps: categorySelectProps } = useSelect<ICategory>({
  //   resource: "categories",
  // });

  // const { selectProps: orderSelectProps } = useSelect<IOrderStatus>({
  //   resource: "orderStatuses",
  //   optionLabel: "text",
  //   optionValue: "text",
  //   defaultValue: getDefaultFilter("status.text", filters),
  // });

  // const { selectProps: userSelectProps } = useSelect<IUser>({
  //   resource: "users",
  //   optionLabel: "fullName",
  //   defaultValue: getDefaultFilter("user.id", filters),
  // });

  const { RangePicker } = DatePicker;

  const createdAt = useMemo(() => {
    const start = getDefaultFilter("createdAt", filters, "gte");
    const end = getDefaultFilter("createdAt", filters, "lte");

    const startFrom = dayjs(start);
    const endAt = dayjs(end);

    if (start && end) {
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
        provider: getDefaultFilter("provider.id", filters),
        // user: getDefaultFilter("user.id", filters),
        // status: getDefaultFilter("status.text", filters, "in"),
        createdAt,
      }}
    >
      <Row gutter={[10, 0]} align="bottom">
        <Col xl={24} md={8} sm={12} xs={24}>
          <Form.Item label="Фильтр товароа" name="q">
            <Input placeholder="Поиск" prefix={<SearchOutlined />} />
          </Form.Item>
        </Col>
        {/* <Col xl={24} md={8} sm={12} xs={24}>
            <Form.Item label={t("orders.filter.status.label")} name="status">
              <Select
                {...orderSelectProps}
                allowClear
                mode="multiple"
                placeholder={t("orders.filter.status.placeholder")}
              />
            </Form.Item>
          </Col> */}
        <Col xl={24} md={8} sm={12} xs={24}>
          <Form.Item label="Поставщик" name={["provider_id"]}>
            <Select
              {...providerSelectProps}
              allowClear
              placeholder="Поставщик"
            />
          </Form.Item>
        </Col>
        {/* <Col xl={24} md={8} sm={12} xs={24}>
            <Form.Item label={t("orders.filter.user.label")} name="user">
              <Select
                {...userSelectProps}
                allowClear
                placeholder={t("orders.filter.user.placeholder")}
              />
            </Form.Item>
          </Col> */}
        <Col xl={24} md={8} sm={12} xs={24}>
          <Form.Item label="По дате создание" name="createdAt">
            <RangePicker style={{ width: "100%" }} />
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
