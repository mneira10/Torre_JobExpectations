import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Grid,
} from "@material-ui/core";

export default function TextFieldInputCard(props) {
  return (
    <Card className={props.classes.textFieldCard}>
      <CardContent>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            {props.children}
          </Grid>
          <Grid item>
            <Typography variant="h5">{props.cardName}</Typography>
          </Grid>
        </Grid>
        <Box m={2}>
          <TextField
            variant="filled"
            fullWidth={true}
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
