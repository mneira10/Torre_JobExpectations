import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  makeStyles,
  ButtonGroup,
  Button,
  Box,
} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const useStyles = makeStyles((theme) => ({
  toggleButtonGroup: {
    color: theme.palette.primary,
    // border: `1px solid ${theme.palette.divider}`,
    // flexWrap: "wrap",
  },
}));

export default function SalaryInput(props) {
  const salaryPeriods = {
    YEARLY: "yearly",
    MONTHLY: "monthly",
    HOURLY: "hourly",
  };
  const maxSalary = 208000.0;

  const [localSalaryRange, setlocalSalaryRange] = useState([0, maxSalary]);
  const [localSalaryPeriod, setLocalSalaryPeriod] = useState(
    salaryPeriods.YEARLY
  );

  const classes = useStyles();

  function handleSalaryPeriod(newSalaryPeriod) {
    setLocalSalaryPeriod(salaryPeriods[newSalaryPeriod]);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  const handleRangeChange = (event, newValue) => {
    setlocalSalaryRange(newValue.map((x)=>(x+0.0)/100.0*maxSalary));
  };

  function valuetext(value) {
    return `${(value / 100) * maxSalary} USD`;
  }

  function renderSalaryPeriodButtons() {
    const buttons = [];
    for (const salaryPeriod in salaryPeriods) {
      buttons.push(
        <Button
          key={salaryPeriod}
          disabled={localSalaryPeriod === salaryPeriods[salaryPeriod]}
          onClick={(event) => handleSalaryPeriod(salaryPeriod)}
        >
          {salaryPeriods[salaryPeriod]}
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
          <Box width={'80%'} m={2}>
              <Typography variant='subtitle1' align='center'>
                {`${numberWithCommas(localSalaryRange[0].toFixed(0))} USD - ${numberWithCommas(localSalaryRange[1].toFixed(0))} USD`}
              </Typography>
            <Slider
              value={localSalaryRange.map((x)=>(x+0.0)/maxSalary*100.0)}
              onChange={handleRangeChange}
            //   valueLabelDisplay='auto'
            //   valueLabelFormat={valuetext}
              // aria-labelledby="range-slider"
              getAriaValueText={valuetext}
              marks={[
                { value: 0, label: valuetext(0) },
                { value: 100, label: valuetext(100) },
              ]}
            />
            <Typography variant='h6' align='center'>
              {localSalaryPeriod}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
