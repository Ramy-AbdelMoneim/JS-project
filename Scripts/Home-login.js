var idwords=document.getElementById("words")
var idcoursor=document.getElementById("cursor")
var words = [
    "Passion",
    "Dreams",
    "Glory",
    "Legends",
    "Victory"
];
var j=0
var i=0

function writeWord(){
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
        idwords.innerHTML = idwords.innerHTML.substring(0, idwords.innerHTML.length - 1);
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
var o=1
function opcursor(){
    if(o<=0){
        o=0
        idcoursor.style.opacity=o
        setTimeout(reopcursor,70)
    }else{
        idcoursor.style.opacity=o
        o-=0.1
        setTimeout(opcursor,70)
    }
}
function reopcursor(){
    if(o>=1){
        o=1
        idcoursor.style.opacity=o
        setTimeout(opcursor,70)
    }else{
        idcoursor.style.opacity=o
        o+=0.1
        setTimeout(reopcursor,70)
    }
}

opcursor();

writeWord();

const images = document.querySelectorAll('.change img');
let currentIndex = 0;

function changeImage() {
  images[currentIndex].classList.remove('work');
  images[currentIndex].classList.add('none-work');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.remove('none-work');
  images[currentIndex].classList.add('work');
  
}

setInterval(changeImage, 3500);                 
  


//Get user-name 
document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username"); 
    const usernameElement = document.getElementById("username");
  
    if (username && usernameElement) {
      usernameElement.textContent = username;
    }
  });