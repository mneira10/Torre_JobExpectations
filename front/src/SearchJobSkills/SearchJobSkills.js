import React from "react";
import {
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SalaryInputCard from "../InputCards/SalaryInput";
import WorkIcon from "@material-ui/icons/Work";
import TextFieldInputCard from "../InputCards/TextFieldInputCard";



export default function SearchJobSkills(props) {

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
          What skills do you need for your dream job?
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        m={3}
      >
        <Box display="flex" flexDirection="column" justifyContent="center">
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
        </Box>

        <SalaryInputCard
          searchParamState={props.searchParamState}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width={"60%"}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth={true}
          onClick={props.searchJobs}
        >
          <Typography>Search</Typography>
        </Button>
      </Box>
    </Box>
  );
}
