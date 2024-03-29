import { isResponseOK, $http, asyncDo } from "../api/http";
import type { IOrder, IOderForm } from "./interface/orders";
/**
 * 
 * 取得訂單列表
 */
export const apiGetOrders = async () => {
    const [response, error] = await asyncDo($http<IOrder>("get", "/orders"));
    if (!isResponseOK(error, response)) {
        return null;
    }
    return response?.result;
};

/**
 * 
 * 取得單一訂單
 */
export const apiGetOrder = async (id: string) => {
    const [response, error] = await asyncDo($http<IOrder>("get", `/orders/${id}`));
    if (!isResponseOK(error, response)) {
        return null;
    }
    return response?.result;
};


/**
 * 
 * 新增訂單
 */
export const apiAddOrder = async (data: IOderForm) => {
    const [response, error] = await asyncDo($http<IOrder>("post", "/orders", data));
    if (!isResponseOK(error, response)) {
        return null;
    }
    return response;
};

/**
 * 
 * 刪除訂單
 */

export const apiDeleteOrder = async (id: string) => {
    const [response, error] = await asyncDo($http<IOrder>("delete", `/orders/${id}`));
    if (!isResponseOK(error, response)) {
        return null;
    }
    return response;
};