import Swal from "sweetalert2";
import axios, { AxiosRequestConfig, Method } from 'axios';
import { ErrorResponse } from "react-router-dom";
const API_BASE_URL = "https://freyja-8dr3.onrender.com/api/v1";




const ajax = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: 60 * 1000,
});

ajax.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("enjoyment_luxury_hotel_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export async function $http<T = any>(
    method: Method,
    url: string,
    ...payload: any[]
): Promise<T> {

    const requestData: AxiosRequestConfig = { url, method };

    if (method == 'get' || method == 'GET') {
        requestData.params = payload[0];
    } else {
        requestData.data = payload[0];
        requestData.params = payload[1];
    }

    try {
        const response = await ajax.request(requestData);
        return response.data;
    } catch (err: any) {
        if (err.response) {
            throw err.response;
        }
        throw err;
    }
}
export const asyncDo = <T, E = any>(promise: Promise<T>): Promise<[T | null, E | null]> => {
    return promise
        .then<[T | null, E | null]>((res) => [res, null])
        .catch<[T | null, E | null]>((err) => [null, err]);
};

export const isResponseOK = (error: ErrorResponse, response: any, alerError: boolean = true) => {
    if (error) {
        if (alerError) {
            Swal.fire({
                title: "提示",
                text: error.data.message,
                icon: "warning",
                confirmButtonText: "確認",
            });
        }
        if (error.status === 401 || error.status === 403) {
            Swal.fire({
                title: "提示",
                text: "登入逾時，請重新登入",
                icon: "warning",
                confirmButtonText: "確認",
            });
            //三秒後跳轉至登入頁面
            setTimeout(() => {
                localStorage.removeItem("enjoyment_luxury_hotel_token");
                localStorage.removeItem("enjoyment_luxury_hotel_user");

            }, 3000);

        }
        return false;
    }
    if (response && response.data && 'status' in response.data && !response.data.status) {
        if (alerError) {
            alert(response.data.message);
        }
        return false;
    }
    return true;
};