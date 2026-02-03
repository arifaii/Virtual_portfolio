// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] DOM cargado, iniciando scripts...");

  // ===== EMAILJS =====
  let emailjsInstance = null;
  if (typeof window !== "undefined" && window.emailjs) {
    emailjsInstance = window.emailjs;
    emailjsInstance.init("VH2Qm-256a4H7GEtp");
    console.log("[v0] EmailJS inicializado");
  } else {
    console.log("[v0] EmailJS no disponible");
  }

  // ===== NAVEGACIÓN =====
  const nav = document.getElementById("nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  console.log("[v0] Elementos nav:", { nav, navToggle, navMenu });

  if (navToggle && navMenu) {
    // Toggle menu hamburguesa
    navToggle.addEventListener("click", () => {
      const isActive = navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", isActive);
      navToggle.setAttribute(
        "aria-label",
        isActive ? "Cerrar menú" : "Abrir menú",
      );
      document.body.style.overflow = isActive ? "hidden" : "";
    });

    // Cerrar menu al hacer click en un link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menú");
        document.body.style.overflow = "";
      });
    });

    // Cerrar menu al hacer click fuera
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menú");
        document.body.style.overflow = "";
      }
    });

    // Cerrar menu con tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menú");
        document.body.style.overflow = "";
      }
    });
  }

  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

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

  initScrollAnimations();

  // ===== FORMULARIO DE CONTACTO =====
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.querySelector(".btn-submit");

  if (contactForm && submitBtn) {
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (btnText) btnText.style.display = "none";
      if (btnLoading) btnLoading.style.display = "inline-flex";
      submitBtn.disabled = true;

      if (formStatus) {
        formStatus.textContent = "";
        formStatus.className = "form-status";
      }

      const templateParams = {
        name: document.getElementById("name")?.value || "",
        email: document.getElementById("email")?.value || "",
        title: document.getElementById("subject")?.value || "",
        message: document.getElementById("message")?.value || "",
        reply_to: document.getElementById("email")?.value || "",
      };

      try {
        if (!emailjsInstance) throw new Error("EmailJS no disponible");

        // 📩 1. Mail para vos
        await emailjsInstance.send(
          "service_lk20xd6",
          "template_vleqdoa",
          templateParams,
        );

        // 📩 2. Auto-respuesta para el usuario
        await emailjsInstance.send(
          "service_lk20xd6",
          "template_8j0oh3l",
          templateParams,
        );

        if (formStatus) {
          formStatus.textContent =
            "Mensaje enviado correctamente. Te voy a responder pronto :)";
          formStatus.classList.add("success");
        }

        contactForm.reset();
      } catch (error) {
        console.error("EmailJS Error:", error);
        if (formStatus) {
          formStatus.textContent =
            "Error al enviar el mensaje. Por favor, intentá nuevamente.";
          formStatus.classList.add("error");
        }
      } finally {
        if (btnText) btnText.style.display = "inline";
        if (btnLoading) btnLoading.style.display = "none";
        submitBtn.disabled = false;
      }
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const navHeight = document.querySelector(".nav")?.offsetHeight || 0;
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== FOOTER YEAR =====
  const footerYear = document.querySelector(".footer-year");
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // ===== PARALLAX HERO =====
  function handleParallax() {
    if (window.innerWidth > 768) {
      const heroImage = document.querySelector(".hero-image-wrapper");
      if (heroImage) {
        heroImage.style.transform = `translateY(${window.pageYOffset * 0.1}px)`;
      }
    }
  }

  window.addEventListener("scroll", handleParallax);

  // ===== TYPING EFFECT =====
  function typeWriter(element, text, speed = 70) {
    console.log("[v0] Iniciando typewriter con texto:", text);
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
        console.log("[v0] Typewriter completado");
        if (cursor) cursor.classList.remove("typing");
      }
    }

    type();
  }

  // Iniciar efecto de escritura
  const typedName = document.getElementById("typed-name");
  console.log("[v0] Elemento typed-name:", typedName);

  if (typedName) {
    setTimeout(() => {
      console.log("[v0] Ejecutando typeWriter...");
      typeWriter(typedName, "Ariela Faivisovich Krowicki");
    }, 600);
  } else {
    console.log("[v0] ERROR: No se encontró el elemento #typed-name");
  }

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (
        window.innerWidth > 768 &&
        navMenu &&
        navMenu.classList.contains("active")
      ) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Abrir menú");
        document.body.style.overflow = "";
      }
    }, 250);
  });

  console.log("[v0] Portfolio cargado correctamente");
});
