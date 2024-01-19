import { isResponseOK, $http, asyncDo } from "../api/http";
import type { IRoomData } from "./interface/room";

/**
 * 
 * 取得房間列表
 */
export const apiGetRoomList = async () => {
    const [response, error] = await asyncDo($http<IRoomData>("get", "/rooms"));
    if (!isResponseOK(error, response)) {
        return null;
    }
    return response;
};

/**
 * 
 * 取得單一房間
 */
export const apiGetRoom = async (id: string) => {
    const [response, error] = await asyncDo($http<IRoomData>("get", `/rooms/${id}`));
    if (!isResponseOK(error, response)) {
        return null;
    }
    return response;
};