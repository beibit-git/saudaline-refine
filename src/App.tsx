import { Refine } from "@refinedev/core";
import { Layout, notificationProvider, ErrorComponent } from "@refinedev/antd";
import routerBindings, {
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AntdInferencer } from "@refinedev/inferencer/antd";

import "@refinedev/antd/dist/reset.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerBindings}
        dataProvider={dataProvider("http://localhost:8080/api/v1")}
        notificationProvider={notificationProvider}
        resources={[
          {
            name: "region",
            list: "/region",
            show: "/region/show/:id",
            create: "/region/create",
            edit: "/region/edit/:id",
            meta: {
              canDelete: true,
            },
          },
          {
            name: "categories",
            list: "/categories",
            show: "/categories/show/:id",
            create: "/categories/create",
            edit: "/categories/edit/:id",
            meta: {
              canDelete: true,
            },
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="region">
              <Route index element={<AntdInferencer />} />
              <Route path="show/:id" element={<AntdInferencer />} />
              <Route path="edit/:id" element={<AntdInferencer />} />
              <Route path="create" element={<AntdInferencer />} />
            </Route>
            <Route path="categories">
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
