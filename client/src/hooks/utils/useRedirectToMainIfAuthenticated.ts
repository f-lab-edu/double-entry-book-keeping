import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "../queries/useIsAuthenticated";
import { useEffect } from "react";

export const useRedirectToMainIfAuthenticated = () => {
  const { isSuccess, isLoading } = useIsAuthenticated();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  return {
    isLoading,
  };
};
