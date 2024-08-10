import { MutationFunction, useMutation } from "@tanstack/react-query";
import { axiosInstance, CustomAxiosError } from "../../axios-instance";

interface Variables {
  id: string;
  password: string;
}

const mutationFn: MutationFunction<unknown, Variables> = async ({
  id,
  password,
}) => {
  await axiosInstance.post(
    `${process.env.REACT_APP_API_BASE_URL}/auth/signin`,
    {
      id,
      password,
    }
  );
};

export const useSignInMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: CustomAxiosError) => void;
}) => {
  return useMutation<unknown, CustomAxiosError, Variables, unknown>({
    mutationFn,
    onSuccess,
    onError,
  });
};
