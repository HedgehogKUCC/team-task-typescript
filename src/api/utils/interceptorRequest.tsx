import { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";

export default function interceptorRequest(axiosCreate: AxiosInstance) {
  axiosCreate.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (localStorage.getItem("enjoyment_luxury_hotel_token")) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          "enjoyment_luxury_hotel_token",
        )}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );
}
