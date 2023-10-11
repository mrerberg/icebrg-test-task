let authToken = "";

export const setAuthorizationToken = (token: string) => {
  authToken = token;
};

export const getAuthorizationToken = () => {
  return authToken;
};

let refreshToken = "";

export const setRefreshToken = (token: string) => {
  refreshToken = token;
};

export const getRefreshToken = () => {
  return refreshToken;
};
