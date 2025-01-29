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