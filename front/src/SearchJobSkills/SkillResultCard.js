import { Card, Box, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { getMostWantedSkills } from "../ClientLibraries/Torre";
import { inputCardStyles } from "../InputCards/InputCardConstants";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function SkillResultCard(props) {
  const [skillData, setSkillData] = useState(null);

  const classes = inputCardStyles();

  useEffect(() => {
    getMostWantedSkills(
      props.searchParamState.location,
      props.searchParamState.role,
      props.searchParamState.salaryRange.range[0],
      props.searchParamState.salaryRange.range[1],
      props.searchParamState.salaryRange.periodicity
    ).then((data) => {
      console.log(data);
      let newSkillData = {
        labels: data.aggregators.skill.map((x) => x.value),
        data: data.aggregators.skill.map((x) => x.total),
        total: data.total,
      };

      setSkillData(newSkillData);
    });
  }, [props.searchParamState]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: "white",
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "white",
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "white",
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
    },
  };
  return (
    <div>
      {skillData === null ? (
        <Card className={classes.inputFieldCard}>
          <Box m={2} display="flex" flexDirection='column' alignItems='center' justifyContent="center">
            <Typography variant="h5">Loading...</Typography>
            <CircularProgress/>
          </Box>
        </Card>
      ) : (
        <Card className={classes.inputFieldCard}>
          <Box m={2} display="flex" justifyContent="center">
            <Typography variant="h5">
              Total jobs found: {skillData.total}
            </Typography>
          </Box>

          <Box m={2} style={{ minHeight: 700 }}>
            <HorizontalBar
              data={{
                labels: skillData.labels,
                datasets: [
                  {
                    label: "# of Jobs",
                    data: skillData.data,
                    backgroundColor: "rgba(0, 233, 177, 0.8)",
                    borderColor: "rgba(0, 233, 177, 0.8)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={options}
            />
          </Box>
        </Card>
      )}
    </div>
  );
}
