import { AutoComplete } from "../features/auto-complete";
import { useAuth } from "../context/auth/use-auth";
import { LoginForm } from "../features/login-form";

import "./styles.css";

export const App = () => {
  const auth = useAuth();

  if (!auth.user) {
    return <LoginForm />;
  }

  return <AutoComplete />;
};
