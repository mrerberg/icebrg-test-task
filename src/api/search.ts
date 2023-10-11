import { apiClient } from "../common/api/http-client";

export type SearchParams = {
  query: string;
};

export type SearchData = {
  continents: {
    code: string;
    name: string;
  }[];
  countries: {
    code: string;
    name: string;
    native: string;
    phone: string;
    continent: string;
    capital: string;
    currency: string;
    languages: string;
  }[];
  languages: {
    code: string;
    name: string;
    native: string;
    rtl: boolean;
  }[];
};

export const search = async (params: SearchParams) => {
  const result = await apiClient.post<SearchData>("/search", {
    query: params.query,
  });

  return result.data;
};
