import { CanAccess, Refine, HttpError } from "@refinedev/core";
import axios, { InternalAxiosRequestConfig } from "axios";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import "@refinedev/antd/dist/reset.css";
import dataProvider from "@refinedev/simple-rest";
import { Header, Title } from "components";
// import { axiosInstance } from "./providers/axios";
import {
  CategoriesList,
  CategoriesCreate,
  CategoriesEdit,
  CategoriesShow,
} from "pages/categories";
import {
  ProductList,
  ProductCreate,
  ProductEdit,
  ProductShow,
} from "pages/products";
import { OrderList, OrderShow } from "pages/orders";
import { BrandsList, BrandsCreate, BrandsEdit, BrandsShow } from "pages/brands";
import {
  ProviderCategoryList,
  ProviderCategoryCreate,
  ProviderCategoryEdit,
  ProviderCategoryShow,
} from "pages/providerCategory";
import { YMaps } from "react-yandex-maps";
import { RegionList } from "pages/regions";
import authProvider from "providers/authProvider";
import accessControlProvider from "providers/accessControlProvider";
import Constants from "common/constants";
const axiosInstance = axios.create();
const API_URL = Constants.API_BASE_URL!;

const App: React.FC = () => {
  //   axiosInstance.interceptors.request.use((request: any) => {
  //     request.headers.set('Authorization', `Bearer ${localStorage.getItem("token")}`);
  //     return request;
  // }
  // );

  // axiosInstance.defaults.headers.common = {
  //   Authorization: `Bearer ${localStorage.getItem("token")}`,
  // };
  axiosInstance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      request.headers.set({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });

      return request;
    }
  );

  return (
    <BrowserRouter basename="/admin">
      <YMaps>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          authProvider={authProvider}
          accessControlProvider={accessControlProvider}
          resources={[
            {
              name: "categories",
              list: "/categories",
              show: "/categories/show/:id",
              create: "/categories/create",
              edit: "/categories/edit/:id",
              meta: {
                label: "Категории",
                canDelete: true,
              },
            },
            {
              name: "region",
              list: "/region",
              show: "/region/show/:id",
              create: "/region/create",
              edit: "/region/edit/:id",
              meta: {
                label: "Регионы",
                canDelete: true,
              },
            },
            {
              name: "product",
              list: "/product",
              show: "/product/show/:id",
              create: "/product/create",
              edit: "/product/edit/:id",
              meta: {
                label: "Товары",
                canDelete: true,
              },
            },
            {
              name: "provider-category",
              list: "/provider-category",
              show: "/provider-category/show/:id",
              create: "/provider-category/create",
              edit: "/provider-category/edit/:id",
              meta: {
                label: "Категория поставщика",
                canDelete: true,
              },
            },
            {
              name: "brands",
              list: "/brands",
              show: "/brands/show/:id",
              create: "/brands/create",
              edit: "/brands/edit/:id",
              meta: {
                label: "Торговая марка",
                canDelete: true,
              },
            },
            {
              name: "orders",
              list: "/orders",
              show: "/orders/show/:id",
              create: "/orders/create",
              edit: "/orders/edit/:id",
              meta: {
                label: "Заказы",
                canDelete: true,
              },
            },
          ]}
          notificationProvider={notificationProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Layout Title={Title} Header={() => <Header />}>
                  <CanAccess>
                    <Outlet />
                  </CanAccess>
                </Layout>
              }
            >
              <Route index element={<NavigateToResource resource="posts" />} />
              <Route path="/categories">
                <Route index element={<CategoriesList />} />
                <Route path="create" element={<CategoriesCreate />} />
                <Route path="edit/:id" element={<CategoriesEdit />} />
                <Route path="show/:id" element={<CategoriesShow />} />
              </Route>
              <Route path="region">
                <Route index element={<RegionList />} />
                <Route path="show/:id" element={<AntdInferencer />} />
                <Route path="edit/:id" element={<AntdInferencer />} />
                <Route path="create" element={<AntdInferencer />} />
              </Route>
              <Route path="provider-category">
                <Route index element={<ProviderCategoryList />} />
                <Route path="show/:id" element={<ProviderCategoryShow />} />
                <Route path="edit/:id" element={<ProviderCategoryEdit />} />
                <Route path="create" element={<ProviderCategoryCreate />} />
              </Route>
              <Route path="brands">
                <Route index element={<BrandsList />} />
                <Route path="show/:id" element={<BrandsShow />} />
                <Route path="edit/:id" element={<BrandsEdit />} />
                <Route path="create" element={<BrandsCreate />} />
              </Route>
              <Route path="product">
                <Route index element={<ProductList />} />
                <Route path="show/:id" element={<ProductShow />} />
                <Route path="edit/:id" element={<ProductEdit />} />
                <Route path="create" element={<ProductCreate />} />
              </Route>
              <Route path="orders">
                <Route index element={<OrderList />} />
                <Route path="show/:id" element={<OrderShow />} />
                <Route path="edit/:id" element={<AntdInferencer />} />
                <Route path="create" element={<AntdInferencer />} />
              </Route>

              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
        </Refine>
      </YMaps>
    </BrowserRouter>
  );
};

export default App;
