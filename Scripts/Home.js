import { isLogged } from "../modules/checkCookies.js";
isLogged();
import { animateHeader } from "../modules/headerAnimate.js";
animateHeader();
import { makeSlider } from "../modules/homeCardsSlider.js";
import * as filterBy from "../modules/filterBy.js";
import * as homeSearch from "../modules/homeSearch.js";
//^ functions for data --------------------------------------------------------------------------------
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

//^ functions for fileds cards--------------------------------------------------------------------------

async function init() {
  const data = await loadData();
  makeSlider(data);
  let today = new Date().toISOString().split("T")[0];
  document.getElementById("search-date").value = today;
}

document.addEventListener("DOMContentLoaded", () => {
  init();
  homeSearch.searchlisten();
  filterBy.filterListen();
});
