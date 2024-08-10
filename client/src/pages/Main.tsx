import { useIsAuthenticated } from "../hooks/queries/useIsAuthenticated";

export const Main = () => {
  useIsAuthenticated();

  return <>메인페이지</>;
};
