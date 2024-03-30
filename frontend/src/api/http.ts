import axios, { AxiosError, isAxiosError } from "axios";
import { toast } from "sonner";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

http.interceptors.response.use(null, (error: AxiosError) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.error("Unexpected Error Occured!!!");
  }
  return Promise.reject(error);
});

export default http;

export const isHttpError = isAxiosError;
