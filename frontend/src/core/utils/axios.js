import axios from 'axios';

import { authService } from '../services/auth';

// const BASE_API_URL = process.env.REACT_APP_BACKEND_BASE_URL;
const BASE_API_URL = process.env.REACT_APP_BACKEND_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_API_URL
});

const requestInterceptor = axiosInstance.interceptors.request.use(
  function (config) {
    const token = authService.getUserToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    config.params = {
      ...config.params
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const responseInterceptor = axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const erroCodesToLogout = [401, 403];
    if (erroCodesToLogout.includes(error.response.status)) {
      await authService.logout();
    }
    if (error.response.status === 404) {
      return (window.location.href = '/not-found');
    }
    return Promise.reject(error.response);
  }
);

axios.interceptors.request.eject(requestInterceptor);
axios.interceptors.request.eject(responseInterceptor);

export default axiosInstance;
