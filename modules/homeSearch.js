import { filterByCity, filterByDay, filterByHours } from "./filterBy.js";
import { loadData } from "../modules/dataFunctions.js";
function searchlisten(updateSliderFn) {
  document
    .getElementById("searchForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); //  Prevent form from submitting & reloading
    });

  const searchBtn = document.getElementById("home-search-btn");
  searchBtn.addEventListener("click", async () => {
    const data = await loadData();

    const city = document.getElementById("search-city").value;
    let fromHour = parseInt(document.getElementById("search-from-hour").value);
    let toHour = parseInt(document.getElementById("search-to-hour").value);
    const hours = [];
    for (let i = fromHour; i < toHour; i++) {
      hours.push(i);
    }
    const result = filterByHours(filterByDay(filterByCity(data, city)), hours);
    updateSliderFn(result);
  });
}

export { searchlisten };
