import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "../queries/useIsAuthenticated";
import { useEffect } from "react";

export const useRedirectToMainIfAuthenticated = () => {
  const { isLoading, isError } = useIsAuthenticated();

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError]);

  return {
    isLoading,
  };
};
