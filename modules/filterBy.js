function updatePrice() {
  let price = document.getElementById("priceRange").value;
  document.getElementById("price-value").innerText = price;
}
function filterListen() {
  let price = document.getElementById("priceRange");
  let rating = document.getElementById("priceRange");
  let city = document.getElementById("priceRange");
  let days = document.getElementById("priceRange");
  let hours = document.getElementById("priceRange");
  price.addEventListener("change", updatePrice);
}
function getDayOfWeek() {
  let dateValue = document.getElementById("search-date").value;
  if (dateValue) {
    let date = new Date(dateValue); // Convert input to Date object
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let dayName = days[date.getDay()]; // Get day name
    return dayName;
  }
}
function filterByCity(data, city) {
  let datafiltered = [];
  datafiltered = data;
  if (
    data &&
    (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)
  ) {
    datafiltered = datafiltered.filter((el) => el.city == city);
  }
  return datafiltered;
}
function filterByPrice(data, price) {
  let datafiltered = [];
  datafiltered = data;
  if (
    data &&
    (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)
  ) {
    datafiltered = datafiltered.filter((el) => el.price <= price);
  }
  return datafiltered;
}
function filterByRating(data, rating) {
  let datafiltered = [];
  datafiltered = data;
  if (
    data &&
    (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)
  ) {
    datafiltered = datafiltered.filter((el) => el.rating <= rating);
  }
  return datafiltered;
}
function filterByDay(data, day = getDayOfWeek()) {
  let datafiltered = [];
  datafiltered = data;
  if (
    data &&
    (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)
  ) {
    datafiltered = datafiltered.filter((el) => el.timeTable[day].length < 24);
  }
  return datafiltered;
}
function filterByHours(data, hours) {
  let datafiltered = [];
  let day = getDayOfWeek();
  datafiltered = data;
  if (
    data &&
    (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)
  ) {
    datafiltered = datafiltered.filter((el) => {
      // Check if timeTable and day exist

      console.log(day);
      if (el.timeTable && el.timeTable[day] && el.timeTable[day].length !== 0) {
        //2 cases: has reservation of at least one hour of hours or not
        if (
          el.timeTable[day].some((reservation) =>
            hours.includes(reservation["hour"])
          )
        ) {
          //has reservation within the hours selected
          return false;
        } else {
          return true;
        }
      } else {
        // day is empty of reservations or doesn't exist
        return false;
      }
    });
  }
  return datafiltered;
}

function searchFilter(data, city, date, fromHour, toHour) {
  //input data
  // check on it
  let datafiltered = [];
  datafiltered = filterByCity(data, city);
  if (
    data &&
    (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)
  ) {
    datafiltered = datafiltered.filter((el) => el.city == city);
  }
}
export { filterByCity, filterByDay, filterListen, getDayOfWeek, filterByHours };
