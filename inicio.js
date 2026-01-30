// ===== EMAILJS =====
(function () {
  emailjs.init("VH2Qm-256a4H7GEtp"); // Public Key
})();

// ===== NAVEGACIÓN =====
const nav = document.getElementById("nav");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

// ===== NAVEGACIÓN ACTIVA =====
const sections = document.querySelectorAll("section[id]");

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLink) navLink.classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightNavOnScroll);

// ===== ANIMACIONES AL SCROLL =====
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  const animatedElements = document.querySelectorAll(
    ".about-content, .skills-grid .skill-item, .timeline-item, .project-card, .contact-content",
  );

  animatedElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", initScrollAnimations);

// ===== FORMULARIO DE CONTACTO =====
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitBtn = document.querySelector(".btn-submit");
const btnText = submitBtn.querySelector(".btn-text");
const btnLoading = submitBtn.querySelector(".btn-loading");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  btnText.style.display = "none";
  btnLoading.style.display = "inline-flex";
  submitBtn.disabled = true;
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const templateParams = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    title: document.getElementById("subject").value,
    message: document.getElementById("message").value,
    reply_to: document.getElementById("email").value,
  };

  try {
    await emailjs.send("service_lk20xd6", "template_vleqdoa", templateParams);

    formStatus.textContent =
      "Mensaje enviado correctamente. Te voy a responder pronto 😊";
    formStatus.classList.add("success");
    contactForm.reset();
  } catch (error) {
    console.error("EmailJS Error:", error);
    formStatus.textContent =
      "Error al enviar el mensaje. Por favor, intentá nuevamente.";
    formStatus.classList.add("error");
  } finally {
    btnText.style.display = "inline";
    btnLoading.style.display = "none";
    submitBtn.disabled = false;
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== FOOTER YEAR =====
const footerYear = document.querySelector(".footer-year");
if (footerYear) footerYear.textContent = new Date().getFullYear();

// ===== PARALLAX HERO =====
window.addEventListener("scroll", () => {
  const heroImage = document.querySelector(".hero-image-wrapper");
  if (heroImage) {
    heroImage.style.transform = `translateY(${window.pageYOffset * 0.1}px)`;
  }
});

// ===== TYPING EFFECT =====
function typeWriter(element, text, speed = 70) {
  let i = 0;
  const cursor = document.querySelector(".cursor");
  if (cursor) cursor.classList.add("typing");

  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      if (cursor) cursor.classList.remove("typing");
    }
  }

  type();
}

document.addEventListener("DOMContentLoaded", () => {
  const typedName = document.getElementById("typed-name");
  if (typedName) {
    setTimeout(() => {
      typeWriter(typedName, "Ariela Faivisovich Krowicki");
    }, 600);
  }
});

console.log("Portfolio cargado y EmailJS funcionando 🚀");
