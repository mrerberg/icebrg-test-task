import { useMutation } from "@tanstack/react-query";

import { login, LoginData, LoginParams } from "../../../api/login";

type Props = {
  onSuccess?: (data: LoginData) => void;
  onError?: (error: unknown) => void;
};

export const useLogin = ({ onSuccess, onError }: Props) => {
  const mutation = useMutation<LoginData, unknown, LoginParams>(login, {
    onSuccess(data) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return mutation;
};
