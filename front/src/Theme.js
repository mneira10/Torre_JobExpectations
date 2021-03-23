import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export const themeDark = responsiveFontSizes(
  createMuiTheme({
    palette: {
      background: {
        default: "#252525",
        paper: "#424242",
      },
      text: {
        primary: "#ffffff",
        secondary: "#aaaaaa",
      },
      primary: {
        main: "#00e9b1",
      },
      secondary: {
        main: "#b593ff",
      },
      action: {
        disabledBackground: "#007d60",
        disabled: "#000",
      },
    },
  })
);
