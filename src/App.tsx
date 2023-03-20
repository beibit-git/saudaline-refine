import { CanAccess, Refine } from "@refinedev/core";
import { notificationProvider, Layout, ErrorComponent } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { newEnforcer } from "casbin";
import "@refinedev/antd/dist/reset.css";

import { model, adapter } from "accessControl";
import { Header } from "components/header";
import {
  CategoryList,
  CategoryCreate,
  CategoryEdit,
  CategoryShow,
} from "pages/categories";
import authProvider from "providers/authProvider";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  const role = "editor";

  return (
    <BrowserRouter basename="/admin">
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        authProvider={authProvider}
        accessControlProvider={{
          can: async ({ action, params, resource }) => {
            const enforcer = await newEnforcer(model, adapter);
            if (action === "delete" || action === "edit" || action === "show") {
              return Promise.resolve({
                can: await enforcer.enforce(
                  role,
                  `${resource}/${params?.id}`,
                  action
                ),
              });
            }
            if (action === "field") {
              return Promise.resolve({
                can: await enforcer.enforce(
                  role,
                  `${resource}/${params?.field}`,
                  action
                ),
              });
            }
            return {
              can: await enforcer.enforce(role, resource, action),
            };
          },
        }}
        resources={[
          {
            name: "categories",
            list: "/categories",
            show: "/categories/show/:id",
            create: "/categories/create",
            edit: "/categories/edit/:id",
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
              <Layout Header={() => <Header role={role} />}>
                <CanAccess>
                  <Outlet />
                </CanAccess>
              </Layout>
            }
          >
            <Route index element={<NavigateToResource resource="posts" />} />

            <Route path="/categories">
              <Route index element={<CategoryList />} />
              <Route path="create" element={<CategoryCreate />} />
              <Route path="edit/:id" element={<CategoryEdit />} />
              <Route path="show/:id" element={<CategoryShow />} />
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
