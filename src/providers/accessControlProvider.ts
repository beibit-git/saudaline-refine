import { newEnforcer } from "casbin";
import { model, adapter } from "accessControl";
import type { AccessControlProvider } from "@refinedev/core";
import { AESDecrypt } from "../common/Crypto-Helper";

const user = localStorage.getItem("user");
if (!user) {
  window.location.href = "/login";
}
const { role } = JSON.parse(user!);
const roleName = AESDecrypt(role?.roleName);

const accessControlProvider = <AccessControlProvider>{
  can: async ({ action, params, resource }) => {
    const enforcer = await newEnforcer(model, adapter);
    if (action === "delete" || action === "edit" || action === "show") {
      return Promise.resolve({
        can: await enforcer.enforce(
          roleName,
          `${resource}/${params?.id}`,
          action
        ),
      });
    }
    if (action === "field") {
      return Promise.resolve({
        can: await enforcer.enforce(
          roleName,
          `${resource}/${params?.field}`,
          action
        ),
      });
    }
    return {
      can: await enforcer.enforce(roleName, resource, action),
    };
  },
};

export default accessControlProvider;
