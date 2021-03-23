import { Card, CardContent} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { getMostWantedSkills } from "../ClientLibraries/Torre";
import { inputCardStyles } from "../InputCards/InputCardConstants";

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
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "white",
          },
        },
      ],
    },
  };
  return (
    <div>
      {skillData === null ? (
        <h1>Loading...</h1>
      ) : (
        <Card className={classes.inputFieldCard} style={{ minHeight: 600 }}>
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
        </Card>
      )}
    </div>
  );
}
