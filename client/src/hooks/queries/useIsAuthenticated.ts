import { QueryFunction, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios-instance";

const getIsAuthenticated: QueryFunction = () =>
  axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/auth/is-authenticated`
  );

export const useIsAuthenticated = () => {
  return useQuery({
    queryKey: ["isAuthenticated"],
    queryFn: getIsAuthenticated,
    retry: false,
    staleTime: 0,
  });
};
