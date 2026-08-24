/* ============================================================
   NG BEAUTY — Script principal
   Header au scroll, menu mobile, animations d'apparition,
   galerie en lightbox.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileNav();
  initReveal();
  initLightbox();
  initCurrentYear();
});

/* Header : devient opaque après un léger scroll */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const toggle = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };

  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/* Menu hamburger mobile */
function initMobileNav() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (!toggleBtn || !mobileNav) return;

  const close = () => {
    toggleBtn.classList.remove("is-active");
    mobileNav.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    toggleBtn.classList.toggle("is-active", isOpen);
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });
}

/* Apparition progressive au scroll */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

/* Galerie : agrandissement des visuels en lightbox */
function initLightbox() {
  const triggers = document.querySelectorAll("[data-lightbox]");
  const lightbox = document.querySelector(".lightbox");
  if (!triggers.length || !lightbox) return;

  const content = lightbox.querySelector(".lightbox-content");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  const open = (trigger) => {
    const type = trigger.dataset.lightbox;
    const src = trigger.dataset.src;
    const alt = trigger.dataset.alt || "";

    content.innerHTML = "";

    if (type === "video") {
      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      content.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      content.appendChild(img);
    }

    lightbox.classList.add("is-open");
    document.body.classList.add("nav-open");
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    content.innerHTML = "";
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => open(trigger));
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

/* Année courante dans le footer */
function initCurrentYear() {
  const el = document.querySelector("[data-year]");
  if (el) el.textContent = new Date().getFullYear();
}
