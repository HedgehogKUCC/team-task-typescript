import { isResponseOK, $http, asyncDo } from "../api/http";
import type { IApiUserLoginResponseData } from "./interface/user";

/**
 * 
 * 登入
 */
export const apiUserLogin = async (email: string, password: string) => {
    const [response, error] = await asyncDo(
        $http<IApiUserLoginResponseData>("post", "/user/login", { email, password })
    );
    if (!isResponseOK(error, response)) {
        return null;
    }
    return response;
};

/**
 * 
 * 取得使用者資料
 */
export const apiGetUserData = async () => {
    const [response, error] = await asyncDo($http<IApiUserLoginResponseData>("get", "/user"));
    if (!isResponseOK(error, response)) {
        return null;
    }
    return response;
};

/**
 * 
 * 驗證是否登入
 */

export const apiVerifyUserLogin = async () => {
    const [response, error] = await asyncDo($http<{ state: boolean; token: string }>("get", "/user/check"));
    if (!isResponseOK(error, response)) {
        return null;
    }
    return response;
};