export function compareSkills(
  genomeUsername,
  location,
  role,
  salaryRangeMin,
  salaryRangeMax,
  salaryRangePeriodicity
) {
  const url = process.env.REACT_APP_COMPARE_SKILLS_URL + 'skillDifferences';
  const body = {
    genome_username: genomeUsername,
    location: location,
    role: role,
    salaryRange: {
      min: salaryRangeMin,
      max: salaryRangeMax,
      periodicity: salaryRangePeriodicity,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
}
