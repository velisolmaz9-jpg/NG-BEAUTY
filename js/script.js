/* ============================================================
   NG BEAUTY — Script principal
   Header au scroll, menu mobile, séquence d'entrée du hero,
   animations d'apparition, carrousels, galerie en lightbox.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileNav();
  initHeroIntro();
  initReveal();
  initCarousels();
  initLightbox();
  initCurrentYear();
});

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  mobileNav.setAttribute("aria-hidden", "true");

  const setState = (isOpen) => {
    toggleBtn.classList.toggle("is-active", isOpen);
    mobileNav.classList.toggle("is-open", isOpen);
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    toggleBtn.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    mobileNav.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  };

  const close = () => setState(false);

  toggleBtn.addEventListener("click", () => {
    setState(!mobileNav.classList.contains("is-open"));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("is-open")) close();
  });
}

/* Séquence d'entrée cinématographique du hero (une seule fois, au chargement) */
function initHeroIntro() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  if (prefersReducedMotion()) {
    hero.classList.add("is-intro-done");
    return;
  }

  requestAnimationFrame(() => {
    hero.classList.add("is-intro-done");
  });
}

/* Apparition progressive au scroll (+ stagger des étoiles d'avis) */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  const starGroups = document.querySelectorAll(".rating-stars");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    starGroups.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if (items.length) {
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

  if (starGroups.length) {
    const starObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            starObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    starGroups.forEach((el) => starObserver.observe(el));
  }
}

/* Carrousels (prestations, avis) : défilement horizontal + flèches + pastilles */
function initCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const track = root.querySelector(".carousel-track");
    const prevBtn = root.querySelector(".carousel-prev");
    const nextBtn = root.querySelector(".carousel-next");
    const dotsWrap = root.querySelector(".carousel-dots");
    if (!track) return;

    const cards = Array.from(track.children);
    if (!cards.length) return;

    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      cards.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Aller à l'élément ${i + 1}`);
        dot.addEventListener("click", () => {
          cards[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
        });
        dotsWrap.appendChild(dot);
      });
    }

    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

    const syncActive = () => {
      const trackLeft = track.scrollLeft;
      let closest = 0;
      let closestDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - trackLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === closest));
    };

    track.addEventListener("scroll", () => {
      window.requestAnimationFrame(syncActive);
    }, { passive: true });

    const scrollByCard = (dir) => {
      const card = cards[0];
      const amount = card.getBoundingClientRect().width + 24;
      track.scrollBy({ left: dir * amount, behavior: "smooth" });
    };

    prevBtn && prevBtn.addEventListener("click", () => scrollByCard(-1));
    nextBtn && nextBtn.addEventListener("click", () => scrollByCard(1));

    syncActive();
  });
}

/* Galerie : agrandissement des visuels en lightbox, avec navigation */
function initLightbox() {
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;

  const triggers = Array.from(document.querySelectorAll("[data-lightbox]"));
  if (!triggers.length) return;

  const content = lightbox.querySelector(".lightbox-content");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");
  let currentIndex = 0;

  const render = (index) => {
    const trigger = triggers[index];
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
  };

  const open = (index) => {
    currentIndex = index;
    render(currentIndex);
    lightbox.classList.add("is-open");
    document.body.classList.add("nav-open");
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    content.innerHTML = "";
  };

  const go = (dir) => {
    currentIndex = (currentIndex + dir + triggers.length) % triggers.length;
    render(currentIndex);
  };

  triggers.forEach((trigger, i) => {
    trigger.addEventListener("click", () => open(i));
  });

  closeBtn && closeBtn.addEventListener("click", close);
  prevBtn && prevBtn.addEventListener("click", () => go(-1));
  nextBtn && nextBtn.addEventListener("click", () => go(1));

  if (triggers.length < 2) {
    prevBtn && (prevBtn.style.display = "none");
    nextBtn && (nextBtn.style.display = "none");
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  });
}

/* Année courante dans le footer */
function initCurrentYear() {
  const el = document.querySelector("[data-year]");
  if (el) el.textContent = new Date().getFullYear();
}
