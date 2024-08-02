import { Container } from "@mui/material";
import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return <Container maxWidth="xs">{children}</Container>;
};
