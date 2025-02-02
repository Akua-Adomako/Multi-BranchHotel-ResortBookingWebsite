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



// Gallery Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = [
    { src: '../assets/images/gallery1.jpg', alt: 'Luxury Suite' },
    { src: './assets/images/gallery2.jpg', alt: 'Spa Facility' },
    { src: './assets/images/gallery3.jpg', alt: 'Dining Area' },
    { src: './assets/images/gallery4.jpg', alt: 'Pool View' },
    { src: './assets/images/gallery5.jpg', alt: 'Event Space' }
  ];

  // DOM Elements
  const carouselTrack = document.querySelector('.carousel-track');
  const dotsContainer = document.querySelector('.carousel-dots');
  let currentSlide = 0;

  // Initialize Carousel
  function initCarousel() {
    // Create slide elements
    galleryImages.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-item';
      slide.innerHTML = `
        <img src="${image.src}" alt="${image.alt}" loading="lazy">
      `;
      carouselTrack.appendChild(slide);
    });

    // Create dots
    galleryImages.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => showSlide(index));
      dotsContainer.appendChild(dot);
    });

    // Set initial active state
    carouselTrack.children[0].classList.add('active');
    dotsContainer.children[0].classList.add('active');
  }

  // Slide transition function
  function showSlide(index) {
    // Wrap around logic
    if (index >= galleryImages.length) index = 0;
    if (index < 0) index = galleryImages.length - 1;

    // Update classes
    carouselTrack.children[currentSlide].classList.remove('active');
    dotsContainer.children[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    carouselTrack.children[currentSlide].classList.add('active');
    dotsContainer.children[currentSlide].classList.add('active');
  }

  // Control event listeners
  document.querySelector('.carousel-prev').addEventListener('click', () => {
    showSlide(currentSlide - 1);
  });

  document.querySelector('.carousel-next').addEventListener('click', () => {
    showSlide(currentSlide + 1);
  });

  // Auto-advance
  let carouselInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);

  // Pause on hover
  document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
  });

  document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  });

  // Initialize the carousel
  initCarousel();
});

// Circular Border Scroll Progress
const scrollProgress = document.querySelector('.scroll-progress-corner');
const circle = document.querySelector('.progress-ring-circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function updateProgress() {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const progress = circumference - (scrolled / scrollHeight) * circumference;
  
  circle.style.strokeDashoffset = progress;
  scrollProgress.classList.toggle('visible', scrolled > 100);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.addEventListener('scroll', updateProgress);
scrollProgress.addEventListener('click', scrollToTop);

// Mobile touch support
scrollProgress.addEventListener('touchstart', (e) => {
  e.preventDefault();
  scrollToTop();
});

// Initialize
updateProgress();

