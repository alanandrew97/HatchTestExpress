# HatchTestExpress
Find the best quotes from a given quotes array.

## Features
- Express.js framework
- Data loaded from quotes.json

## Installation
This project requires Node.js and NPM to run.

Clone this repository.

```sh
git clone git@github.com:alanandrew97/HatchTestExpress.git
```

Install the dependencies and start the server.

```sh
cd HatchTestExpress
npm i
npm start
```

## Explore
Now server is running on http://localhost:3000

To consume an API endpoint, needs to write the api prefix, for example http://localhost:3000/api/quoteCar

Everyone can test the endpoints directly from explorer since there is no authentication.

## Requested methods
GET - http://localhost:3000/api/quotes/bestOptionsPerYear?year=2001 - Get the best quote options per year for each coverage
GET - http://localhost:3000/api/quotes/quoteCar?year=2002&brand=GMC&hasAC=false - Get the best quote options per year and car brand for each coverage.

## Author
Alan Andrew López Meneses
16/07/2021
