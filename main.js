// Typing Animation Logic
const textElement = document.getElementById("typing-text");
const words = ["Mo'men Ahmed", "Frontend Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    textElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 80;
  } else {
    textElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 150;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 100) {
    nav.classList.remove("bg-transparent", "text-white", "py-4");
    nav.classList.add("bg-white", "text-black", "shadow-xl", "py-3");
  } else {
    nav.classList.add("bg-transparent", "text-white", "py-4");
    nav.classList.remove("bg-white", "text-black", "shadow-xl", "py-3");
  }
});

// Reveal on Scroll Logic
const revealElements = document.querySelectorAll(".reveal");
const skillBars = document.querySelectorAll(".skill-bar-inner");
const stats = document.querySelectorAll("[data-target]");

const observerOptions = {
  threshold: 0.15,
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      // Trigger skill bar animation if it's within a revealed section
      if (entry.target.id === "about") {
        skillBars.forEach((bar) => {
          bar.style.width = bar.getAttribute("data-width");
        });
      }

      // Count-up numbers logic
      if (entry.target.classList.contains("stat-box")) {
        const countUp = (el) => {
          const target = +el.getAttribute("data-target");
          const count = +el.innerText;
          const speed = target / 100;
          if (count < target) {
            el.innerText = Math.ceil(count + speed);
            setTimeout(() => countUp(el), 30);
          } else {
            el.innerText = target;
          }
        };
        const num = entry.target.querySelector("[data-target]");
        if (num && num.innerText === "0") countUp(num);
      }
    }
  });
}, observerOptions);

revealElements.forEach((el) => revealObserver.observe(el));
// Also observe stat boxes specifically for the number counter
document
  .querySelectorAll(".stat-box")
  .forEach((box) => revealObserver.observe(box));

// Mobile Menu Toggle
// const menuBtn = document.getElementById("menu-btn");
// const mobileMenu = document.getElementById("mobile-menu");
// menuBtn.addEventListener("click", () => {
//   const isHidden = mobileMenu.classList.contains("hidden");
//   if (isHidden) {
//     mobileMenu.classList.remove("hidden");
//     setTimeout(() => {
//       mobileMenu.classList.add("scale-y-100", "opacity-100");
//       mobileMenu.classList.remove("scale-y-0", "opacity-0");
//     }, 10);
//   } else {
//     mobileMenu.classList.add("scale-y-0", "opacity-0");
//     mobileMenu.classList.remove("scale-y-100", "opacity-100");
//     setTimeout(() => mobileMenu.classList.add("hidden"), 300);
//   }
// });
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuLinks = mobileMenu.querySelectorAll("a");

// function مخصصة لقفل المنيو بس
function closeMenu() {
  mobileMenu.classList.add("scale-y-0", "opacity-0");
  mobileMenu.classList.remove("scale-y-100", "opacity-100");
  setTimeout(() => mobileMenu.classList.add("hidden"), 300);
}

// الـ Event بتاع زرار الـ Hamburger
menuBtn.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.contains("hidden");

  if (isHidden) {
    mobileMenu.classList.remove("hidden");
    setTimeout(() => {
      mobileMenu.classList.add("scale-y-100", "opacity-100");
      mobileMenu.classList.remove("scale-y-0", "opacity-0");
    }, 10);
  } else {
    closeMenu(); // بننادي الـ function هنا
  }
});

// اللوب اللي بتخلي أي لينك يقفل المنيو لما تدوس عليه
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

// Portfolio Filtering
const filterBtns = document.querySelectorAll(".portfolio-filter");
const projectItems = document.querySelectorAll(".project-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) =>
      b.classList.remove("active", "border-b-2", "border-black"),
    );
    btn.classList.add("active", "border-b-2", "border-black");

    const filterValue = btn.getAttribute("data-filter");

    projectItems.forEach((item) => {
      item.style.transition = "all 0.4s ease";
      if (
        filterValue === "all" ||
        item.getAttribute("data-category") === filterValue
      ) {
        item.style.transform = "scale(1)";
        item.style.opacity = "1";
        setTimeout(() => (item.style.display = "block"), 400);
      } else {
        item.style.transform = "scale(0.8)";
        item.style.opacity = "0";
        setTimeout(() => (item.style.display = "none"), 400);
      }
    });
  });
});

// Start Animation on Load
window.onload = () => {
  type();
  // Initial check for reveals
  document.body.classList.add("loaded");
};

// Custom Keyframes Injection
const style = document.createElement("style");
style.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
document.head.appendChild(style);

const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");

// 2. هنراقب حدث الـ Submit (اللي بيحصل لما تدوس على الزرار)
contactForm.addEventListener("submit", function (e) {
  e.preventDefault(); // دي مهمة جداً عشان تمنع الصفحة إنها تعمل Refresh

  // 3. إظهار الـ Toast (الرسالة الصغيره)
  toast.classList.remove("opacity-0", "translate-y-10", "pointer-events-none");
  toast.classList.add("opacity-100", "translate-y-0");

  // 4. فضي الخانات بعد الإرسال
  this.reset();

  // 5. اختفي تاني بعد 3 ثواني
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-10", "pointer-events-none");
    toast.classList.remove("opacity-100", "translate-y-0");
  }, 3000);
});
