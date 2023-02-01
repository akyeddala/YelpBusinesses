const assert = require("assert");
const FluentBusinesses  = require("./FluentBusinesses");

const testData = [
  {
    name: "Applebee's",
    city: "Charlotte",
    state: "NC",
    stars: 4,
    review_count: 6,
    hours: {
      Monday: "7:0-20:0",
      Tuesday: "7:0-20:0",
      Wednesday: "7:0-20:0",
      Thursday: "7:0-20:0",
      Friday: "7:0-21:0",
      Saturday: "7:0-21:0",
      Sunday: "7:0-21:0",
    },
  },
  {
    name: "China Garden",
    state: "NC",
    city: "Charlotte",
    stars: 4,
    review_count: 10,
    categories: 4,
    hours: {
      Monday: "7:0-20:0",
      Tuesday: "7:0-20:0",
      Wednesday: "7:0-20:0",
      Thursday: "7:0-20:0",
      Friday: "7:0-21:0",
    },
    attributes: { 
      Ambience: {
        romantic: true,
        intimate: true,
        touristy: false,
        hipster: false,
        divey: false,
        classy: true,
        trendy: true,
        upscale: false,
        casual: false,
      },
    },
  },
  {
    name: "Lion",
    city: "Charlotte",
    state: "Narnia",
    hours: {
      Zeeday: "-13nds0",
    },
    Ambience: {
      casual: true,
      classy: true,
    },
    categories: ["special"],
    stars: 3,
    review_count: 8,
  },
  {
    name: "Witch",
    categories: ["special"],
    stars: 2,
    review_count: 9,
  },
  {
    name: "Wardrobe",
    categories: ["special"],
    stars: 3,
    review_count: 9,
  },
  {
    name: "Bored",
    categories: ["special2"],
    review_count: 8,
  },
  {
    name: "Bored2",
    categories: ["special2"],
    review_count: 9,
  },
  {
    name: "Bored3",
    categories: ["special2"],
    review_count: 9,
  },
  {
    name: "Beach Ventures Roofing",
    state: "AZ",
    city: "Phoenix",
    stars: 3,
    review_count: 30,
    categories: ["Home", "Repair", "Service"],
    hours: {
      Monday: "7:0-20:0",
      Tuesday: "7:0-20:0",
      Wednesday: "7:0-20:0",
      Thursday: "7:0-20:0",
      Friday: "7:0-21:0",
      Saturday: "7:0-21:0",
    },
    attributes: { 
      Ambience: {
        romantic: false,
        intimate: false,
        touristy: false,
        hipster: false,
        divey: false,
        //classy: false,
        trendy: true,
        upscale: false,
        casual: true,
      },
    },
  },
  {
    name: "Alpaul Automobile Wash",
    city: "Charlotte",
    state: "NC",
    stars: 3,
    review_count: 30,
    categories: ["Car", "Wash", "Service"],
    hours: {
      Monday: "7:0-20:0",
      Tuesday: "7:0-20:0",
      Thursday: "7:0-20:0",
      Friday: "7:0-21:0",
      Saturday: "7:0-21:0",
      Sunday: "7:0-21:0",
    },
    attributes: {  
      Ambience: {
        romantic: false,
        intimate: false,
        touristy: false,
        hipster: false,
        divey: false,
        classy: true,
        trendy: false,
        upscale: false,
        casual: true,
      },
    },
  },
];

test("fromCityInState filters correctly", () => {
  const list = new FluentBusinesses(testData).fromCityInState(
    "Charlotte",
    "NC"
  ).data;
  assert(list.length === 3);
  assert(list[0].name === "Applebee's");
  assert(list[1].name === "China Garden");
  assert(list[2].name === "Alpaul Automobile Wash");
});

test("hasStarsGeq filters correctly", () => {
  const list = new FluentBusinesses(testData).hasStarsGeq(4).data;
  assert(list.length === 2);
  assert(list[0].name === "Applebee's");
  assert(list[1].name === "China Garden");
});

test("inCategory filters correctly", () => {
  const list = new FluentBusinesses(testData).inCategory("Service").data;
  const list2 = new FluentBusinesses(testData).inCategory("Repair").data;
  const list3 = new FluentBusinesses(testData).inCategory("rando").data;
  //to test fluent pattern
  const list4 = new FluentBusinesses(testData).inCategory("Service").inCategory("Repair").data;
  assert(list.length === 2);
  assert(list[0].name === "Beach Ventures Roofing");
  assert(list[1].name === "Alpaul Automobile Wash");
  assert(list2.length === 1);
  assert(list2[0].name === "Beach Ventures Roofing");
  assert(list3.length === 0);
  assert(list4.length === 1);
  assert(list4[0].name === "Beach Ventures Roofing");
});

test("isOpenOnDays filters correctly", () => {
  const list = new FluentBusinesses(testData).isOpenOnDays(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).data;
  const list2 = new FluentBusinesses(testData).isOpenOnDays(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]).data;
  const list3 = new FluentBusinesses(testData).isOpenOnDays(["Tuesday", "Friday", "Saturday", "Sunday"]).data;
  //to test fluent pattern
  const list4 = new FluentBusinesses(testData).isOpenOnDays(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]).isOpenOnDays(["Tuesday", "Friday", "Saturday", "Sunday"]).data;
  assert(list.length === 1);
  assert(list[0].name === "Applebee's");
  assert(list2.length === 3);
  assert(list2[0].name === "Applebee's");
  assert(list2[1].name === "China Garden");
  assert(list2[2].name === "Beach Ventures Roofing");
  assert(list3.length === 2);
  assert(list3[0].name === "Applebee's");
  assert(list3[1].name === "Alpaul Automobile Wash");
  assert(list4.length === 1);
  assert(list4[0].name === "Applebee's");
});

test("hasAmbience filters correctly", () => {
  const list = new FluentBusinesses(testData).hasAmbience("romantic").data;
  const list2 = new FluentBusinesses(testData).hasAmbience("casual").data;
  const list3 = new FluentBusinesses(testData).hasAmbience("scary").data;
  const list4 = new FluentBusinesses(testData).hasAmbience("casual").hasAmbience("classy").data;
  assert(list.length === 1);
  assert(list[0].name === "China Garden");
  assert(list2.length === 2);
  assert(list2[0].name === "Beach Ventures Roofing");
  assert(list2[1].name === "Alpaul Automobile Wash");
  assert(list3.length === 0);
  assert(list4.length === 1);
  assert(list4[0].name === "Alpaul Automobile Wash");
});

test("bestPlace tie-breaking", () => {
  const best = new FluentBusinesses(testData)
    .fromCityInState("Charlotte", "NC")
    .bestPlace();
  assert(best.name === "China Garden");
  const best2 = new FluentBusinesses(testData)
    .inCategory("special")
    .bestPlace();
  assert(best2.name === "Wardrobe");
  const best3 = new FluentBusinesses(testData)
    .inCategory("special2")
    .bestPlace();
  assert(best3.name === undefined);
});

test("mostReviews tie-breaking", () => {
  const most = new FluentBusinesses(testData)
    .mostReviews();
  assert(most.name === "Beach Ventures Roofing");
  const most2 = new FluentBusinesses(testData)
    .inCategory("special")
    .mostReviews();
  assert(most2.name === "Wardrobe")
});

test("mostReviews and bestPlace work with empty array", () => {
  const best = new FluentBusinesses(testData).inCategory("there's no way this exists")
    .bestPlace();
  assert(best.name === undefined);
  const most = new FluentBusinesses(testData).inCategory("there's no way this exists")
    .mostReviews();
  assert(most.name === undefined);
});
