import { isLoggedHome } from "../modules/checkCookies.js";
isLoggedHome();
import { animateHeader } from "../modules/headerAnimate.js";
animateHeader();
import { makeSlider } from "../modules/homeCardsSlider.js";
import * as filterBy from "../modules/filterBy.js";
import * as homeSearch from "../modules/homeSearch.js";

document.addEventListener("DOMContentLoaded", () => {
  init();
  homeSearch.searchlisten();
  filterBy.filterListen();
});

async function loadData() {
  try {
    const response = await fetch("../JSON/Fields.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading data:", error);
    return [];
  }
}
async function init() {
  const data = await loadData();
  makeSlider(data);
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  let tomorrowFormatted = tomorrow.toISOString().split("T")[0];
  document.getElementById("search-date").value = tomorrowFormatted;
}
export { loadData };
