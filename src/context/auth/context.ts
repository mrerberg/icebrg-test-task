import { createContext } from "react";

import { LoginData } from "../../api/login";

type AuthContextType = {
  user: LoginData | null;
  setUser: (user: LoginData) => void;
  logout: (callback?: VoidFunction) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
