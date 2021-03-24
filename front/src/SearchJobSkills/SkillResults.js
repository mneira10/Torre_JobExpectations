import React, { useState } from "react";
import { Box, Button, Typography, Card, CardContent } from "@material-ui/core";
import TextFieldInputCard from "../InputCards/TextFieldInputCard";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WorkIcon from "@material-ui/icons/Work";
import SalaryInputCard from "../InputCards/SalaryInput";
import SkillResultCard from "./SkillResultCard";
import SearchUserGenome from "./SearchUserGenome";
import CompareSkills from "./CompareSkills";

export default function SkillResults(props) {
  const [compare, setCompare] = useState(false);
  const [genomeUsername, setGenomeUsername] = useState("");

  function renderCompareResults() {
    return !compare ? null : <CompareSkills genomeUsername={genomeUsername} />;
  }

  return (
    <Box
      width={"80%"}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box m={1}>
        <Typography variant="h2" style={{ fontWeight: 600 }} align={"center"}>
          These are the skills you need
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        <Box display="flex" flexDirection="column">
          <SkillResultCard searchParamState={props.searchParamState} />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <TextFieldInputCard
            cardName={"Location"}
            placeholder={"eg. Remote, Bogota"}
            value={props.searchParamState.location}
            onChange={props.searchParamState.setLocation}
          >
            <LocationOnIcon />
          </TextFieldInputCard>

          <TextFieldInputCard
            cardName={"Role"}
            placeholder={"eg. Software developer"}
            value={props.searchParamState.role}
            onChange={props.searchParamState.setRole}
          >
            <WorkIcon />
          </TextFieldInputCard>
          <SalaryInputCard searchParamState={props.searchParamState} />
        </Box>
      </Box>

      <Box m={1}>
        <Typography variant="h3" align={"center"}>
          See which skills you're missing
        </Typography>
      </Box>

      <SearchUserGenome
        username={genomeUsername}
        setUsername={setGenomeUsername}
        setCompare={setCompare}
      />

      {renderCompareResults()}
    </Box>
  );
}
