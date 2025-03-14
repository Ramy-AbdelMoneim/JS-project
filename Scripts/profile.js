

function showFinishedBooking() {
    document.getElementById("finishedBooking").style.display = "block";
    document.getElementById("UpcomingBooking").style.display = "none";
    setActiveTab("finished");
  }
  function showUpcomingBooking() {
    document.getElementById("UpcomingBooking").style.display = "block";
    document.getElementById("finishedBooking").style.display = "none";
    setActiveTab("upcoming");
  }
  function setActiveTab(tab) {
    document.querySelectorAll(".tabs ul li").forEach((li) => {
      li.classList.remove("active");
    });
    document.querySelector(`.tabs ul li.${tab}`).classList.add("active");
  }

 
  document.querySelectorAll('.cancel-btn').forEach(button => {
    button.addEventListener('click', () => {
      alert('Booking Cancelled');
      const card = button.closest('.card'); 
      card.remove(); 
    });
  });

  
