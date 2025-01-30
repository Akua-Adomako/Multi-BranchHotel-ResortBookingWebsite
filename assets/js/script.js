// navigation sidebar responsive
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    const menu = document.querySelector("nav ul");
    const hamburger = document.querySelector(".hamburger");
    const [close1, , close3] = hamburger.querySelectorAll("span");

    menu.classList.remove("active");
    hamburger.classList.remove("open");
    close1.classList.remove("close");
    close3.classList.remove("close");
  }
});

const toggleMenu = () => {
  const menu = document.querySelector("nav ul");
  const hamburger = document.querySelector(".hamburger");
  const [close1, , close3] = hamburger.querySelectorAll("span");

  menu.classList.toggle("active");
  hamburger.classList.toggle("open");
  close1.classList.toggle("close");
  close3.classList.toggle("close");
};

 // hero image slider
 const images = [
  "./assets/images/hero1.jpg",
  "./assets/images/hero2.jpg",
  "./assets/images/hero3.jpg",
  "./assets/images/hero4.jpg",
  "./assets/images/hero5.jpg",
];

const hero = document.getElementById("hero");
let index = 0;

function changeBackground() {
  hero.classList.add("fade");
  setTimeout(() => {
    index = (index + 1) % images.length;
    hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${images[index]})`;
    hero.classList.remove("fade"); 
  }, 500);
}

setInterval(changeBackground, 5000);


function toBook() {
  window.location.href = '../html/booking.html';
}

function toRooms() {
  window.location.href = "../html/rooms.html";
}

