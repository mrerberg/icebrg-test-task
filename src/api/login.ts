import { apiClient } from "../common/api/http-client";

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginData = {
  id: number;
  email: string;
  username: string;
  name: string;
  roles: string[];
  locale: string;
  access_token: string;
  refresh_token: string;
};

export const login = async (params: LoginParams) => {
  const result = await apiClient.post<LoginData>("/login", {
    email: params.email,
    password: params.password,
  });

  return result.data;
};
