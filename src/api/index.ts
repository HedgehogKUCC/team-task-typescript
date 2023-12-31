import axios from "axios";

const API_BASE_URL = "https://freyja-8dr3.onrender.com/api";

const verifyRequest = axios.create({
  baseURL: `${API_BASE_URL}/v1/verify`,
});

export const apiVerifyEmail = (data: { email: string }) =>
  verifyRequest.post("/email", data);
