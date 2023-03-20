import axios from "axios";
import type { AuthBindings } from "@refinedev/core";
import Constants from "common/constants";

const axiosInstance = axios.create();

const authProvider: AuthBindings = {
  login: async (data: { email: any; password: any; login?: any }) => {
    data["login"] = data.email;

    const response = await axios.post(`${Constants.API_BASE_URL}`, data);

    axiosInstance.defaults.headers.common = {
      Authorization: `Bearer 123`,
    };

    if (response.data.isActive) {
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
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return {};
  },
};

export default authProvider;
