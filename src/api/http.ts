import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosRequestConfig, Method } from "axios";
import Swal from "sweetalert2";
import { redirect } from 'react-router';

const useApiHook = <T>(url: string, method: Method, payload?: AxiosRequestConfig) => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const apiBaseUrl = "https://freyja-8dr3.onrender.com/api/v1/";
    const ajax = axios.create({
        baseURL: apiBaseUrl,
        withCredentials: false,
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        timeout: 60 * 1000, // 請求超時時間 60 秒
    });

    ajax.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const requestData: AxiosRequestConfig = { url, method };

                if (method == 'get' || method == 'GET') {
                    requestData.params = payload;
                } else {
                    requestData.data = payload;
                }
                const response: AxiosResponse<T> = await ajax.request<T>(requestData);

                setData(response.data);
                setLoading(false);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.response.status == 403) {
                    Swal.fire({
                        title: '登入逾時',
                        text: '請重新登入',
                        icon: 'warning',
                        confirmButtonText: '確認'
                    }).then(() => {
                        redirect('/login'); // 重新導向到登入頁面
                    });
                } else {
                    Swal.fire({
                        title: '提示',
                        text: error.response.data.message,
                        icon: 'warning',
                        confirmButtonText: '確認'
                    }).then(() => {
                        redirect('/login'); // 重新導向到登入頁面
                    });

                }
                setError("Error getting the data");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useApiHook;