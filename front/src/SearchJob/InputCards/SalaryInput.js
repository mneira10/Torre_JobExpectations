import React, { useState } from "react";
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

export default function SalaryInputCard(props) {
  const salaryPeriods = {
    YEARLY: { text: "yearly", normFactor: 1.0, key: "YEARLY" },
    MONTHLY: { text: "monthly", normFactor: 1 / 12, key: "MONTHLY" },
    HOURLY: { text: "hourly", normFactor: 1 / (52 * 40), key: "HOURLY" },
  };

  const maxSalaryInYears = 450000.0;

  const [localSalaryRange, setlocalSalaryRange] = useState(
    props.searchParamState.salaryRange.range === null
      ? [0, maxSalaryInYears]
      : props.searchParamState.salaryRange
  );
  const [localSalaryPeriod, setLocalSalaryPeriod] = useState(
    props.searchParamState.salaryRange.periodicity === null
      ? salaryPeriods.YEARLY.key
      : props.searchParamState.salaryRange.periodicity
  );

  // state handlers
  function handleSalaryPeriod(newSalaryPeriod) {
    setlocalSalaryRange(
      localSalaryRange.map(
        (x) =>
          (x / salaryPeriods[localSalaryPeriod].normFactor) *
          salaryPeriods[newSalaryPeriod].normFactor
      )
    );
    setLocalSalaryPeriod(newSalaryPeriod);
    props.searchParamState.setSalaryRange({
      range: localSalaryRange,
      periodicity: salaryPeriods[newSalaryPeriod],
    });
  }

  const handleRangeChange = (event, newValue) => {
    const newRange = newValue.map((x) => sliderToSalary(x, localSalaryPeriod));
    setlocalSalaryRange(newRange);
    props.searchParamState.setSalaryRange({
      range: newRange,
      periodicity: salaryPeriods[localSalaryPeriod],
    });
  };

  // presentation format
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  }

  function valuetext(value) {
    return `${numberWithCommas(
      sliderToSalary(value, localSalaryPeriod).toFixed(0)
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
          disabled={localSalaryPeriod === salaryPeriod}
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
    <Card className={props.classes.textFieldCard}>
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
                localSalaryRange[0].toFixed(0)
              )} USD - ${numberWithCommas(localSalaryRange[1].toFixed(0))} USD`}
            </Typography>
            <Slider
              value={localSalaryRange.map((x) =>
                salaryToSlider(x, localSalaryPeriod)
              )}
              onChange={handleRangeChange}
              getAriaValueText={valuetext}
              marks={[
                { value: 0, label: valuetext(0) },
                { value: 100, label: valuetext(100) },
              ]}
            />
            <Typography variant="h6" align="center">
              {localSalaryPeriod.toUpperCase()}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
