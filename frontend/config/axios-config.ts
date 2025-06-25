// only use for client side
// use for request get
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refreshToken } from '@/apiService/auth/action';
const axiosInstance = axios.create({
  baseURL: `${process.env.BACKEND_URL}/api/v1`,
  timeout: 40 * 1000, // Thời gian chờ tối đa (40 giây)
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json', // Định dạng JSON mặc định
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;
    if (error.response?.status === 401) {
      await refreshToken();
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
