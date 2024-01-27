import axios from "axios";
import interceptorRequest from "./utils/interceptorRequest";
import { IApiUserUpdateData } from "./interface/user.ts";

const API_BASE_URL = "https://freyja-8dr3.onrender.com/api";

const userRequest = axios.create({
  baseURL: `${API_BASE_URL}/v1/user`,
});

const verifyRequest = axios.create({
  baseURL: `${API_BASE_URL}/v1/verify`,
});

const homeRequest = axios.create({
  baseURL: `${API_BASE_URL}/v1/home`,
});

const roomsRequest = axios.create({
  baseURL: `${API_BASE_URL}/v1/rooms`,
});

const ordersRequest = axios.create({
  baseURL: `${API_BASE_URL}/v1/orders`,
});

interceptorRequest(userRequest);
interceptorRequest(ordersRequest);

interface IApiUserSignUpData {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  address: {
    zipcode: number;
    detail: string;
  };
}

// Users - 使用者
export const apiUserSignUp = (data: IApiUserSignUpData) =>
  userRequest.post("/signup", data);
export const apiUserLogin = (data: { email: string; password: string }) =>
  userRequest.post("/login", data);
export const apiUserForgotPassword = (data: {
  email: string;
  code: string;
  newPassword: string;
}) => userRequest.post("/forgot", data);
export const apiUserData = () => userRequest.get("/");
export const apiUserUpdate = (data: IApiUserUpdateData) =>
  userRequest.put("/", data);

// Verify - 驗證
export const apiVerifyEmail = (data: { email: string }) =>
  verifyRequest.post("/email", data);
export const apiVerifyGenerateEmailCode = (data: { email: string }) =>
  verifyRequest.post("/generateEmailCode", data);

// Home - 首頁
export const apiHomeNews = () => homeRequest.get("/news");
export const apiHomeCulinary = () => homeRequest.get("/culinary");

// Rooms - 房型
export const apiRoomsList = () => roomsRequest.get("/");

// Orders- 訂單
export const apiOrdersList = () => ordersRequest.get("/");
export const apiOrderDelete = (id: string) => ordersRequest.delete(`/${id}`);
