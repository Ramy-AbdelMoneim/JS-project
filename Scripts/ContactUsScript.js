//if logged in remove login button and display img and name

function hascookie(input) {
    let allcookies = document.cookie.split(';');
    for (let i = 0; i < allcookies.length; i++) {
        var [key, value] = allcookies[i].split('=');
        if(key==input){
            return true
        }
    }
    return false;
  }
  
  //retrieve cookie value
  function getcookie(input)
  {
    let allcookies=document.cookie.split(';');
    for(let i=0;i< allcookies.length;i++)
    {
      var [key,val]=allcookies[i].split('=');
      if(key==input)
      {
        return val;
      }
    }
  }
  
  let login=document.getElementById("navbarUl");
  let ham=document.getElementById("hamUl");
  let profile=document.getElementsByClassName("profile");
  let usrname=document.getElementsByClassName("usrname");
  
  //if logged in
  if(hascookie("usrname")){
    
    // console.log("in")
    login.lastElementChild.remove();
    ham.lastElementChild.remove();
    // console.log(getcookie("usrname"));
    usrname[0].innerHTML=getcookie("usrname");
    profile[0].classList.remove("d-none");
    usrname[1].innerHTML=getcookie("usrname");
    profile[1].classList.remove("d-none");
  
  }

//Get directions
let directions = document.getElementById("directions");
directions.onclick = function () {
    navigator.geolocation.getCurrentPosition(succfn, errhandler, option);
}

let option =
{
    enableHighAccuracy: true,
    timeout: 5000
};

function succfn(position) {
    let usrlat = position.coords.latitude
    let usrlong = position.coords.longitude
    let ourlat = 31.19264;
    let ourlong = 29.9060892;
    // location.assign(`https://www.google.com/maps/dir/?api=1&origin=${usrlat},${usrlong}&destination=${ourlat},${ourlong}`);
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${usrlat},${usrlong}&destination=${ourlat},${ourlong}`);
}

function errhandler(err) {
    switch (err.code) {
        case 1:
            alert("Please allow accessing your location")
            break;
        case 3:
            alert("Check your connection")
            break;
    }
}