import { useMemo, useState } from "react";

import { LoginData } from "../../api/login";

import { AuthContext } from "./context";
import {
  setAuthorizationToken,
  setRefreshToken,
} from "../../common/auth/auth-tokens";

type Props = { children: React.ReactNode };

// NOTE: Вообще, апи не самое удобное. Потому что обычно,
// ручка логина возвращает именно токены и есть другая ручка для данных пользователя
// Как я бы сделал:
// - На беке есть две ручи для токенов и юзера
// - Бек бы сеттил секьюрные куки
// - Фронт бы к своим запросам бы подкидывал эти куки
// - Если падает запрос на получение юзера - значит, нужно снова логиниться
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<LoginData | null>(null);

  const logout = () => {
    setUser(null);
  };

  const setUserData = (user: LoginData) => {
    setUser(user);
    setAuthorizationToken(user.access_token);
    setRefreshToken(user.refresh_token);
  };

  const value = useMemo(
    () => ({
      user,
      setUser: setUserData,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
