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
let booking = document.getElementById("booking");
let profilepic=document.getElementsByClassName("profilepic");
let hamlogout=document.getElementsByClassName("Logout")[1];
//if logged in
function isLogged() {
  if (hascookie("usrname")) {
    // console.log("in")
    login.lastElementChild.remove();
    ham.lastElementChild.remove();
    // console.log(getcookie("usrname"));
    usrname[0].innerHTML = getcookie("usrname");
    profile[0].classList.remove("d-none");
    usrname[1].innerHTML = getcookie("usrname");
    profile[1].classList.remove("d-none");
    profilepic[0].src=localStorage.getItem("profilepic");
    profilepic[1].src=localStorage.getItem("profilepic");
    hamlogout.classList.remove("d-none");

    // console.log(document.getElementsByClassName("cardbtn"))
  }
}
function isLoggedHome() {
  if (hascookie("usrname")) {
    // console.log("in")
    login.lastElementChild.remove();
    ham.lastElementChild.remove();
    // console.log(getcookie("usrname"));
    usrname[0].innerHTML = getcookie("usrname");
    profile[0].classList.remove("d-none");
    usrname[1].innerHTML = getcookie("usrname");
    profile[1].classList.remove("d-none");
    profilepic[0].src=localStorage.getItem("profilepic");
    profilepic[1].src=localStorage.getItem("profilepic");
    hamlogout.classList.remove("d-none");

  } else {
    booking.addEventListener("click", function () {
      if (confirm("You need to be logged in first \n Do you want to login?")) {
        location.assign("./Login.html");
      }
    });
  }
}

function Logout()
{
  let allcookies=document.cookie.split(';');
   let date=new Date();
   date.setMonth=(date.getMonth()-1);
   document.getElementsByClassName('profile')[0].classList.add("d-none");
   hamlogout.classList.add("d-none");
   history.go(0);
  for(let i=0;i<allcookies.length;i++)
  {
    var [key,value]=allcookies[i].split('=');
    document.cookie=key+'=;expires='+date.toUTCString();
  }


}
export { isLoggedHome, isLogged, Logout };
