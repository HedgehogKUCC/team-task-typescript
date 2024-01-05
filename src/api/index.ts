import axios from "axios";

const API_BASE_URL = "https://freyja-8dr3.onrender.com/api";

const userRequest = axios.create({
  baseURL: `${API_BASE_URL}/v1/user`,
});

const verifyRequest = axios.create({
  baseURL: `${API_BASE_URL}/v1/verify`,
});

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

export const apiUserSignUp = (data: IApiUserSignUpData) =>
  userRequest.post("/signup", data);
export const apiUserLogin = (data: { email: string; password: string }) =>
  userRequest.post("/login", data);
export const apiUserForgotPassword = (data: {
  email: string;
  code: string;
  newPassword: string;
}) => userRequest.post("/forgot", data);

export const apiVerifyEmail = (data: { email: string }) =>
  verifyRequest.post("/email", data);
export const apiVerifyGenerateEmailCode = (data: { email: string }) =>
  verifyRequest.post("/generateEmailCode", data);
