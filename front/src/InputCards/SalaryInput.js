import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  ButtonGroup,
  Button,
  Box,
} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { maxSalaryInYears } from "../Constants";
import { inputCardStyles } from "./InputCardConstants";

export default function SalaryInputCard(props) {
  const salaryPeriods = {
    YEARLY: { text: "yearly", normFactor: 1.0, key: "YEARLY" },
    MONTHLY: { text: "monthly", normFactor: 1 / 12, key: "MONTHLY" },
    HOURLY: { text: "hourly", normFactor: 1 / (52 * 40), key: "HOURLY" },
  };

  const classes = inputCardStyles();

  // state handlers
  function handleSalaryPeriod(newSalaryPeriod) {
    props.searchParamState.setSalaryRange((prevState) => ({
      range: prevState.range.map(
        (x) =>
          (x / salaryPeriods[prevState.periodicity].normFactor) *
          salaryPeriods[newSalaryPeriod].normFactor
      ),
      periodicity: newSalaryPeriod,
    }));
  }

  const handleRangeChange = (event, newValue) => {
    const newRange = newValue.map((x) =>
      sliderToSalary(x, props.searchParamState.salaryRange.periodicity)
    );
    props.searchParamState.setSalaryRange((prevState) => ({
      range: newRange,
      periodicity: prevState.periodicity,
    }));
  };

  // presentation format
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  }

  function valuetext(value) {
    return `${numberWithCommas(
      sliderToSalary(
        value,
        props.searchParamState.salaryRange.periodicity
      ).toFixed(0)
    )} USD`;
  }

  // linear transformations from slider scale to salary scale
  function sliderToSalary(x, salPeriod) {
    return (x / 100) * maxSalaryInYears * salaryPeriods[salPeriod].normFactor;
  }

  function salaryToSlider(x, salPeriod) {
    return (x / maxSalaryInYears / salaryPeriods[salPeriod].normFactor) * 100;
  }

  function renderSalaryPeriodButtons() {
    const buttons = [];
    for (const salaryPeriod in salaryPeriods) {
      buttons.push(
        <Button
          key={salaryPeriod}
          disabled={
            props.searchParamState.salaryRange.periodicity === salaryPeriod
          }
          onClick={(event) => handleSalaryPeriod(salaryPeriod)}
        >
          {salaryPeriod}
        </Button>
      );
    }

    return (
      <ButtonGroup disableElevation variant="contained" color="primary">
        {buttons}
      </ButtonGroup>
    );
  }
  return (
    <Card className={classes.inputFieldCard}>
      <CardContent>
        <Grid container direction="row" alignItems="center" spacing={1}>
          <Grid item>
            <AttachMoneyIcon />
          </Grid>

          <Grid item>
            <Typography variant="h5">Salary</Typography>
          </Grid>
        </Grid>
        <Box
          m={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {renderSalaryPeriodButtons()}
          <Box width={"80%"} m={5}>
            <Typography variant="subtitle1" align="center">
              {`${numberWithCommas(
                props.searchParamState.salaryRange.range[0].toFixed(0)
              )} USD - ${numberWithCommas(
                props.searchParamState.salaryRange.range[1].toFixed(0)
              )} USD`}
            </Typography>
            <Slider
              value={props.searchParamState.salaryRange.range.map((x) =>
                salaryToSlider(
                  x,
                  props.searchParamState.salaryRange.periodicity
                )
              )}
              onChange={handleRangeChange}
              getAriaValueText={valuetext}
              marks={[
                { value: 0, label: valuetext(0) },
                { value: 100, label: valuetext(100) },
              ]}
            />
            <Typography variant="h6" align="center">
              {props.searchParamState.salaryRange.periodicity.toUpperCase()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
