function searchlisten() {
  document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); //  Prevent form from submitting & reloading
    });

  const searchBtn = document.getElementById("home-search-btn");
  searchBtn.addEventListener("click", updateData);
}
async function updateData() {
  const data = await loadData();
  const city = document.getElementById("search-city").value;
  const date = document.getElementById("search-date").value;
  let fromHour = document.getElementById("search-from-hour").value;
  let toHour = document.getElementById("search-to-hour").value;
  // console.log("Data:", data);
  // console.log("City:", city || "not provided");
  console.log("Date:", date || "not provided");
  console.log(filterByCity(data, city));
  // console.log("From hour:", fromHour || "not provided");
  // console.log("To hour:", toHour || "not provided");
}
export { searchlisten };
// function addButtonsListeners() {
//   //search button
//   const searchBtn = document.getElementById("search-btn");
//   searchBtn.addEventListener("onclick", search);
// }
// function search() {
//   const noPeople = document.getElementById("no-people");
//   const dateSearch = document.getElementById("date-search");
//   const citySelection = document.getElementById("city-selection");
//   const fetchedData = [];
//   fetch("../JSON/Fields.json")
//     .then((response) => response.json())
//     .then((data) => {
//       fetchedData = data;
//       diplayCards(fetchedData);
//     });
// }
// function diplayCards(data) {
//   const cardStyleClasess = [];
//   const container = document.getElementById("card-container");
//   const card = document.createElement("div");
//   for (const className in cardStyleClasess) {
//     if (Object.prototype.hasOwnProperty.call(cardStyleClasess, className)) {
//       card.classList.add(className);
//     }
//   }
// }

// document.addEventListener("DOMContentLoaded", addButtonsListeners);
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
