// navigation sidebar responsive
function toggleMenu() {
  const menu = document.querySelector('nav ul');
  const hamburger = document.querySelector('.hamburger');

  menu.classList.toggle('active');
  hamburger.classList.toggle('open');
  
}