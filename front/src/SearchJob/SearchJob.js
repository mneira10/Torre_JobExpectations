import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  makeStyles,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SalaryInput from "./InputCards/SalaryInput";
import WorkIcon from "@material-ui/icons/Work";

const useStyles = makeStyles((theme) => ({
  textFieldCard: {
    maxWidth: 400,
    minWidth: 350,
    margin: 10,
  },
}));

export default function SearchJob(props) {
  const classes = useStyles();

  console.log(props);

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
          <Card className={classes.textFieldCard}>
            <CardContent>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <LocationOnIcon />
                </Grid>
                <Grid item>
                  <Typography variant="h5">Location</Typography>
                </Grid>
              </Grid>
              <Box m={2}>
                <TextField
                  variant="filled"
                  fullWidth={true}
                  placeholder="eg. Remote, Bogota"
                  onChange={(e) =>
                    props.searchParamState.setLocation(e.target.value)
                  }
                />
              </Box>
            </CardContent>
          </Card>

          <Card className={classes.textFieldCard}>
            <CardContent>
              <Grid container direction="row" alignItems="center" spacing={1}>
                <Grid item>
                  <WorkIcon />
                </Grid>
                <Grid item>
                  <Typography variant="h5">Role</Typography>
                </Grid>
              </Grid>
              <Box m={2}>
                <TextField
                  variant="filled"
                  fullWidth={true}
                  placeholder="eg. Software developer"
                  onChange={(e) =>
                    props.searchParamState.setRole(e.target.value)
                  }
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <SalaryInput
          classes={classes}
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
