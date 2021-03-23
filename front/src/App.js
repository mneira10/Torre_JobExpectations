import React, { useState } from "react";
import SearchJob from "./SearchJob/SearchJob";
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
  Box,
} from "@material-ui/core";
import "./App.css";
const themeDark = createMuiTheme({
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
      // contrastText: "#fff"
    },
    secondary: {
      main: "#b593ff",
    },
    action: {
      disabledBackground: '#007d60',
      disabled: '#000',
    },
  },
  toggle: {
    thumbOnColor: 'yellow',
    trackOnColor: 'red'
  }
});
function App() {
  const [location, setLocation] = useState(null);
  const [role, setRole] = useState(null);
  const [salaryRange, setSalaryRange] = useState(null);

  function renderContent() {
    if (location === null && role === null && salaryRange === null) {
      return (
        <SearchJob stateSetters={{ setLocation, setRole, setSalaryRange }} />
      );
    }

    return (
      <h1>
        we have parameters!! {location}, {role}, {salaryRange}
      </h1>
    );
  }

  return (
    <MuiThemeProvider theme={themeDark}>
      <CssBaseline />
      <Box m={5}>{renderContent()}</Box>
    </MuiThemeProvider>
  );
}

export default App;
