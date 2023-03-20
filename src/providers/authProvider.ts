import axios from "axios";
import type { AuthBindings } from "@refinedev/core";
import Constants from "common/constants";
import { AESEncrypt, AESDecrypt } from "../common/Crypto-Helper";

const axiosInstance = axios.create();

const authProvider: AuthBindings = {
  login: async (data: { email: any; password: any; login?: any }) => {
    data["login"] = data.email;

    const response = await axios.post(`${Constants.API_BASE_URL}`, data);

    axiosInstance.defaults.headers.common = {
      Authorization: `Bearer 123`,
    };

    if (response.data.isActive) {
      const encryptedRole = AESEncrypt(response.data.role.roleName);
      response.data.role.roleName = encryptedRole;
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.headers["jwt-token"]);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: new Error("Invalid email or password"),
    };
  },
  check: async () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: new Error("User is not authenticated"),
    };
  },
  logout: async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      window.location.href = "/login";
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return {};
  },
  getPermissions: async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
    }
    const { role } = JSON.parse(user!);
    const roleName = AESDecrypt(role?.roleName);
    return roleName;
  },
  getIdentity: async () => {
    // const token = localStorage.getItem(TOKEN_KEY);
    // if (!token) {
    //     return null;
    // }

    return {
      id: 1,
      name: "James Sullivan",
      avatar: "https://i.pravatar.cc/150",
    };
  },
};

export default authProvider;
