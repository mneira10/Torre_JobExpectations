import React, { useState } from "react";
import SearchJobSkills from "./SearchJobSkills/SearchJobSkills";
import { MuiThemeProvider, CssBaseline, Box } from "@material-ui/core";
import { themeDark } from "./Theme";
import { maxSalaryInYears } from "./Constants";

function App() {
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [salaryRange, setSalaryRange] = useState({
    range: [0, maxSalaryInYears],
    periodicity: "YEARLY",
  });
  const [userSearched, setUserSearched] = useState(false);

  function searchJobs() {
    console.log(location, role, salaryRange);

    setUserSearched(true);
  }

  function renderContent() {
    if (!userSearched) {
      return (
        <SearchJobSkills
          searchParamState={{
            setLocation,
            location,
            setRole,
            role,
            setSalaryRange,
            salaryRange,
          }}
          searchJobs={searchJobs}
        />
      );
    }

    return <h1>we have parameters!!</h1>;
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
