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
  // price.addEventListener("change", updatePrice);
  // price.addEventListener("change", updatePrice);
  // price.addEventListener("change", updatePrice);
  // price.addEventListener("change", updatePrice);
}
function getDayOfWeek() {
  let dateValue = document.getElementById("dateInput").value;

  if (!dateValue) {
    document.getElementById("output").innerText = "Please select a date.";
    return;
  }

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

  document.getElementById("output").innerText = "The day is: " + dayName;
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
  // ? price range

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
function filterByDay(data, day) {}
function filterByHours(data, hours) {}
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
export { filterByCity, filterByPrice, filterListen };
