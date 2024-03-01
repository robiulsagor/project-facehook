import { useEffect } from "react";
import { api } from "../api";
import useAuth from "./useAuth";
import axios from "axios";

export default function useAxios() {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        config.headers.Authorization = `Beared ${authToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post("/auth/refresh-token", {
              refreshToken,
            });

            const { token, refreshToken: newRefreshToken } = response.data;
            setAuth({
              ...auth,
              authToken: token,
              refreshToken: newRefreshToken,
            });

            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.request.eject(responseInterceptor);
    };
  }, [api.authToken]);

  return { api };
}
