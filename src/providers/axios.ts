import { HttpError } from "@refinedev/core";
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

axiosInstance.defaults.headers.common = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export { axiosInstance };
