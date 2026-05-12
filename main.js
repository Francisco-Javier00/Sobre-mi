document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const nav = document.querySelector(".nav");
  const menuToggle = document.querySelector("#menu-toggle");
  const navPanel = document.querySelector("#primary-navigation");
  const themeToggle = document.querySelector("#theme-toggle");
  const themeIcon = document.querySelector("#theme-icon");
  const revealElements = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll('.nav-panel a[href^="#"]');

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme || (prefersDark.matches ? "dark" : "light");

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (themeIcon) {
      themeIcon.setAttribute("data-lucide", theme === "dark" ? "moon-star" : "sun-medium");
      if (window.lucide) {
        lucide.createIcons();
      }
    }
  };

  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme") || "dark";
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  if (menuToggle && navPanel) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navPanel.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      const menuIcon = menuToggle.querySelector("i");
      if (menuIcon) {
        menuIcon.setAttribute("data-lucide", isOpen ? "x" : "menu");
        if (window.lucide) {
          lucide.createIcons();
        }
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navPanel.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        const menuIcon = menuToggle.querySelector("i");
        if (menuIcon) {
          menuIcon.setAttribute("data-lucide", "menu");
          if (window.lucide) {
            lucide.createIcons();
          }
        }
      });
    });
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const sections = Array.from(document.querySelectorAll("section[id]"));

  const setActiveLink = () => {
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const link = document.querySelector(`.nav-panel a[href="#${section.id}"]`);
      if (!link) return;

      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const isActive = scrollPosition >= sectionTop && scrollPosition < sectionBottom;
      link.style.color = isActive ? "var(--text-main)" : "";
    });
  };

  const handleScroll = () => {
    if (nav) {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
    }
    setActiveLink();
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const offset = nav ? nav.offsetHeight + 20 : 100;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  });

  if (window.lucide) {
    lucide.createIcons();
  }
});
