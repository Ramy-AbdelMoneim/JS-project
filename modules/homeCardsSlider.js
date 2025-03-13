function makeSlider(data) {
  const wrapper = document.getElementById("cards-container");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const indicatorsContainer = document.querySelector(".indicators");
  const fieldDetails = document.getElementById("field-details");
  const detailsBody = document.getElementById("details-body");
  const closeButton = document.querySelector(".close-btn");
  let fieldsData = [];
  let cardsPerPage = getCardsPerPage();
  let totalCards = 0;
  let totalSlides = 0;
  let currentSlide = 0;
  function getCardsPerPage() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) return 4;
    else if (screenWidth >= 992) return 3;
    else if (screenWidth >= 768) return 2;
    else return 1;
  }
  window.addEventListener("resize", () => {
    const newCardsPerPage = getCardsPerPage();
    if (newCardsPerPage !== cardsPerPage) {
      cardsPerPage = newCardsPerPage;
      totalSlides = Math.ceil(totalCards / cardsPerPage);
      // Ensure current slide is still valid after resize
      if (currentSlide >= totalSlides) {
        currentSlide = totalSlides - 1;
      }
      updateSlider();
      updateIndicators();
    }
  });
  if (
    data &&
    (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)
  ) {
    fieldsData = data;
    const maxItems = Math.min(data.length, 14);
    totalCards = maxItems;
    wrapper.innerHTML = "";
    data.slice(0, maxItems).forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
                  <img src="${item.image}" alt="${item.name}" style="width:100%;height:150px;object-fit:cover;">
                  <h3 >${item.name}</h3>
                  <p class="fs-6"><strong>Rating:</strong> ⭐ ${item.rating}</p>
                  <p ><strong>Phone:</strong> ${item.phoneNumber}</p>
                  <button class="btn btn-primary view-details-btn cardbtn"  data-index="${index}">
                      ${item.price} EGP/hour
                  </button>
              `;
      wrapper.appendChild(card);
    });
    attachEventListeners();
    document.querySelectorAll(".view-details-btn").forEach((btn) => {
      btn.onclick = (e) => {
        const index = e.target.getAttribute("data-index");
        showDetails(fieldsData[index]);
      };
    });

    totalSlides = Math.ceil(totalCards / cardsPerPage);
    updateIndicators();
    updateSlider();
    updateControls();
    //? end of if condition on parameter data
  } else {
    console.error("Error loading JSON data");
    wrapper.innerHTML = `<div class="text-center m-5 w-100 text-danger">❌ Failed to load fields. Please try again later.</div>`;
  }
  function attachEventListeners() {
    document.querySelectorAll(".view-details-btn").forEach((btn) => {
      btn.onclick = (e) => {
        const index = e.target.getAttribute("data-index");
        showDetails(fieldsData[index]);
      };
    });
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
    detailsBody.field_booking_id = field.field_id;
    fieldDetails.classList.remove("d-none");
  }
  closeButton.onclick = () => {
    fieldDetails.classList.add("d-none");
  };
  function updateSlider() {
    if (totalCards <= cardsPerPage) {
      // No sliding needed
      wrapper.style.transform = "translateX(0)";
      wrapper.style.justifyContent = "center";
      updateControls();
    } else {
      // Calculate the width per card based on cards per page
      const cardWidth = 100 / cardsPerPage;

      // Calculate offset to show the current page
      const offset = currentSlide * cardWidth * cardsPerPage;
      wrapper.style.transform = `translateX(-${offset}%)`;
      wrapper.style.justifyContent = "flex-start";
      updateControls();
    }
  }
  function updateControls() {
    // Show/hide navigation based on need
    if (totalCards <= cardsPerPage) {
      // No need for navigation when all cards fit
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      indicatorsContainer.style.display = "none";
    } else {
      prevBtn.style.display = "flex";
      nextBtn.style.display = "flex";
      indicatorsContainer.style.display = "flex";
    }
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    updateSlider();
    updateIndicators();
  }

  function prevSlide() {
    if (currentSlide > 0) {
      currentSlide--;
    } else {
      currentSlide = totalSlides - 1;
    }
    updateSlider();
    updateIndicators();
  }
  function updateIndicators() {
    indicatorsContainer.innerHTML = "";

    // Don't show indicators if not needed
    if (totalCards <= cardsPerPage) {
      return;
    }

    for (let i = 0; i < Math.min(totalSlides, 4); i++) {
      const dot = document.createElement("span");
      dot.classList.add("indicator");
      if (i === currentSlide) {
        dot.classList.add("active");
      }
      dot.onclick = () => {
        currentSlide = i;
        updateSlider();
        updateIndicators();
      };
      indicatorsContainer.appendChild(dot);
    }
  }

  function updateContent(newData) {
    // Reset position
    currentSlide = 0;
    wrapper.style.transform = "translateX(0)";
    wrapper.innerHTML = "";

    // Update data and create new cards
    fieldsData = newData;
    const maxItems = Math.min(newData.length, 10);
    totalCards = maxItems;
    cardsPerPage = getCardsPerPage();
    totalSlides = Math.ceil(totalCards / cardsPerPage);

    if (newData.length === 0) {
      wrapper.innerHTML = `<div class="text-center fs-3 m-5 w-100">No fields match your search criteria</div>`;
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      indicatorsContainer.style.display = "none";
      return;
    }
    newData.slice(0, maxItems).forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:100%;height:150px;object-fit:cover;">
            <h3 >${item.name}</h3>
            <p class="fs-6"><strong>Rating:</strong> ⭐ ${item.rating}</p>
            <p ><strong>Phone:</strong> ${item.phoneNumber}</p>
            <button class="btn btn-primary view-details-btn cardbtn" data-index="${index}">
                ${item.price} EGP/hour
            </button>
        `;
      wrapper.appendChild(card);
    });

    // Reattach event listeners
    document.querySelectorAll(".view-details-btn").forEach((btn) => {
      btn.onclick = (e) => {
        const index = e.target.getAttribute("data-index");
        showDetails(fieldsData[index]);
      };
    });
    attachEventListeners();
    updateControls();
    updateIndicators();
    updateSlider();
  }
  prevBtn.onclick = prevSlide;
  nextBtn.onclick = nextSlide;
  return updateContent;
}
export { makeSlider };
