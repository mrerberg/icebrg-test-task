export const errorsMap: Record<string, { name: string; errors: string[] }> = {
  ERR_BAD_REQUEST: {
    name: "email",
    errors: ["Аккаунта с таким email не существует"],
  },
  INVALID_CREDENTIALS: {
    name: "password",
    errors: ["Неверный пароль"],
  },
};
