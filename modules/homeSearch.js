import {
  filterByCity,
  filterByDay,
  filterByHours,
  getDayOfWeek,
} from "./filterBy.js";
import { loadData } from "../Scripts/Home.js";
import { makeSlider } from "./homeCardsSlider.js";
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
  let data = await loadData();
  const city = document.getElementById("search-city").value;
  let fromHour = parseInt(document.getElementById("search-from-hour").value);
  let toHour = parseInt(document.getElementById("search-to-hour").value);
  const wrapper = document.getElementById("cards-container");
  const hours = [];
  for (let i = fromHour; i < toHour; i++) {
    hours.push(i);
  }
  data = filterByHours(filterByDay(filterByCity(data, city)), hours);
  wrapper.innerHTML = "";
  makeSlider(data);
}
export { searchlisten };
