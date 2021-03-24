# Additional notes

## Architecture

The proposed architecture consists of 2 components, the front end and the back end. The backend could be implemented so that it can serve the front end as a static webpage. This has some advantages:

1. Single deployment unit - easier to deploy
2. Easier to manage horizontal scaling in production - there is only one component to manage in production

This works well when scalability is not a concern byt this style of monolithic architecture can run into significant hurdles if the system is put under a lot of pressure. 

Since the number of requests is likely to vary significantly from the front end to the backend, splitting them into sepparat deployable units is advantageous. If there is a load spike in either of them, they can be scaled sepparately and additionally, changes in one component do not imply a redeployment of the entire system, only its corresponding microservice. 

Thus, the front end and the backend were split into sepparate components.

## Findings

An odd behaviour stuck out when exploring the search endpoints. In the `https://search.torre.co/opportunities/_search/` endpoint, a json body can be sent to filter the job results. Oddly, when an empty string is given to the API in the `location` or `role` fields, an internal server error is returned (`500 http status`).

Verified examples:

**Original example**

Endpoint: `POST https://search.torre.co/opportunities/_search/?aggregate=true&currency=USD%24&periodicity=yearly&lang=en
`
JSON body:
```json
{
   "and": [
       {
           "location": {
               "term": ""
           }
       },
       {
           "compensationrange": {
               "minAmount": 81,
               "maxAmount": 200,
               "currency": "USD$",
               "periodicity": "hourly"
           }
       }
   ]
}
```

**Minimal reproducible error**

Endpoint: `POST https://search.torre.co/opportunities/_search/`
```json
{
   "location": {
       "term": ""
   }
}
```

## Future work

Although a lot of work went into this project, the short time span for its implementation made me prioritize certain things. These are some of the things that were cut back due to time constraints. It would be nice to come back to them at some point in the future.

- Dockerize each architecture component for ease of deployment
- Autocomplete genome users
- Unit tests for front end components and client libraries
