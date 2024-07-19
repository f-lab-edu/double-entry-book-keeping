import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { PropsWithChildren } from "react";

const defaultTheme = createTheme();

export const MaterialUiProviders = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
