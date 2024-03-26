import * as React from "react";

import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { CssBaseline as MUICSSBaseline } from "@mui/material";

const MuiContext = ({ children }) => {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: "#cf0909",
          },
          secondary: {
            main: "#cf0909",
          },
        },
      })}
    >
      <MUICSSBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiContext;
