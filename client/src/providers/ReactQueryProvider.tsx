import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../axios-instance";

const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const location = useLocation();

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        location.pathname !== "/sign-in" &&
        location.pathname !== "/sign-up" &&
        error.response.status == 401
      ) {
        navigate("/sign-in");
      }
      return Promise.reject(error);
    }
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
