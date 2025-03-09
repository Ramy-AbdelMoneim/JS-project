var idwords = document.getElementById("words");
var idcoursor = document.getElementById("cursor");
var words = ["Passion", "Dreams", "Glory", "Legends", "Victory"];
var j = 0;
var i = 0;

function writeWord() {
  if (i < words[j].length) {
    idwords.innerHTML += words[j][i];
    i++;
    setTimeout(writeWord, 500); // Adjust the speed of typing here
  } else {
    setTimeout(deleteWord, 500); // Start deleting after a delay
  }
}
function deleteWord() {
  if (i > 0) {
    idwords.innerHTML = idwords.innerHTML.substring(
      0,
      idwords.innerHTML.length - 1
    );
    i--;
    setTimeout(deleteWord, 500); // Adjust the speed of deleting here
  } else {
    j++;
    if (j == words.length) {
      j = 0;
    }
    setTimeout(writeWord, 500); // Start writing the next word after a delay
  }
}
var o = 1;
function opcursor() {
  if (o <= 0) {
    o = 0;
    idcoursor.style.opacity = o;
    setTimeout(reopcursor, 70);
  } else {
    idcoursor.style.opacity = o;
    o -= 0.1;
    setTimeout(opcursor, 70);
  }
}
function reopcursor() {
  if (o >= 1) {
    o = 1;
    idcoursor.style.opacity = o;
    setTimeout(opcursor, 70);
  } else {
    idcoursor.style.opacity = o;
    o += 0.1;
    setTimeout(reopcursor, 70);
  }
}

opcursor();

writeWord();
const images = document.querySelectorAll(".change img");
let currentIndex = 0;

function changeImage() {
  images[currentIndex].classList.remove("work");
  images[currentIndex].classList.add("none-work");
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.remove("none-work");
  images[currentIndex].classList.add("work");
}
setInterval(changeImage, 3500);

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

function makeSlider(data) {
  const wrapper = document.getElementById("cards-container");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const indicatorsContainer = document.querySelector(".indicators");
  const fieldDetails = document.getElementById("field-details");
  const detailsBody = document.getElementById("details-body");
  const closeButton = document.querySelector(".close-btn");
  let fieldsData = [];
  const cardsPerPage = 2;
  let totalCards = 0;
  let totalSlides = 0;
  let currentSlide = 0;
  if (
    data &&
    (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)
  ) {
    fieldsData = data;
    const maxItems = Math.min(data.length, 10);
    totalCards = maxItems;

    data.slice(0, maxItems).forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width:100%;height:150px;object-fit:cover;">
                <h3>${item.name}</h3>
                <p><strong>Rating:</strong> ⭐ ${item.rating}</p>
                <p><strong>Phone:</strong> ${item.phoneNumber}</p>
                <button class="btn btn-primary view-details-btn cardbtn"  data-index="${index}">
                    ${item.price} EGP/hour
                </button>
            `;
      wrapper.appendChild(card);
    });
    document.querySelectorAll(".view-details-btn").forEach((btn) => {
      btn.onclick = (e) => {
        const index = e.target.getAttribute("data-index");
        showDetails(fieldsData[index]);
      };
    });

    totalSlides = Math.ceil(totalCards / cardsPerPage);
    updateIndicators();
    updateSlider();
    //? end of if condition on parameter data
  } else {
    console.error("Error loading JSON data");
    wrapper.innerHTML = `<div class="text-center m-5 w-100 text-danger">❌ Failed to load fields. Please try again later.</div>`;
  }
  function showDetails(field) {
    detailsBody.innerHTML = `
                <h2 class="text-center">${field.name}</h2>
                <img src="${field.image}" alt="${
      field.name
    }" style="width:100%;height:200px;object-fit:cover;margin-bottom:10px;">
                <p><strong>City:</strong> ${field.city}</p>
                <p><strong>Rating:</strong> ⭐ ${field.rating}</p>
                <p><strong>Phone:</strong> ${field.phoneNumber}</p>
                <p><strong>Price:</strong> ${field.price}</p>
                <h4>Time Table</h4>
                <ul>
                    ${Object.entries(field.timeTable)
                      .map(
                        ([day, slots]) => `
                        <li><strong>${day}:</strong>
                            <ul>
                                ${
                                  slots.length > 0
                                    ? slots
                                        .map(
                                          (slot) => `
                                    <li>${slot.hour}:00 - ${
                                            slot.reserved
                                              ? `Reserved by ${slot.user}`
                                              : "Available"
                                          }</li>
                                `
                                        )
                                        .join("")
                                    : "<li>No bookings</li>"
                                }
                            </ul>
                        </li>
                    `
                      )
                      .join("")}
                </ul>
            `;
    fieldDetails.classList.remove("d-none");
  }
  closeButton.onclick = () => {
    fieldDetails.classList.add("d-none");
  };

  function updateSlider() {
    const offset = currentSlide * (30 / cardsPerPage) * cardsPerPage;
    wrapper.style.transform = `translateX(-${offset}%)`;
    updateIndicators();
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    updateSlider();
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
    } else {
      currentSlide = totalSlides - 1;
    }
    updateSlider();
  }

  function updateIndicators() {
    indicatorsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("span");
      dot.classList.add("indicator");
      if (i === currentSlide) {
        dot.classList.add("active");
      }
      dot.onclick = () => {
        currentSlide = i;
        updateSlider();
      };
      indicatorsContainer.appendChild(dot);
    }
  }

  prevBtn.onclick = prevSlide;
  nextBtn.onclick = nextSlide;
}
async function init() {
  const data = await loadData();
  makeSlider(data);
}
document.addEventListener("DOMContentLoaded", () => {
  init();
  const wrapper = document.getElementById("cards-container");
});

//if logged in remove login button and display img and name switch disabled button

function hascookie(input) {
  let allcookies = document.cookie.split(";");
  for (let i = 0; i < allcookies.length; i++) {
    var [key, value] = allcookies[i].split("=");
    if (key == input) {
      return true;
    }
  }
  return false;
}

//retrieve cookie value
function getcookie(input) {
  let allcookies = document.cookie.split(";");
  for (let i = 0; i < allcookies.length; i++) {
    var [key, val] = allcookies[i].split("=");
    if (key == input) {
      return val;
    }
  }
}

let login = document.getElementById("navbarUl");
let ham = document.getElementById("hamUl");
let profile = document.getElementsByClassName("profile");
let usrname = document.getElementsByClassName("usrname");
let cardbtn = document.getElementsByClassName("cardbtn");
let booking = document.getElementById("booking");
//if logged in
if (hascookie("usrname")) {
  // console.log("in")
  login.lastElementChild.remove();
  ham.lastElementChild.remove();
  // console.log(getcookie("usrname"));
  usrname[0].innerHTML = getcookie("usrname");
  profile[0].classList.remove("d-none");
  usrname[1].innerHTML = getcookie("usrname");
  profile[1].classList.remove("d-none");
  // console.log(document.getElementsByClassName("cardbtn"))
} else {
  booking.addEventListener("click", function () {
    if (confirm("You need to be logged in first \n Do you want to login?")) {
      location.assign("./Login.html");
    }
  });
}
