import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Card,
  Box,
  CardContent,
  Typography,
  List,
  ListItem,
} from "@material-ui/core";
import { inputCardStyles } from "../InputCards/InputCardConstants";

export default function CompareSkills(props) {
  const classes = inputCardStyles();

  function renderContent() {
    if (props.loading) {
      return (
        <Box>
          <Card className={classes.inputFieldCard}>
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
              >
                <Box m={2}>
                  <Typography variant="h4">Loading...</Typography>
                </Box>
                <CircularProgress />
              </Box>
            </CardContent>
          </Card>
        </Box>
      );
    }
    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        <Box m={2}>
          <Card className={classes.inputFieldCard}>
            <CardContent>
              <Typography variant="h5">Skills already learned</Typography>
              <Typography>
                These are the skills you already have! Keep it up.
              </Typography>
              <List>
                {props.skills.learned_skills.map((x) => {
                  return (
                    <ListItem key={x.value}>
                      <Typography>{x.value}</Typography>:{" "}
                      <Typography color="primary">{x.total}</Typography>
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Box>
        <Box m={2}>
          <Card className={classes.inputFieldCard}>
            <CardContent>
              <Typography variant="h5">Skills TO learn</Typography>
              <Typography>
                These are the skills that you should focus on to get your dream
                job.
              </Typography>
              <List>
                {props.skills.skills_to_learn.map((x) => {
                  return (
                    <ListItem key={x.value}>
                      <Typography>{x.value}:</Typography>
                      <Typography color="primary">{x.total}</Typography>
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  }

  return renderContent();
}
