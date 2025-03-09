import {
  filterByCity,
  filterByDay,
  filterByHours,
  getDayOfWeek,
} from "./filterBy.js";
import { loadData } from "../Scripts/Home.js";
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
  let fromHour = parseInt(document.getElementById("search-from-hour").value);
  let toHour = parseInt(document.getElementById("search-to-hour").value);
  const wrapper = document.getElementById("cards-container");
  const hours = [];
  for (let i = fromHour; i < toHour; i++) {
    hours.push(i);
  }
  console.log(hours);
  // console.log(filterByCity(data, city));
  // console.log(filterByDay(data));
  console.log(filterByHours(data, hours));
  // console.log("City:", city || "not provided");
}
export { searchlisten };
