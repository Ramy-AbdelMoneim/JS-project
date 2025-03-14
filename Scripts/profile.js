

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

  

  let profile=document.getElementById("profile")
  let Name=document.getElementById("Name")
  let birthdate=document.getElementById("Birthdate")
  let Email=document.getElementById("Email")
  let phone=document.getElementById("phone")
  profile.src=localStorage.getItem("profilepic")
  Name.innerHTML=localStorage.getItem("username")
  birthdate.innerHTML=localStorage.getItem("birthdate")
  phone.innerHTML=localStorage.getItem("phonenum")
  Email.innerHTML=localStorage.getItem("Email")
