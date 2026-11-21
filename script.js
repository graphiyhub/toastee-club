const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");

navToggle.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isExpanded));
  navToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  }
});

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-chip").forEach((chip) => {
      const active = chip === button;
      chip.classList.toggle("is-active", active);
      chip.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".menu-card").forEach((card) => {
      card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const backToTop = document.querySelector(".back-to-top");
let scrollTicking = false;
window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      backToTop.classList.toggle("is-visible", window.scrollY > 560);
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const parallaxItems = document.querySelectorAll("[data-parallax]");
if (parallaxItems.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let parallaxTicking = false;
  window.addEventListener("scroll", () => {
    if (!parallaxTicking) {
      window.requestAnimationFrame(() => {
        parallaxItems.forEach((item) => {
          const offset = item.getBoundingClientRect().top * Number(item.dataset.parallax);
          item.style.translate = `0 ${offset}px`;
        });
        parallaxTicking = false;
      });
      parallaxTicking = true;
    }
  }, { passive: true });
}

document.querySelector("#year").textContent = new Date().getFullYear();
