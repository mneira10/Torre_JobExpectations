import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

export default function SalaryInput(props) {
  return (
    <Card className={props.classes.textFieldCard}>
      <CardContent>
        <Typography variant="h6">Salary</Typography>
      </CardContent>
    </Card>
  );
}
