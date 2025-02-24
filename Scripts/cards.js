function addButtonsListeners() {
  //search button
  const searchBtn = document.getElementById("search-btn");
  searchBtn.addEventListener("onclick", search);
}
function search() {
  const noPeople = document.getElementById("no-people");
  const dateSearch = document.getElementById("date-search");
  const citySelection = document.getElementById("city-selection");
  const fetchedData = [];
  fetch("../JSON/Fields.json")
    .then((response) => response.json())
    .then((data) => {
      fetchedData = data;
      diplayCards(fetchedData);
    });
}
function diplayCards(data) {
  const cardStyleClasess = [];
  const container = document.getElementById("card-container");
  const card = document.createElement("div");
  for (const className in cardStyleClasess) {
    if (Object.prototype.hasOwnProperty.call(cardStyleClasess, className)) {
      card.classList.add(className);
    }
  }
}

document.addEventListener("DOMContentLoaded", addButtonsListeners);
//? json example
// {
//   "name": "",
//   "city": "Cairo",
//   "image": "url",
//   "rating": "",
//   "location": "31.2098232,29.9397831",
//   "price": "number",
//   "timeTable": {
//     "Saturday": [
//       { "hour": 0, "reserved": true, "name": "Kero" },
//       { "hour": 1, "reserved": true, "name": "Kero" },
//       { "hour": 22, "reserved": true, "name": "John" },
//       { "hour": 23, "reserved": true, "name": "John" }
//     ],
//     "Sunday": [],
//     "Monday": [],
//     "Tuesday": [],
//     "Wednesday": [],
//     "Thursday": [],
//     "Friday": []
//   },
//   "phoneNumber": "010"
// },
