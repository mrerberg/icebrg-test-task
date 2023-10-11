import axios from "axios";
import {
  getAuthorizationToken,
  getRefreshToken,
  setAuthorizationToken,
  setRefreshToken,
} from "../auth/auth-tokens";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${getAuthorizationToken()}`;

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error?.response?.status === 401 &&
      !originalRequest.url.includes("/login/refresh")
    ) {
      originalRequest._retry = true;

      const refreshTokens = async () => {
        try {
          const response = await apiClient.post("/login/refresh", {
            refresh_token: getRefreshToken(),
          });

          setAuthorizationToken(response.data.access_token);
          setRefreshToken(response.data.access_token);

          return apiClient(originalRequest);
        } catch (error) {
          window.location.reload();
        }
      };

      await refreshTokens();
    }

    return Promise.reject(error);
  }
);
