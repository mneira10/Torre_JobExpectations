const baseUrl = "https://search.torre.co/";

export function getMostWantedSkills(
  location,
  role,
  minCompensation,
  maxCompensation,
  compensationPeriodicity
) {
  const url = baseUrl + "opportunities/_search?&lang=en&aggregate=true";

  const body = {
    and: [
      {
        compensationrange: {
          minAmount: minCompensation,
          maxAmount: maxCompensation,
          currency: "USD$",
          periodicity: compensationPeriodicity.toLowerCase(),
        },
      },
    ],
  };

  if (location !== null && location !== "") {
    body.and.push({
      location: {
        term: location,
      },
    });
  }

  if (role !== null && role !== "") {
    body.and.push({
      "skill/role": {
        text: role,
        experience: "potential-to-develop",
      },
    });
  }

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

export function getUserAvatars(userName) {
  const url = baseUrl + "people/_search/?size=10";

  const body = {
    name: {
      term: userName,
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
      .then((res) => {
        let userAvatars = [];


        for(const i in res.results){
          const user = res.results[i];
          userAvatars.push({
            name: user.name,
            picture: user.picture,
            username: user.username,
          });
        }
        resolve(userAvatars);
      })
      .catch((error) => reject(error));
  });
}
