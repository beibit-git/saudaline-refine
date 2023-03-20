import { CanAccess, Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import "@refinedev/antd/dist/reset.css";

import { Header, Title } from "components";
import {
  CategoryList,
  CategoryCreate,
  CategoryEdit,
  CategoryShow,
} from "pages/categories";
import authProvider from "providers/authProvider";
import accessControlProvider from "providers/accessControlProvider";
import Constants from "common/constants";

const API_URL = Constants.API_BASE_URL!;
const App: React.FC = () => {
  return (
    <BrowserRouter basename="/admin">
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
              <Route index element={<AntdInferencer />} />
              <Route path="create" element={<AntdInferencer />} />
              <Route path="edit/:id" element={<AntdInferencer />} />
              <Route path="show/:id" element={<AntdInferencer />} />
            </Route>
            <Route path="region">
              <Route index element={<AntdInferencer />} />
              <Route path="show/:id" element={<AntdInferencer />} />
              <Route path="edit/:id" element={<AntdInferencer />} />
              <Route path="create" element={<AntdInferencer />} />
            </Route>

            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
        <UnsavedChangesNotifier />
      </Refine>
    </BrowserRouter>
  );
};

export default App;
