import { Box } from "@material-ui/core";
import React from "react";
import TextFieldInputCard from "../InputCards/TextFieldInputCard";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WorkIcon from "@material-ui/icons/Work";
import SalaryInputCard from "../InputCards/SalaryInput";
import SkillResultCard from "./SkillResultCard";

export default function SkillResults(props) {
  return (
    <Box display="flex" flexDirection="row" flexWrap='wrap'>
      <Box  display="flex" flexDirection="column">
        <SkillResultCard searchParamState={props.searchParamState} />
      </Box>

      <Box display="flex" flexDirection="column" justifyContent='space-between'>
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
  );
}
