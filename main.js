document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const nav = document.querySelector(".nav");
  const menuToggle = document.querySelector("#menu-toggle");
  const navPanel = document.querySelector("#primary-navigation");
  const themeToggle = document.querySelector("#theme-toggle");
  const langEsButton = document.querySelector("#lang-es");
  const langEnButton = document.querySelector("#lang-en");
  const revealElements = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll('.nav-panel a[href^="#"]');

  const preferences = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {}
    },
  };
  const savedTheme = preferences.get("theme");
  const initialTheme = savedTheme === "light" ? "light" : "dark";
  const savedLanguage = preferences.get("language");
  const initialLanguage = savedLanguage === "en" ? "en" : "es";

  const metaDescription = document.querySelector('meta[name="description"]');

  const ui = {
    skipLink: document.querySelector(".skip-link"),
    brandText: document.querySelector(".brand-text span"),
    menuLabel: document.querySelector("#menu-toggle span"),
    navAbout: document.querySelector('.nav-panel a[href="#about"]'),
    navSkills: document.querySelector('.nav-panel a[href="#skills"]'),
    navExperience: document.querySelector('.nav-panel a[href="#experience"]'),
    navProjects: document.querySelector('.nav-panel a[href="#projects"]'),
    navContact: document.querySelector('.nav-panel a[href="#contact"]'),
    heroEyebrow: document.querySelector(".hero-copy .eyebrow"),
    heroTitle: document.querySelector(".hero-copy h1"),
    heroLead: document.querySelector(".hero-lead"),
    heroCtaPrimary: document.querySelector(".hero-actions .btn-primary"),
    heroCtaSecondary: document.querySelector(".hero-actions .btn-secondary"),
    statValue1: document.querySelector(
      ".hero-stats .stat-card:nth-child(1) .stat-value",
    ),
    statLabel1: document.querySelector(
      ".hero-stats .stat-card:nth-child(1) .stat-label",
    ),
    statValue2: document.querySelector(
      ".hero-stats .stat-card:nth-child(2) .stat-value",
    ),
    statLabel2: document.querySelector(
      ".hero-stats .stat-card:nth-child(2) .stat-label",
    ),
    statValue3: document.querySelector(
      ".hero-stats .stat-card:nth-child(3) .stat-value",
    ),
    statLabel3: document.querySelector(
      ".hero-stats .stat-card:nth-child(3) .stat-label",
    ),
    profileRole: document.querySelector(".profile-role"),
    profileTitle: document.querySelector(".profile-card h2"),
    profileCopy: document.querySelector(".profile-card > p:not(.profile-role)"),
    aboutEyebrow: document.querySelector("#about .eyebrow"),
    aboutTitle: document.querySelector("#about .section-heading h2"),
    aboutCopy: document.querySelector(
      "#about .section-heading p:not(.eyebrow)",
    ),
    aboutCardTitle: document.querySelector(
      "#about .about-cards-stack .card:nth-child(1) .card-topline span",
    ),
    aboutCardCopy: document.querySelector(
      "#about .about-cards-stack .card:nth-child(1) p",
    ),
    aboutExtraTitle: document.querySelector(
      "#about .about-cards-stack .card:nth-child(2) .card-topline span",
    ),
    aboutExtraCopy: document.querySelector(
      "#about .about-cards-stack .card:nth-child(2) p",
    ),
    keyDataTitle: document.querySelector(
      "#about .about-cards-stack .card:nth-child(3) .card-topline span",
    ),
    languagesHeading: document.querySelector(
      "#about .about-key-data .key-data-item:nth-child(1) .key-data-label",
    ),
    spanishTag: document.querySelector(
      "#about .about-key-data .key-data-item:nth-child(1) .tag",
    ),
    availabilityHeading: document.querySelector(
      "#about .about-key-data .key-data-item:nth-child(2) .key-data-label",
    ),
    availabilityCopy: document.querySelector(
      "#about .about-key-data .key-data-item:nth-child(2) .tag",
    ),
    skillsEyebrow: document.querySelector("#skills .eyebrow"),
    skillsTitle: document.querySelector("#skills .section-heading h2"),
    languageCardTitle: document.querySelector(
      "#skills .skill-card:nth-child(1) h3",
    ),
    languageCardCopy: document.querySelector(
      "#skills .skill-card:nth-child(1) p",
    ),
    webCardTitle: document.querySelector("#skills .skill-card:nth-child(2) h3"),
    webCardCopy: document.querySelector("#skills .skill-card:nth-child(2) p"),
    dbCardTitle: document.querySelector("#skills .skill-card:nth-child(3) h3"),
    dbCardCopy: document.querySelector("#skills .skill-card:nth-child(3) p"),
    experienceEyebrow: document.querySelector("#experience .eyebrow"),
    experienceTitle: document.querySelector("#experience .section-heading h2"),
    expCurrentDate: document.querySelector(
      "#experience .timeline-item:nth-child(2) .timeline-date",
    ),
    expCurrentTitle: document.querySelector(
      "#experience .timeline-item:nth-child(2) h3",
    ),
    expCurrentCopy: document.querySelector(
      "#experience .timeline-item:nth-child(2) p",
    ),
    expFenles4Date: document.querySelector(
      "#experience .timeline-item:nth-child(3) .timeline-date",
    ),
    expFenles4Title: document.querySelector(
      "#experience .timeline-item:nth-child(3) h3",
    ),
    expFenles4Copy: document.querySelector(
      "#experience .timeline-item:nth-child(3) p",
    ),
    expFenles1Date: document.querySelector(
      "#experience .timeline-item:nth-child(4) .timeline-date",
    ),
    expFenles1Title: document.querySelector(
      "#experience .timeline-item:nth-child(4) h3",
    ),
    expFenles1Copy: document.querySelector(
      "#experience .timeline-item:nth-child(4) p",
    ),
    expDoscarDate: document.querySelector(
      "#experience .timeline-item:nth-child(5) .timeline-date",
    ),
    expDoscarTitle: document.querySelector(
      "#experience .timeline-item:nth-child(5) h3",
    ),
    expDoscarCopy: document.querySelector(
      "#experience .timeline-item:nth-child(5) p",
    ),
    expEduDate: document.querySelector(
      "#experience .timeline-item:nth-child(6) .timeline-date",
    ),
    expEduTitle: document.querySelector(
      "#experience .timeline-item:nth-child(6) h3",
    ),
    expEduCopy: document.querySelector(
      "#experience .timeline-item:nth-child(6) p",
    ),
    projectsEyebrow: document.querySelector("#projects .eyebrow"),
    projectsTitle: document.querySelector("#projects .section-heading h2"),
    project1Title: document.querySelector(
      "#projects .project-card[data-project=security] h3",
    ),
    project1Copy: document.querySelector(
      "#projects .project-card[data-project=security] p",
    ),
    project2Title: document.querySelector(
      "#projects .project-card[data-project=preguntadaw] h3",
    ),
    project2Copy: document.querySelector(
      "#projects .project-card[data-project=preguntadaw] p",
    ),
    project3Title: document.querySelector(
      "#projects .project-card[data-project=dualex] h3",
    ),
    project3Copy: document.querySelector(
      "#projects .project-card[data-project=dualex] p",
    ),
    project4Title: document.querySelector(
      "#projects .project-card[data-project=leagues] h3",
    ),
    project4Copy: document.querySelector(
      "#projects .project-card[data-project=leagues] p",
    ),
    project5Title: document.querySelector(
      "#projects .project-card[data-project=forum] h3",
    ),
    project5Copy: document.querySelector(
      "#projects .project-card[data-project=forum] p",
    ),
    contactEyebrow: document.querySelector("#contact .eyebrow"),
    contactTitle: document.querySelector("#contact .section-heading h2"),
    contactCopy: document.querySelector(
      "#contact .section-heading p:not(.eyebrow)",
    ),
    contactGitHubLink: document.querySelector(
      "#contact .contact-social .social-link:nth-child(1) span",
    ),
    contactLinkedInLink: document.querySelector(
      "#contact .contact-social .social-link:nth-child(2) span",
    ),
    footerCopy1: document.querySelector(
      ".site-footer .footer-inner p:nth-child(1)",
    ),
    footerCopy2: document.querySelector(
      ".site-footer .footer-inner p:nth-child(2)",
    ),
  };

  const translations = {
    es: {
      title: "Francisco Javier Martínez Fernández | Portfolio",
      description:
        "Francisco Javier Martínez Fernández. Desarrollador web especializado en React y estudiante de la especialización en Inteligencia Artificial en el IES Augustóbriga.",
      skipLink: "Saltar al contenido",
      brandText: "Portfolio personal",
      menu: "Menú",
      nav: {
        about: "Sobre mí",
        skills: "Habilidades",
        experience: "Trayectoria",
        projects: "Proyectos",
        contact: "Contacto",
      },
      hero: {
        eyebrow: "Disponible para nuevas oportunidades",
        title:
          'Código con intención. <span class="gradient-text">Ideas con futuro.</span>',
        lead: "Soy desarrollador web, con React como punto de partida y las personas en el centro. Actualmente curso la especialización en Inteligencia Artificial en el IES Augustóbriga.",
        ctaPrimary: "Hablemos",
        ctaSecondary: "Ver proyectos",
        stat1Value: "React",
        stat1Label: "Mi punto de partida",
        stat2Value: "IA",
        stat2Label: "Especialización en curso",
        stat3Value: "Team",
        stat3Label: "Mejor en equipo",
        role: "DAW · React · Inteligencia Artificial",
        profileTitle: "Francisco Javier Martínez Fernández",
        profileCopy:
          "Desarrollador web, curioso por naturaleza. Me gusta transformar ideas en productos que se disfruten usando.",
      },
      about: {
        eyebrow: "01 / Sobre mí",
        title: "Curiosidad como motor. Código como lenguaje.",
        copy: "Soy Técnico Superior en Desarrollo de Aplicaciones Web por la Escuela Virgen de Guadalupe. Ahora continúo mi formación con la especialización en Inteligencia Artificial en el IES Augustóbriga. Me motiva aprender, colaborar y encontrar soluciones que tengan sentido.",
        what: "Lo que busco",
        whatCopy:
          "Integrarme en un equipo dinámico donde pueda aportar, aprender y profundizar en frameworks y herramientas modernas para crear productos útiles.",
        extraTitle: "Más allá del código",
        extraCopy:
          "Me motiva aprender en entornos reales, colaborar con buena comunicación y aportar una actitud cercana, constante y resolutiva. Fuera del trabajo técnico, me gusta mantenerme al día, observar cómo funcionan los productos digitales y pensar en cómo mejorarlos.",
        keyDataTitle: "Datos clave",
        languages: "Idiomas",
        spanish: "Español nativo",
        availability: "Disponibilidad",
        availabilityCopy: "Carnet de conducir tipo B",
      },
      skills: {
        eyebrow: "02 / Habilidades",
        title: "Las herramientas detrás de las ideas.",
        languageCardTitle: "Lenguajes",
        languageCardCopy:
          "Base versátil para construir lógica y resolver problemas.",
        webCardTitle: "Desarrollo web",
        webCardCopy:
          "Interés por interfaces limpias, responsivas y accesibles.",
        dbCardTitle: "Bases de datos",
        dbCardCopy: "Trabajo cómodo con datos relacionales y consultas SQL.",
      },
      experience: {
        eyebrow: "03 / Trayectoria",
        title: "Cada etapa, una nueva perspectiva.",
        currentDate: "2024 - 2026",
        currentTitle: "Técnico Superior en DAW",
        currentCopy:
          "Escuela Virgen de Guadalupe. Graduado en Desarrollo de Aplicaciones Web con especialización en diseño responsivo y lógica front-end.",
        fenles4Date: "2026 · 4 meses",
        fenles4Title: "Prácticas en FENLES",
        fenles4Copy:
          "Estuve trabajando con sus tecnologías y trasladando su web, adaptándola al nuevo entorno y apoyando la puesta al día del proyecto.",
        fenles1Date: "DAW · 1 mes",
        fenles1Title: "Prácticas en FENLES",
        fenles1Copy:
          "Primeras prácticas en la empresa, con contacto directo con el entorno profesional y participación en tareas del proyecto web.",
        doscarDate: "SMR · 3 meses",
        doscarTitle: "Prácticas en Grupo DOSCAR",
        doscarCopy:
          "Instalación de TPV en locales y reparación de equipos informáticos.",
        eduDate: "Educación",
        eduTitle: "Sistemas Microinformáticos y Redes",
        eduCopy: "Ciclo medio completado con éxito.",
      },
      projects: {
        eyebrow: "04 / Proyectos y voluntariado",
        title: "Ideas que ya tienen forma.",
        project1Title: "Seguridad informática",
        project1Copy:
          "Voluntario en charlas de seguridad informática para concienciar sobre buenas prácticas y prevención de riesgos.",
        project2Title: "PreguntaDaw",
        project2Copy:
          "Desarrollo en grupo de un videojuego para concienciar a los jóvenes sobre el cambio climático.",
        project3Title: "DUALEX",
        project3Copy:
          "Classroom para la gestión de las FP duales de cada año, pensado para centralizar la organización, el seguimiento y la información de forma más clara.",
        project4Title: "easyLeagues",
        project4Copy:
          "Proyecto de gestión de ligas y torneos deportivos en el que participé como cofundador y segundo socio. No llegó a terminarse y fue descartado.",
        project5Title: "laDoblem",
        project5Copy:
          "Creador y desarrollador de una comunidad y foro de discusión dedicado al anime y manga, optimizado para la interacción de usuarios y SEO.",
      },
      contact: {
        eyebrow: "05 / Contacto",
        title: "Lo próximo empieza con un hola.",
        copy: "¿Buscas a alguien que se implique, aporte ideas y siga creciendo con tu equipo? Me encantará conocerte.",
        github: "GitHub",
        linkedin: "LinkedIn",
      },
      footer1: "© 2026 Francisco Javier Martínez Fernández.",
      footer2: "Hecho con intención. Siempre aprendiendo.",
    },
    en: {
      title: "Francisco Javier Martínez Fernández | Portfolio",
      description:
        "Francisco Javier Martínez Fernández. React web developer, currently studying an Artificial Intelligence specialization at IES Augustóbriga.",
      skipLink: "Skip to content",
      brandText: "Personal portfolio",
      menu: "Menu",
      nav: {
        about: "About",
        skills: "Skills",
        experience: "Experience",
        projects: "Projects",
        contact: "Contact",
      },
      hero: {
        eyebrow: "Available for new opportunities",
        title:
          'Code with purpose. <span class="gradient-text">Ideas with a future.</span>',
        lead: "I'm a web developer, with React as my starting point and people at the centre. I'm currently studying an Artificial Intelligence specialization at IES Augustóbriga.",
        ctaPrimary: "Let's talk",
        ctaSecondary: "View projects",
        stat1Value: "React",
        stat1Label: "My starting point",
        stat2Value: "AI",
        stat2Label: "Specialization in progress",
        stat3Value: "Team",
        stat3Label: "Better together",
        role: "Web development · React · AI",
        profileTitle: "Francisco Javier Martínez Fernández",
        profileCopy:
          "Web developer, curious by nature. I like turning ideas into products people enjoy using.",
      },
      about: {
        eyebrow: "01 / About me",
        title: "Driven by curiosity. Fluent in code.",
        copy: "I graduated in Web Application Development at Escuela Virgen de Guadalupe. I'm now continuing my education with an Artificial Intelligence specialization at IES Augustóbriga. I'm motivated by learning, collaborating, and finding meaningful solutions.",
        what: "What I'm looking for",
        whatCopy:
          "To join a dynamic team where I can contribute, learn, and deepen my knowledge of modern frameworks and tools to build useful products.",
        extraTitle: "Beyond the code",
        extraCopy:
          "I enjoy learning in real environments, collaborating with good communication, and bringing a friendly, steady, and problem-solving attitude. Outside the technical side, I like staying up to date, observing how digital products work, and thinking about how to improve them.",
        keyDataTitle: "Key Details",
        languages: "Languages",
        spanish: "Native Spanish",
        availability: "Availability",
        availabilityCopy: "Driving licence B",
      },
      skills: {
        eyebrow: "02 / Skills",
        title: "The tools behind the ideas.",
        languageCardTitle: "Languages",
        languageCardCopy:
          "A versatile base for building logic and solving problems.",
        webCardTitle: "Web development",
        webCardCopy:
          "Interest in clean, responsive, and accessible interfaces.",
        dbCardTitle: "Databases",
        dbCardCopy: "Comfortable working with relational data and SQL queries.",
      },
      experience: {
        eyebrow: "03 / Experience",
        title: "A new perspective at every step.",
        currentDate: "2024 - 2026",
        currentTitle: "Técnico Superior en DAW",
        currentCopy:
          "Escuela Virgen de Guadalupe. Graduated in Web Application Development with specialization in responsive design and front-end logic.",
        fenles4Date: "2026 · 4 months",
        fenles4Title: "Internship at FENLES",
        fenles4Copy:
          "I worked with their technologies and migrated their website, adapting it to the new environment and supporting the project refresh.",
        fenles1Date: "DAW · 1 month",
        fenles1Title: "Internship at FENLES",
        fenles1Copy:
          "First internship experience at the company, with direct contact with the professional environment and participation in web project tasks.",
        doscarDate: "SMR · 3 months",
        doscarTitle: "Internship at Grupo DOSCAR",
        doscarCopy:
          "POS terminal installation in local businesses and computer equipment repair.",
        eduDate: "Education",
        eduTitle: "Computer Systems and Networks",
        eduCopy: "Completed successfully.",
      },
      projects: {
        eyebrow: "04 / Projects and volunteering",
        title: "Ideas brought to life.",
        project1Title: "Cybersecurity",
        project1Copy:
          "Volunteer in cybersecurity talks to raise awareness of good practices and risk prevention.",
        project2Title: "PreguntaDaw",
        project2Copy:
          "Group development of a video game to raise awareness among young people about climate change.",
        project3Title: "DUALEX",
        project3Copy:
          "A classroom-style platform for managing dual VET programs each year, designed to centralize organization, tracking, and information more clearly.",
        project4Title: "easyLeagues",
        project4Copy:
          "A sports league and tournament management project in which I participated as co-founder and second partner. Development was never completed and the project was abandoned.",
        project5Title: "laDoblem",
        project5Copy:
          "Creator and developer of an active community and discussion forum dedicated to anime and manga, optimized for user engagement and SEO.",
      },
      contact: {
        eyebrow: "05 / Contact",
        title: "What comes next starts with hello.",
        copy: "Looking for someone who gets involved, brings ideas, and grows with your team? I'd love to meet you.",
        github: "GitHub",
        linkedin: "LinkedIn",
      },
      footer1: "© 2026 Francisco Javier Martínez Fernández.",
      footer2: "Made with purpose. Always learning.",
    },
  };

  const extraTranslations = {
    es: {
      intro: "Hola, soy Francisco Javier.",
      profileLabel: "DETRÁS DEL CÓDIGO",
      learningLabel: "Ahora, un paso más allá",
      learningTitle: "Especialización en Inteligencia Artificial",
      learningSchool: "IES Augustóbriga · En curso",
      location: "Badajoz, España",
      discover: "Un poco más sobre mí",
      aiDate: "Actualidad · En curso",
      aiTitle: "Especialización en Inteligencia Artificial",
      aiCopy:
        "IES Augustóbriga. Actualmente cursando esta especialización para ampliar mi formación en inteligencia artificial y explorar nuevas posibilidades en el desarrollo de soluciones digitales.",
      previewNote: "Ilustraciones conceptuales de las interfaces.",
      contactInvite:
        "Una idea, una oportunidad o simplemente un hola. El primer paso es una conversación.",
      contactAction: "Conectemos en LinkedIn",
      dualexCategory: "Web / Educación",
      forumCategory: "Comunidad / PHP",
      leaguesStatus: "No terminado · Descartado",
    },
    en: {
      intro: "Hi, I'm Francisco Javier.",
      profileLabel: "BEHIND THE CODE",
      learningLabel: "Now, one step further",
      learningTitle: "Artificial Intelligence specialization",
      learningSchool: "IES Augustóbriga · In progress",
      location: "Badajoz, Spain",
      discover: "A little more about me",
      aiDate: "Currently · In progress",
      aiTitle: "Artificial Intelligence specialization",
      aiCopy:
        "IES Augustóbriga. Currently studying this specialization to expand my knowledge of artificial intelligence and explore new possibilities in developing digital solutions.",
      previewNote: "Conceptual illustrations of the interfaces.",
      contactInvite:
        "An idea, an opportunity, or just a hello. The first step is a conversation.",
      contactAction: "Connect on LinkedIn",
      dualexCategory: "Web / Education",
      forumCategory: "Community / PHP",
      leaguesStatus: "Unfinished · Abandoned",
    },
  };

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#101412" : "#f5f5ee");
    preferences.set("theme", theme);
    if (themeToggle) {
      themeToggle.innerHTML = `<i data-lucide="${theme === "dark" ? "sun-medium" : "moon-star"}" aria-hidden="true"></i>`;
      themeToggle.setAttribute(
        "aria-label",
        root.lang === "en" ? "Switch color theme" : "Cambiar tema de color",
      );
      if (window.lucide) lucide.createIcons();
    }
  };

  const applyLanguage = (language) => {
    const t = translations[language] || translations.es;
    root.setAttribute("lang", language);
    preferences.set("language", language);

    if (document.title !== t.title) {
      document.title = t.title;
    }
    if (metaDescription) {
      metaDescription.setAttribute("content", t.description);
    }
    if (ui.skipLink) ui.skipLink.textContent = t.skipLink;
    if (ui.brandText) ui.brandText.textContent = t.brandText;
    if (ui.menuLabel) ui.menuLabel.textContent = t.menu;
    if (ui.navAbout) ui.navAbout.textContent = t.nav.about;
    if (ui.navSkills) ui.navSkills.textContent = t.nav.skills;
    if (ui.navExperience) ui.navExperience.textContent = t.nav.experience;
    if (ui.navProjects) ui.navProjects.textContent = t.nav.projects;
    if (ui.navContact) ui.navContact.textContent = t.nav.contact;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = extraTranslations[language]?.[element.dataset.i18n];
      if (value) element.textContent = value;
    });
    themeToggle?.setAttribute(
      "aria-label",
      language === "en" ? "Switch color theme" : "Cambiar tema de color",
    );

    if (ui.heroEyebrow) ui.heroEyebrow.textContent = t.hero.eyebrow;
    if (ui.heroTitle) ui.heroTitle.innerHTML = t.hero.title;
    if (ui.heroLead) ui.heroLead.textContent = t.hero.lead;
    if (ui.heroCtaPrimary) {
      const label = ui.heroCtaPrimary.querySelector(".btn-label");
      if (label) label.textContent = t.hero.ctaPrimary;
    }
    if (ui.heroCtaSecondary) {
      const label = ui.heroCtaSecondary.querySelector(".btn-label");
      if (label) label.textContent = t.hero.ctaSecondary;
    }
    if (ui.statValue1) ui.statValue1.textContent = t.hero.stat1Value;
    if (ui.statLabel1) ui.statLabel1.textContent = t.hero.stat1Label;
    if (ui.statValue2) ui.statValue2.textContent = t.hero.stat2Value;
    if (ui.statLabel2) ui.statLabel2.textContent = t.hero.stat2Label;
    if (ui.statValue3) ui.statValue3.textContent = t.hero.stat3Value;
    if (ui.statLabel3) ui.statLabel3.textContent = t.hero.stat3Label;
    if (ui.profileRole) ui.profileRole.textContent = t.hero.role;
    if (ui.profileTitle) ui.profileTitle.textContent = t.hero.profileTitle;
    if (ui.profileCopy) ui.profileCopy.textContent = t.hero.profileCopy;

    if (ui.aboutEyebrow) ui.aboutEyebrow.textContent = t.about.eyebrow;
    if (ui.aboutTitle) ui.aboutTitle.textContent = t.about.title;
    if (ui.aboutCopy) ui.aboutCopy.textContent = t.about.copy;
    if (ui.aboutCardTitle) ui.aboutCardTitle.textContent = t.about.what;
    if (ui.aboutCardCopy) ui.aboutCardCopy.textContent = t.about.whatCopy;
    if (ui.aboutExtraTitle) ui.aboutExtraTitle.textContent = t.about.extraTitle;
    if (ui.aboutExtraCopy) ui.aboutExtraCopy.textContent = t.about.extraCopy;
    if (ui.keyDataTitle) ui.keyDataTitle.textContent = t.about.keyDataTitle;
    if (ui.languagesHeading)
      ui.languagesHeading.textContent = t.about.languages;
    if (ui.spanishTag) ui.spanishTag.textContent = t.about.spanish;
    if (ui.availabilityHeading)
      ui.availabilityHeading.textContent = t.about.availability;
    if (ui.availabilityCopy)
      ui.availabilityCopy.textContent = t.about.availabilityCopy;

    if (ui.skillsEyebrow) ui.skillsEyebrow.textContent = t.skills.eyebrow;
    if (ui.skillsTitle) ui.skillsTitle.textContent = t.skills.title;
    if (ui.languageCardTitle)
      ui.languageCardTitle.textContent = t.skills.languageCardTitle;
    if (ui.languageCardCopy)
      ui.languageCardCopy.textContent = t.skills.languageCardCopy;
    if (ui.webCardTitle) ui.webCardTitle.textContent = t.skills.webCardTitle;
    if (ui.webCardCopy) ui.webCardCopy.textContent = t.skills.webCardCopy;
    if (ui.dbCardTitle) ui.dbCardTitle.textContent = t.skills.dbCardTitle;
    if (ui.dbCardCopy) ui.dbCardCopy.textContent = t.skills.dbCardCopy;

    if (ui.experienceEyebrow)
      ui.experienceEyebrow.textContent = t.experience.eyebrow;
    if (ui.experienceTitle) ui.experienceTitle.textContent = t.experience.title;
    if (ui.expCurrentDate)
      ui.expCurrentDate.textContent = t.experience.currentDate;
    if (ui.expCurrentTitle)
      ui.expCurrentTitle.textContent = t.experience.currentTitle;
    if (ui.expCurrentCopy)
      ui.expCurrentCopy.textContent = t.experience.currentCopy;
    if (ui.expFenles4Date)
      ui.expFenles4Date.textContent = t.experience.fenles4Date;
    if (ui.expFenles4Title)
      ui.expFenles4Title.textContent = t.experience.fenles4Title;
    if (ui.expFenles4Copy)
      ui.expFenles4Copy.textContent = t.experience.fenles4Copy;
    if (ui.expFenles1Date)
      ui.expFenles1Date.textContent = t.experience.fenles1Date;
    if (ui.expFenles1Title)
      ui.expFenles1Title.textContent = t.experience.fenles1Title;
    if (ui.expFenles1Copy)
      ui.expFenles1Copy.textContent = t.experience.fenles1Copy;
    if (ui.expDoscarDate)
      ui.expDoscarDate.textContent = t.experience.doscarDate;
    if (ui.expDoscarTitle)
      ui.expDoscarTitle.textContent = t.experience.doscarTitle;
    if (ui.expDoscarCopy)
      ui.expDoscarCopy.textContent = t.experience.doscarCopy;
    if (ui.expEduDate) ui.expEduDate.textContent = t.experience.eduDate;
    if (ui.expEduTitle) ui.expEduTitle.textContent = t.experience.eduTitle;
    if (ui.expEduCopy) ui.expEduCopy.textContent = t.experience.eduCopy;

    if (ui.projectsEyebrow) ui.projectsEyebrow.textContent = t.projects.eyebrow;
    if (ui.projectsTitle) ui.projectsTitle.textContent = t.projects.title;
    if (ui.project1Title)
      ui.project1Title.textContent = t.projects.project1Title;
    if (ui.project1Copy) ui.project1Copy.textContent = t.projects.project1Copy;
    if (ui.project2Title)
      ui.project2Title.textContent = t.projects.project2Title;
    if (ui.project2Copy) ui.project2Copy.textContent = t.projects.project2Copy;
    if (ui.project3Title)
      ui.project3Title.textContent = t.projects.project3Title;
    if (ui.project3Copy) ui.project3Copy.textContent = t.projects.project3Copy;
    if (ui.project4Title)
      ui.project4Title.textContent = t.projects.project4Title;
    if (ui.project4Copy) ui.project4Copy.textContent = t.projects.project4Copy;
    if (ui.project5Title)
      ui.project5Title.textContent = t.projects.project5Title;
    if (ui.project5Copy) ui.project5Copy.textContent = t.projects.project5Copy;

    if (ui.contactEyebrow) ui.contactEyebrow.textContent = t.contact.eyebrow;
    if (ui.contactTitle) ui.contactTitle.textContent = t.contact.title;
    if (ui.contactCopy) ui.contactCopy.textContent = t.contact.copy;
    if (ui.contactGitHubLink)
      ui.contactGitHubLink.textContent = t.contact.github;
    if (ui.contactLinkedInLink)
      ui.contactLinkedInLink.textContent = t.contact.linkedin;

    if (ui.footerCopy1) ui.footerCopy1.textContent = t.footer1;
    if (ui.footerCopy2) ui.footerCopy2.textContent = t.footer2;

    if (langEsButton)
      langEsButton.classList.toggle("active", language === "es");
    if (langEnButton)
      langEnButton.classList.toggle("active", language === "en");
    if (langEsButton)
      langEsButton.setAttribute("aria-pressed", String(language === "es"));
    if (langEnButton)
      langEnButton.setAttribute("aria-pressed", String(language === "en"));
  };

  applyTheme(initialTheme);
  applyLanguage(initialLanguage);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme") || "dark";
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  if (langEsButton) {
    langEsButton.addEventListener("click", () => applyLanguage("es"));
  }
  if (langEnButton) {
    langEnButton.addEventListener("click", () => applyLanguage("en"));
  }

  const setMenuOpen = (open) => {
    if (!menuToggle || !navPanel) return;
    navPanel.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    const icon = menuToggle.querySelector("svg, i");
    if (icon)
      icon.outerHTML = `<i data-lucide="${open ? "x" : "menu"}" aria-hidden="true"></i>`;
    if (window.lucide) lucide.createIcons();
  };
  menuToggle?.addEventListener("click", () =>
    setMenuOpen(!navPanel.classList.contains("open")),
  );
  navLinks.forEach((link) =>
    link.addEventListener("click", () => setMenuOpen(false)),
  );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navPanel?.classList.contains("open")) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
  document.addEventListener("click", (event) => {
    // Icon replacement can detach the clicked SVG before the event bubbles.
    if (!event.composedPath().includes(nav)) setMenuOpen(false);
  });
  window
    .matchMedia("(min-width: 851px)")
    .addEventListener("change", (event) => {
      if (event.matches) setMenuOpen(false);
    });

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
      threshold: 0,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  root.classList.add("js-ready");
  revealElements.forEach((element) => revealObserver.observe(element));

  const sections = Array.from(document.querySelectorAll("section[id]"));

  const setActiveLink = () => {
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const link = document.querySelector(
        `.nav-panel a[href="#${section.id}"]`,
      );
      if (!link) return;

      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const isActive =
        scrollPosition >= sectionTop && scrollPosition < sectionBottom;
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

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
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  });

  if (window.lucide) {
    lucide.createIcons();
  }
});
