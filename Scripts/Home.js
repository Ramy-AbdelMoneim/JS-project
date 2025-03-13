import { isLoggedHome } from "../modules/checkCookies.js";
isLoggedHome();
import { animateHeader } from "../modules/headerAnimate.js";
animateHeader();
import { loadData } from "../modules/dataFunctions.js";
import { makeSlider } from "../modules/homeCardsSlider.js";
import * as filterBy from "../modules/filterBy.js";
import * as homeSearch from "../modules/homeSearch.js";
import { Logout } from "../modules/checkCookies.js";
let sliderUpdate;
let originalData = [];
let filteredData = [];

export function getCurrentData() {
  return filteredData.length > 0 ? filteredData : originalData;
}

export function updateData(newData) {
  filteredData = newData;
}

async function init() {
  try {
    const originalData = await loadData();
    sliderUpdate = makeSlider(originalData);
    filteredData = originalData;
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    let tomorrowFormatted = tomorrow.toISOString().split("T")[0];
    document.getElementById("search-date").value = tomorrowFormatted;
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await init();
  homeSearch.searchlisten(sliderUpdate);
  filterBy.filterListen(sliderUpdate);
});
//  Logout

let LogoutNav = document.getElementsByClassName("Logout")[0];
let LogoutHam = document.getElementsByClassName("Logout")[1];
LogoutNav.onclick = Logout;
LogoutHam.onclick = Logout;
