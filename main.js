document.addEventListener("DOMContentLoaded", () => {
  // Reveal animations on scroll
  const revealElements = document.querySelectorAll(".reveal");

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
      threshold: 0.15,
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

    // Theme toggle
    const themeToggle = document.querySelector('#theme-toggle');
    const themeIcon = document.querySelector('#theme-icon');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
            
            // Toggle icon
            const newIcon = isLight ? 'moon' : 'sun';
            themeIcon.setAttribute('data-lucide', newIcon);
            lucide.createIcons();
        });
    }

  // Add a subtle parallax effect to the hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.1}px)`;
      hero.style.opacity = 1 - scrolled / 700;
    }
  });

  // Animate tokens appearing (Skills)
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag, index) => {
    tag.style.transitionDelay = `${index * 50}px`;
  });
});
