import React, { useState } from "react";
import SearchJobSkills from "./SearchJobSkills/SearchJobSkills";
import { MuiThemeProvider, CssBaseline, Box } from "@material-ui/core";
import { themeDark } from "./Theme";
import { maxSalaryInYears } from "./Constants";
import SkillResults from "./SearchJobSkills/SkillResults";

function App() {
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [salaryRange, setSalaryRange] = useState({
    range: [0, maxSalaryInYears],
    periodicity: "YEARLY",
  });
  const [userSearched, setUserSearched] = useState(false);
  const searchParamState = {
    setLocation,
    location,
    setRole,
    role,
    setSalaryRange,
    salaryRange,
  };

  function renderContent() {
    if (!userSearched) {
      return (
        <SearchJobSkills
          searchParamState={searchParamState}
          searchJobs={() => setUserSearched(true)}
        />
      );
    }

    return <SkillResults searchParamState={searchParamState} />;
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
