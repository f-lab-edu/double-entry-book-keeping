import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
});

export type CustomAxiosError = AxiosError<{
  error: string;
  message: string;
  statusCode: number;
}>;
