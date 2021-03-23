import React, { useState } from "react";
import SearchJob from "./SearchJob/SearchJob";
import {
  MuiThemeProvider,
  CssBaseline,
  Box,
} from "@material-ui/core";
import "./App.css";
import { themeDark } from "./Theme";


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
      <Box m={5} display="flex" justifyContent="center">
        {renderContent()}
      </Box>
    </MuiThemeProvider>
  );
}

export default App;
