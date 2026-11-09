import { icon } from "./ui.js";

const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {
  const setMenuState = (open) => {
    mobileMenu.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    menuToggle.innerHTML = icon(open ? "close" : "menu");
  };

  menuToggle.addEventListener("click", () => {
    setMenuState(!mobileMenu.classList.contains("is-open"));
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
      setMenuState(false);
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 860) setMenuState(false);
  });
}

const page = document.body.dataset.page;
document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === page) {
    link.setAttribute("aria-current", "page");
  } else {
    link.removeAttribute("aria-current");
  }
});

const year = new Date().getFullYear();
document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(year);
});
