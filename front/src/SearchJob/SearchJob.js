import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  makeStyles,
  TextField,
  Grid,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SalaryInput from "./InputCards/SalaryInput";
import WorkIcon from '@material-ui/icons/Work';

const useStyles = makeStyles((theme) => ({
  textFieldCard: {
    maxWidth: 345,
    minWidth: 400,
    margin: 20,
  },
}));

export default function SearchJob(props) {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h2" style={{ fontWeight: 600 }} align={"center"}>
        What skills do you need for your dream job?
      </Typography>

      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
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
              <TextField
                variant="filled"
                fullWidth={true}
                placeholder="Where would you like to work? eg. Remote"
              />
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
              <TextField
                variant="filled"
                fullWidth={true}
                placeholder="eg. Software developer"
              />
            </CardContent>
          </Card>
        </Box>

        <SalaryInput classes={classes} />
      </Box>
    </Box>
  );
}
