const data = require("./data.json");
const FluentBusinesses = require("./FluentBusinesses");

// Find some great doctors in Santa Barbara, CA
const doctors = new FluentBusinesses(data)
  .inCategory("Doctors")
  .fromCityInState("Santa Barbara", "CA")
  .hasStarsGeq(4.5).data;

console.log("Great doctor in Santa Barbara, CA: " + doctors[0].name);

const greatRestaurant = new FluentBusinesses(data)
  .hasStarsGeq(5)
  .inCategory("Restaurants")
  .fromCityInState("Tampa", "FL")
  .mostReviews();

console.log("Best restaurant in Tampa, FL: " + greatRestaurant.name);
