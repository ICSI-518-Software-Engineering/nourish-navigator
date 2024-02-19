import axios, { isAxiosError } from "axios";

const http = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export default http;

export const isHttpError = isAxiosError;
