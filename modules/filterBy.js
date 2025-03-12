import { getCurrentData, updateData } from "../Scripts/Home.js";
import { loadData } from "./dataFunctions.js";
function filterListen(updateSliderFn) {
  //^ rating
  const stars = document.querySelectorAll(".star");
  stars.forEach((star) => {
    star.addEventListener("click", async () => {
      const clickedRating = parseInt(star.getAttribute("data-value"));

      if (star.classList.contains("filled")) {
        stars.forEach((s) => {
          s.classList.add("default");
          s.classList.remove("filled");
        });
      } else {
        stars.forEach((s) => {
          const starValue = parseInt(s.getAttribute("data-value"));
          if (starValue <= clickedRating) {
            s.classList.add("filled");
            s.classList.remove("default");
          } else {
            s.classList.remove("filled");
            s.classList.add("default");
          }
        });
      }

      applyFilters(updateSliderFn);
    });
  });
  //^ city
  const cairoCheckbox = document.getElementById("cairo");
  const alexandriaCheckbox = document.getElementById("alexandria");
  cairoCheckbox.addEventListener("change", () => applyFilters(updateSliderFn));
  alexandriaCheckbox.addEventListener("change", () =>
    applyFilters(updateSliderFn)
  );
  // ^ day
  const dayCheckboxes = document.querySelectorAll('input[name="day"]');
  dayCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => applyFilters(updateSliderFn));
  });
  //^ hour
  const hourFilter = document.getElementById("filter-hour");
  hourFilter.addEventListener("change", () => applyFilters(updateSliderFn));
  //^ price

  priceRange.addEventListener("input", async () => {
    updatePrice();
    applyFilters(updateSliderFn);
  });
  async function applyFilters(updateSliderFn) {
    // Get fresh data each time filters are applied
    let data = await loadData();

    const filledStars = document.querySelectorAll(".star.filled");
    if (filledStars.length > 0) {
      let maxRating = 0;
      filledStars.forEach((star) => {
        const rating = parseInt(star.getAttribute("data-value"));
        maxRating = Math.max(maxRating, rating);
      });
      data = filterByRating(data, maxRating);
    }

    const priceValue = document.getElementById("priceRange").value;
    if (priceValue) {
      data = filterByPrice(data, priceValue);
    }

    const cairoChecked = document.getElementById("cairo").checked;
    const alexandriaChecked = document.getElementById("alexandria").checked;

    if (cairoChecked && !alexandriaChecked) {
      data = filterByCity(data, "Cairo");
    } else if (!cairoChecked && alexandriaChecked) {
      data = filterByCity(data, "Alexandria");
    }

    const dayCheckboxes = document.querySelectorAll(
      'input[name="day"]:checked'
    );
    if (dayCheckboxes.length > 0) {
      const selectedDays = Array.from(dayCheckboxes).map(
        (checkbox) => checkbox.value
      );

      data = data.filter((item) => {
        return selectedDays.some(
          (day) =>
            item.timeTable &&
            item.timeTable[day] &&
            item.timeTable[day].length < 24
        );
      });
    }

    const hourFilter = document.getElementById("filter-hour").value;
    if (hourFilter) {
      const hour = hourFilter.split(",").map((h) => parseInt(h.trim()));
      // Get checked days or fallback to default day
      const selectedDay =
        document.querySelector('input[name="day"]:checked')?.value ||
        getDayOfWeek();
      data = filterByHours(data, hour, selectedDay);
    }

    updateSliderFn(data);
    updateData(data);
  }
}
function updatePrice() {
  let price = document.getElementById("priceRange").value;
  document.getElementById("price-value").innerText = price;
}
function highlightStars(rating) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((star, index) => {
    if (index + 1 <= rating) {
      star.classList.add("filled");
    } else {
      star.classList.remove("filled");
    }
  });
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
    datafiltered = datafiltered.filter((el) => parseInt(el.price) <= price);
    datafiltered = datafiltered.sort(
      (a, b) => parseInt(b.price) - parseInt(a.price)
    );
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
    datafiltered = datafiltered.filter(
      (el) => el.rating >= rating - 1 && el.rating <= rating
    );
    datafiltered = datafiltered.sort((a, b) => b.rating - a.rating);
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
function filterByHours(data, hours, day = getDayOfWeek()) {
  if (
    data &&
    (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)
  ) {
    return data.filter((el) => {
      if (!el.timeTable || !el.timeTable[day]) {
        return true; // No reservations data for this day
      }
      if (!el.timeTable || !el.timeTable[day]) {
        return true; // No reservations data for this day, so it's available
      }

      return !hours.some((hour) =>
        el.timeTable[day].some((reservation) => reservation.hour === hour)
      );
    });
  }
}

export { filterByCity, filterByDay, filterListen, getDayOfWeek, filterByHours };
