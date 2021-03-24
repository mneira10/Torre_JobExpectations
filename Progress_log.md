# Progress log

This is a brief log of the activities and time spent in this project.

## Investigation/design ~ 5hrs

- API exploration - 2hrs

  - https://torre.bio/api/bios/\<username\>
  - https://torre.co/api/opportunities/\<opportunityID\>
  - https://search.torre.co/opportunities/_search
  - https://search.torre.co/people/_search

- Brainstorm ideas for project - 30mins
- Design UX/UI of app - 2hrs
  - Desktop web view
  - Mobile web view (responsive design)
  - Color selection
  - Page layout
- Architecture design - 10 mins
- Backend design - 30 mins
  - Spliting responsibilities bewteen Torre API and own API

## Implementation ~10hrs

- Backend - 2.5 hrs
  - `skillDifferences` endpoint - 2 hrs
    - Torre client library
  - Unit testing - 30 mins
- Front end ~ 8hrs
  - Selection of design language (material design) - 20 mins
  - Theme implementation - 30 mins
  - Main search view - 2 hrs
  - Skill demand visualization - 2hrs
  - Torre genome user search - 1 hr
    - Torre client library
  - Genome skills and industry skills comparison - 2hrs
    - Own backend client library

## CI/CD ~ 0.5 hrs

- [Backend continuous integration](https://github.com/mneira10/Torre_JobExpectations/actions) - 30 mins (github actions)
  - Dependency installation
  - Unit test execution

## Deployment ~ 4hrs

- Cloud provider selection (heroku) - 20 mins
  - Multi dyno deployment from the same repo
- Back end deployment - 3hrs (took me a lot )
- Front end deployment - 30 mins
  - Set environment variables


# Estimated total time ~ 20hrs