import { isLogged } from "../modules/checkCookies.js";
isLogged();

//Get directions
let directions = document.getElementById("directions");
directions.onclick = function () {
  navigator.geolocation.getCurrentPosition(succfn, errhandler, option);
};

let option = {
  enableHighAccuracy: true,
  timeout: 5000,
};

function succfn(position) {
  let usrlat = position.coords.latitude;
  let usrlong = position.coords.longitude;
  let ourlat = 31.19264;
  let ourlong = 29.9060892;
  // location.assign(`https://www.google.com/maps/dir/?api=1&origin=${usrlat},${usrlong}&destination=${ourlat},${ourlong}`);
  window.open(
    `https://www.google.com/maps/dir/?api=1&origin=${usrlat},${usrlong}&destination=${ourlat},${ourlong}`
  );
}

function errhandler(err) {
  switch (err.code) {
    case 1:
      alert("Please allow accessing your location");
      break;
    case 3:
      alert("Check your connection");
      break;
  }
}
