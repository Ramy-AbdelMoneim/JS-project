import { isLoggedHome } from "../modules/checkCookies.js";
isLoggedHome();
import { animateHeader } from "../modules/headerAnimate.js";
animateHeader();
import { loadData } from "../modules/dataFunctions.js";
import { makeSlider } from "../modules/homeCardsSlider.js";
import * as filterBy from "../modules/filterBy.js";
import * as homeSearch from "../modules/homeSearch.js";
import { Logout } from "../modules/checkCookies.js";
document.addEventListener("DOMContentLoaded", () => {
  init();
  homeSearch.searchlisten();
  filterBy.filterListen();
});

async function init() {
  const data = await loadData();
  makeSlider(data);
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  let tomorrowFormatted = tomorrow.toISOString().split("T")[0];
  document.getElementById("search-date").value = tomorrowFormatted;
}

//  Logout

let LogoutNav = document.getElementsByClassName("Logout")[0];
let LogoutHam = document.getElementsByClassName("Logout")[1];
LogoutNav.onclick = Logout;
LogoutHam.onclick = Logout;
