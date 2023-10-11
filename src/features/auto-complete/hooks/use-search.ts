import { useMutation } from "@tanstack/react-query";

import { search, SearchData, SearchParams } from "../../../api/search";

type Props = {
  onSuccess?: (data: SearchData) => void;
  onError?: (error: unknown) => void;
};

export const useSearch = ({ onSuccess, onError }: Props) => {
  const mutation = useMutation<SearchData, unknown, SearchParams>(search, {
    onSuccess(data) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return mutation;
};
