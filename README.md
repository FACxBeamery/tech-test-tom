# Jobly: A search engine for tech jobs

This is my repository for the 'Tech Test' from indorse.io. This README will contain a brief overview of the web application, a link to its site, and instructions for running and testing it locally.

## Dependencies: 

The installation instructions assume you have Node, npm and git installed, as well as a basic understanding of the command line. 

## Tech Stack

The app uses Node.js with an Express server on the back-end, and the front-end is written in React. Rather than prop drilling, I make use of the `useContext()` React hook to control the state. 

The app calls the `jobs.github.com` API, which does not require any authentication.

## Installation instructions
To install the app, please clone the reposity with `git clone` followed by the repository's URL. 

`cd` into the repository, and run `npm i` to install the necessary dependencies. Once this is done, run ```npm start```. This will open the app in your browser. 


## Testing
The app exists in two main directories: `client` (the frontend) and `server` (the backend). 
To test the front-end, `cd` into `client` and run the command `npm test -- --coverage --watchAll`. The front-end has test-coverage of >94%. 

Run the same command in `server` to view the test coverage on the back-end. Currently the test coverage here is >85%. 

## Functionality

The web-app is a job-search engine. Users can enter their city to discover jobs in that area that are listed on jobs.github.com.

When the user starts typing their city, they will see an auto-complete list of cities appear. The app restricts its search of cities to Great Britain, to avoid overloading the user. If the city the user wishes to search in is not in the drop-down, the user can still type the city manually, and hit the enter key to search. While the auto-complete is restricted to Great Britain, the search functionality is world-wide. 

## Accessibility

The app has a score of 100 on the Lighthouse accessibility audit.

## Current issues 

* The app fails to deploy to netlify.
* The design could be improved.
* The app doesn't allow the user to specify what kind of job they are looking for.


