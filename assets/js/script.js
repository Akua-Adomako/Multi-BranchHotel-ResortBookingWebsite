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
  "./assets/images/homepageImages/hero1.jpg",
  "./assets/images/homepageImages/hero2.jpg",
  "./assets/images/homepageImages/hero3.jpg",
  "./assets/images/homepageImages/hero4.jpg",
  "./assets/images/homepageImages/hero5.jpg",
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


// Testimonial Carousel Logic
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelector('.dots');

// Create dots
testimonials.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => showTestimonial(index));
  dots.appendChild(dot);
});

function showTestimonial(index) {
  testimonials[currentTestimonial].classList.remove('active');
  dots.children[currentTestimonial].classList.remove('active');
  
  currentTestimonial = (index + testimonials.length) % testimonials.length;
  
  testimonials[currentTestimonial].classList.add('active');
  dots.children[currentTestimonial].classList.add('active');
}

// Navigation
document.querySelector('.prev').addEventListener('click', () => {
  showTestimonial(currentTestimonial - 1);
});

document.querySelector('.next').addEventListener('click', () => {
  showTestimonial(currentTestimonial + 1);
});

// Auto-advance
let autoSlide = setInterval(() => {
  showTestimonial(currentTestimonial + 1);
}, 7000);

// Pause on hover
testimonialCarousel.addEventListener('mouseenter', () => {
  clearInterval(autoSlide);
});

testimonialCarousel.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    showTestimonial(currentTestimonial + 1);
  }, 7000);
});

// Initialize
showTestimonial(0);


// Handle promo clicks
function handlePromoClick(promoId) {
  // Store selected promo in localStorage
  localStorage.setItem('selectedPromo', promoId);
  
  // Redirect to booking page
  window.location.href = './html/booking.html';
}

// Add dynamic discount calculation
document.querySelectorAll('.promo-card').forEach(card => {
  const discount = card.dataset.discount;
  const oldPriceElem = card.querySelector('.old-price');
  const newPriceElem = card.querySelector('.new-price');
  
  // Example dynamic pricing calculation
  const oldPrice = parseFloat(oldPriceElem.textContent.replace(/[^0-9.]/g, ''));
  const newPrice = oldPrice * (1 - (discount/100));
  
  newPriceElem.textContent = `$${newPrice.toFixed(0)}/night`;
});

// Add intersection observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll('.promo-card').forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});



// Sticky CTA Logic
const stickyCTA = document.querySelector('.sticky-cta');
const closeBtn = document.querySelector('.close-cta');
let lastScrollPosition = 0;
let ctaDismissed = false;

// Scroll Handler
function handleScroll() {
  const currentScroll = window.scrollY;
  const scrollDirection = currentScroll > lastScrollPosition ? 'down' : 'up';
  
  if (!ctaDismissed && currentScroll > 300 && scrollDirection === 'up') {
    stickyCTA.classList.add('visible');
  }
  
  lastScrollPosition = currentScroll;
}

// Countdown Timer
function updateCountdown() {
  const now = new Date();
  const target = new Date();
  
  // Set target to next midnight
  target.setHours(24, 0, 0, 0);
  
  const diff = target - now;
  const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
  const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
  
  document.getElementById('countdown').textContent = `${hours}:${minutes}:${seconds}`;
}

// Close Functionality
closeBtn.addEventListener('click', () => {
  stickyCTA.classList.remove('visible');
  ctaDismissed = true;
  localStorage.setItem('ctaDismissed', 'true');
  
  // Re-enable after 24 hours
  setTimeout(() => {
    localStorage.removeItem('ctaDismissed');
  }, 24 * 60 * 60 * 1000);
});

// Initialize
if (!localStorage.getItem('ctaDismissed')) {
  window.addEventListener('scroll', handleScroll);
  setInterval(updateCountdown, 1000);
  updateCountdown();
}

// Mobile Touch Handling
let touchStart = 0;
window.addEventListener('touchstart', e => {
  touchStart = e.changedTouches[0].screenY;
});

window.addEventListener('touchend', e => {
  const touchEnd = e.changedTouches[0].screenY;
  if (touchStart - touchEnd > 50) { // Swipe up
    stickyCTA.classList.remove('visible');
  }
});