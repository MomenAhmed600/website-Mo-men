// // Reveal on Scroll Logic
// const revealElements = document.querySelectorAll(".reveal");

// const observerOptions = {
//     threshold: 0.1,
// };

// const revealObserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add("active");
//         }
//     });
// }, observerOptions);

// revealElements.forEach((el) => revealObserver.observe(el));

// // Mobile Menu Toggle
// const menuBtn = document.getElementById("menu-btn");
// const mobileMenu = document.getElementById("mobile-menu");
// const mobileLinks = document.querySelectorAll(".mobile-link");

// function closeMenu() {
//     mobileMenu.classList.add("scale-y-0", "opacity-0");
//     mobileMenu.classList.remove("scale-y-100", "opacity-100");
//     setTimeout(() => mobileMenu.classList.add("hidden"), 300);
// }

// menuBtn.addEventListener("click", () => {
//     const isHidden = mobileMenu.classList.contains("hidden");

//     if (isHidden) {
//         mobileMenu.classList.remove("hidden");
//         setTimeout(() => {
//             mobileMenu.classList.add("scale-y-100", "opacity-100");
//             mobileMenu.classList.remove("scale-y-0", "opacity-0");
//         }, 10);
//     } else {
//         closeMenu();
//     }
// });

// mobileLinks.forEach((link) => {
//     link.addEventListener("click", () => {
//         closeMenu();
//     });
// });

// // Contact Form Handling
// const contactForm = document.getElementById("contact-form");
// const toast = document.getElementById("toast");

// contactForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     toast.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
//     toast.classList.add("opacity-100", "translate-y-0");

//     this.reset();

//     setTimeout(() => {
//         toast.classList.add("opacity-0", "translate-y-10", "pointer-events-none");
//         toast.classList.remove("opacity-100", "translate-y-0");
//     }, 3500);
// });

// Typing Animation Logic
const textElement = document.getElementById("typing-text");
const words = ["Mo'men Ahmed", "Frontend Developer", "UI/UX Designer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    textElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 70;
  } else {
    textElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 130;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typeSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 400;
  }

  setTimeout(type, typeSpeed);
}

// Scroll Reveal Animation Observer
const revealElements = document.querySelectorAll(".reveal");
const observerOptions = { threshold: 0.1 };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

revealElements.forEach((el) => revealObserver.observe(el));

// Mobile Menu Toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = mobileMenu.querySelectorAll("a");

function closeMobileMenu() {
  mobileMenu.classList.add("scale-y-0", "opacity-0");
  mobileMenu.classList.remove("scale-y-100", "opacity-100");
  setTimeout(() => mobileMenu.classList.add("hidden"), 300);
}

menuBtn.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.contains("hidden");
  if (isHidden) {
    mobileMenu.classList.remove("hidden");
    setTimeout(() => {
      mobileMenu.classList.add("scale-y-100", "opacity-100");
      mobileMenu.classList.remove("scale-y-0", "opacity-0");
    }, 10);
  } else {
    closeMobileMenu();
  }
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => closeMobileMenu());
});

// Start Typing Animation on Load
window.onload = () => {
  type();
};

// Contact Form Toast Notification Handler
const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  toast.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
  toast.classList.add("opacity-100", "translate-y-0");
  this.reset();
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-10", "pointer-events-none");
    toast.classList.remove("opacity-100", "translate-y-0");
  }, 3500);
});
