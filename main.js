document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const nav = document.querySelector(".nav");
  const menuToggle = document.querySelector("#menu-toggle");
  const navPanel = document.querySelector("#primary-navigation");
  const themeToggle = document.querySelector("#theme-toggle");
  const themeIcon = document.querySelector("#theme-icon");
  const langEsButton = document.querySelector("#lang-es");
  const langEnButton = document.querySelector("#lang-en");
  const contactForm = document.querySelector("#contact-form");
  const revealElements = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll('.nav-panel a[href^="#"]');

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");
  const initialTheme = savedTheme || (prefersDark.matches ? "dark" : "light");
  const savedLanguage = localStorage.getItem("language");
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
    statValue1: document.querySelector(".hero-stats .stat-card:nth-child(1) .stat-value"),
    statLabel1: document.querySelector(".hero-stats .stat-card:nth-child(1) .stat-label"),
    statValue2: document.querySelector(".hero-stats .stat-card:nth-child(2) .stat-value"),
    statLabel2: document.querySelector(".hero-stats .stat-card:nth-child(2) .stat-label"),
    statValue3: document.querySelector(".hero-stats .stat-card:nth-child(3) .stat-value"),
    statLabel3: document.querySelector(".hero-stats .stat-card:nth-child(3) .stat-label"),
    profileRole: document.querySelector(".profile-role"),
    profileTitle: document.querySelector(".profile-card h2"),
    profileCopy: document.querySelector(".profile-card > p:not(.profile-role)"),
    locationLabel: document.querySelector(".hero-panel .glass-card:nth-of-type(1) .mini-heading span"),
    locationValue: document.querySelector(".hero-panel .glass-card:nth-of-type(1) p"),
    focusLabel: document.querySelector(".hero-panel .glass-card:nth-of-type(2) .mini-heading span"),
    focusValue: document.querySelector(".hero-panel .glass-card:nth-of-type(2) p"),
    aboutEyebrow: document.querySelector("#about .eyebrow"),
    aboutTitle: document.querySelector("#about .section-heading h2"),
    aboutCopy: document.querySelector("#about .section-heading p"),
    aboutCardTitle: document.querySelector("#about .card-accent .card-topline span"),
    aboutCardCopy: document.querySelector("#about .card-accent p"),
    aboutExtraTitle: document.querySelector("#about .grid-2 .card:nth-child(2) .card-topline span"),
    aboutExtraCopy: document.querySelector("#about .grid-2 .card:nth-child(2) p"),
    languagesHeading: document.querySelector("#about .grid.gap-1 .card:nth-child(1) .card-topline span"),
    spanishTag: document.querySelector("#about .grid.gap-1 .card:nth-child(1) .tag"),
    availabilityHeading: document.querySelector("#about .grid.gap-1 .card:nth-child(2) .card-topline span"),
    availabilityCopy: document.querySelector("#about .grid.gap-1 .card:nth-child(2) p"),
    skillsEyebrow: document.querySelector("#skills .eyebrow"),
    skillsTitle: document.querySelector("#skills .section-heading h2"),
    languageCardTitle: document.querySelector("#skills .skill-card:nth-child(1) h3"),
    languageCardCopy: document.querySelector("#skills .skill-card:nth-child(1) p"),
    webCardTitle: document.querySelector("#skills .skill-card:nth-child(2) h3"),
    webCardCopy: document.querySelector("#skills .skill-card:nth-child(2) p"),
    dbCardTitle: document.querySelector("#skills .skill-card:nth-child(3) h3"),
    dbCardCopy: document.querySelector("#skills .skill-card:nth-child(3) p"),
    experienceEyebrow: document.querySelector("#experience .eyebrow"),
    experienceTitle: document.querySelector("#experience .section-heading h2"),
    expCurrentDate: document.querySelector("#experience .timeline-item:nth-child(1) .timeline-date"),
    expCurrentTitle: document.querySelector("#experience .timeline-item:nth-child(1) h3"),
    expCurrentCopy: document.querySelector("#experience .timeline-item:nth-child(1) p"),
    expFenles4Date: document.querySelector("#experience .timeline-item:nth-child(2) .timeline-date"),
    expFenles4Title: document.querySelector("#experience .timeline-item:nth-child(2) h3"),
    expFenles4Copy: document.querySelector("#experience .timeline-item:nth-child(2) p"),
    expFenles1Date: document.querySelector("#experience .timeline-item:nth-child(3) .timeline-date"),
    expFenles1Title: document.querySelector("#experience .timeline-item:nth-child(3) h3"),
    expFenles1Copy: document.querySelector("#experience .timeline-item:nth-child(3) p"),
    expDoscarDate: document.querySelector("#experience .timeline-item:nth-child(4) .timeline-date"),
    expDoscarTitle: document.querySelector("#experience .timeline-item:nth-child(4) h3"),
    expDoscarCopy: document.querySelector("#experience .timeline-item:nth-child(4) p"),
    expEduDate: document.querySelector("#experience .timeline-item:nth-child(5) .timeline-date"),
    expEduTitle: document.querySelector("#experience .timeline-item:nth-child(5) h3"),
    expEduCopy: document.querySelector("#experience .timeline-item:nth-child(5) p"),
    projectsEyebrow: document.querySelector("#projects .eyebrow"),
    projectsTitle: document.querySelector("#projects .section-heading h2"),
    project1Title: document.querySelector("#projects .project-card:nth-child(1) h3"),
    project1Copy: document.querySelector("#projects .project-card:nth-child(1) p"),
    project2Title: document.querySelector("#projects .project-card:nth-child(2) h3"),
    project2Copy: document.querySelector("#projects .project-card:nth-child(2) p"),
    project3Title: document.querySelector("#projects .project-card:nth-child(3) h3"),
    project3Copy: document.querySelector("#projects .project-card:nth-child(3) p"),
    contactEyebrow: document.querySelector("#contact .eyebrow"),
    contactTitle: document.querySelector("#contact .section-heading h2"),
    contactCopy: document.querySelector("#contact .section-heading p"),
    contactGitHubLink: document.querySelector("#contact .contact-social .social-link:nth-child(1) span"),
    contactLinkedInLink: document.querySelector("#contact .contact-social .social-link:nth-child(2) span"),
    contactFormNameLabel: document.querySelector('label[for="contact-name"]'),
    contactFormEmailLabel: document.querySelector('label[for="contact-email"]'),
    contactFormMessageLabel: document.querySelector('label[for="contact-message"]'),
    contactFormNamePlaceholder: document.querySelector("#contact-name"),
    contactFormEmailPlaceholder: document.querySelector("#contact-email"),
    contactFormMessagePlaceholder: document.querySelector("#contact-message"),
    contactFormButton: document.querySelector("#contact-form .btn-label"),
    contactFormNote: document.querySelector("#contact-form .form-note"),
    emailLabel: document.querySelector(".contact-grid .contact-card:nth-child(1) .contact-label"),
    emailValue: document.querySelector(".contact-grid .contact-card:nth-child(1) strong"),
    phoneLabel: document.querySelector(".contact-grid .contact-card:nth-child(2) .contact-label"),
    phoneValue: document.querySelector(".contact-grid .contact-card:nth-child(2) strong"),
    locationLabel2: document.querySelector(".contact-grid .contact-card-static .contact-label"),
    locationValue2: document.querySelector(".contact-grid .contact-card-static strong"),
    footerCopy1: document.querySelector(".site-footer .footer-inner p:nth-child(1)"),
    footerCopy2: document.querySelector(".site-footer .footer-inner p:nth-child(2)"),
  };

  const translations = {
    es: {
      title: "Francisco Javier Martínez Fernández | Portfolio",
      description:
        "Portfolio de Francisco Javier Martínez Fernández, estudiante de DAW con enfoque en desarrollo web moderno, experiencia de usuario y soluciones digitales.",
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
        title: 'Diseño y desarrollo <span class="gradient-text">con una base clara, útil y moderna</span>',
        lead:
          "Soy Francisco Javier Martínez Fernández, estudiante de DAW centrado en crear interfaces limpias, accesibles y con una experiencia de uso cuidada. Mi tecnología fuerte es React, con la que me siento más cómodo construyendo interfaces modernas, y además me encanta trabajar en equipo.",
        ctaPrimary: "Hablemos",
        ctaSecondary: "Ver proyectos",
        stat1Value: "React",
        stat1Label: "Mi tecnología principal para front-end",
        stat2Value: "UX",
        stat2Label: "Interés por interfaces claras y funcionales",
        stat3Value: "Team",
        stat3Label: "Perfil colaborativo y proactivo",
        role: "Desarrollador web junior · React",
        profileTitle: "Construyo experiencias digitales con criterio visual",
        profileCopy:
          "Me gusta trabajar la estructura, el detalle y la coherencia para que cada proyecto se sienta sólido desde el primer vistazo. Me encanta colaborar con otras personas para sacar mejores ideas y resultados.",
        location: "Ubicación",
        locationValue: "Badajoz, España",
        focus: "Enfoque",
        focusValue: "Diseño limpio, código organizado y aprendizaje continuo.",
      },
      about: {
        eyebrow: "Sobre mí",
        title: "Una base técnica sólida con ganas de seguir creciendo",
        copy:
          "Soy una persona proactiva, amable y orientada al trabajo en equipo. Actualmente curso el segundo ciclo de DAW en la Escuela Virgen de Guadalupe.",
        what: "Lo que busco",
        whatCopy:
          "Integrarme en un equipo dinámico donde pueda aportar, aprender y profundizar en frameworks y herramientas modernas para crear productos útiles.",
        extraTitle: "Más allá del código",
        extraCopy:
          "Me motiva aprender en entornos reales, colaborar con buena comunicación y aportar una actitud cercana, constante y resolutiva. Fuera del trabajo técnico, me gusta mantenerme al día, observar cómo funcionan los productos digitales y pensar en cómo mejorarlos.",
        languages: "Idiomas",
        spanish: "Español nativo",
        availability: "Disponibilidad",
        availabilityCopy: "Carnet de conducir tipo B.",
      },
      skills: {
        eyebrow: "Habilidades",
        title: "Stack técnico que me permite moverme entre front, lógica y datos",
        languageCardTitle: "Lenguajes",
        languageCardCopy: "Base versátil para construir lógica y resolver problemas.",
        webCardTitle: "Desarrollo web",
        webCardCopy: "Interés por interfaces limpias, responsivas y accesibles.",
        dbCardTitle: "Bases de datos",
        dbCardCopy: "Trabajo cómodo con datos relacionales y consultas SQL.",
      },
      experience: {
        eyebrow: "Trayectoria",
        title: "Formación y experiencia que me han dado base técnica real",
        currentDate: "Actualidad",
        currentTitle: "Ciclo Superior DAW",
        currentCopy:
          "Escuela Virgen de Guadalupe. Especialización en desarrollo de aplicaciones web y mejora continua.",
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
        eyebrow: "Proyectos y voluntariado",
        title: "Experiencias que suman sensibilidad técnica y trabajo en equipo",
        project1Title: "Seguridad informática",
        project1Copy:
          "Voluntario en charlas de seguridad informática para concienciar sobre buenas prácticas y prevención de riesgos.",
        project2Title: "PreguntaDaw",
        project2Copy:
          "Desarrollo en grupo de un videojuego para concienciar a los jóvenes sobre el cambio climático.",
        project3Title: "DUALEX",
        project3Copy:
          "Classroom para la gestión de las FP duales de cada año, pensado para centralizar la organización, el seguimiento y la información de forma más clara.",
      },
      contact: {
        eyebrow: "Contacto",
        title: "¿Hablamos de tu próximo proyecto?",
        copy: "Estoy listo para aportar ganas, aprendizaje y una base técnica en tu próximo proyecto.",
        github: "GitHub",
        linkedin: "LinkedIn pendiente",
        email: "Email",
        phone: "Teléfono",
        unavailable: "No disponible por el momento",
        location: "Ubicación",
        formName: "Nombre",
        formEmail: "Email",
        formMessage: "Mensaje",
        formNamePlaceholder: "Tu nombre",
        formEmailPlaceholder: "tu@email.com",
        formMessagePlaceholder: "Cuéntame tu idea...",
        formButton: "Enviar mensaje",
        formNote: "Esta persona no está a la espera de correos aún porque está de prácticas.",
      },
      footer1: "© 2026 Francisco Javier Martínez Fernández.",
      footer2: "Diseñado con foco en claridad, ritmo visual y una experiencia más cuidada.",
    },
    en: {
      title: "Francisco Javier Martínez Fernández | Portfolio",
      description:
        "Portfolio of Francisco Javier Martínez Fernández, a DAW student focused on modern web development, user experience, and digital solutions.",
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
        title: 'Design and development <span class="gradient-text">with a clear, useful, modern foundation</span>',
        lead:
          "I'm Francisco Javier Martínez Fernández, a DAW student focused on creating clean, accessible interfaces with a careful user experience. My strongest technology is React, which I’m most comfortable using to build modern interfaces, and I love working in a team.",
        ctaPrimary: "Let's talk",
        ctaSecondary: "View projects",
        stat1Value: "React",
        stat1Label: "My main front-end technology",
        stat2Value: "UX",
        stat2Label: "Interest in clear, functional interfaces",
        stat3Value: "Team",
        stat3Label: "Collaborative and proactive mindset",
        role: "Junior web developer · React",
        profileTitle: "I build digital experiences with visual discipline",
        profileCopy:
          "I like working on structure, detail, and consistency so every project feels solid at first glance. I enjoy collaborating with other people to get better ideas and better results.",
        location: "Location",
        locationValue: "Badajoz, Spain",
        focus: "Focus",
        focusValue: "Clean design, organized code, and continuous learning.",
      },
      about: {
        eyebrow: "About me",
        title: "A solid technical base with a desire to keep growing",
        copy:
          "I'm proactive, friendly, and team-oriented. I’m currently studying the second year of DAW at Escuela Virgen de Guadalupe.",
        what: "What I'm looking for",
        whatCopy:
          "To join a dynamic team where I can contribute, learn, and deepen my knowledge of modern frameworks and tools to build useful products.",
        extraTitle: "Beyond the code",
        extraCopy:
          "I enjoy learning in real environments, collaborating with good communication, and bringing a friendly, steady, and problem-solving attitude. Outside the technical side, I like staying up to date, observing how digital products work, and thinking about how to improve them.",
        languages: "Languages",
        spanish: "Spanish native",
        availability: "Availability",
        availabilityCopy: "Driving licence B.",
      },
      skills: {
        eyebrow: "Skills",
        title: "A stack that lets me move between front-end, logic, and data",
        languageCardTitle: "Languages",
        languageCardCopy: "A versatile base for building logic and solving problems.",
        webCardTitle: "Web development",
        webCardCopy: "Interest in clean, responsive, and accessible interfaces.",
        dbCardTitle: "Databases",
        dbCardCopy: "Comfortable working with relational data and SQL queries.",
      },
      experience: {
        eyebrow: "Experience",
        title: "Training and experience that gave me a real technical base",
        currentDate: "Today",
        currentTitle: "DAW Higher Vocational Program",
        currentCopy:
          "Escuela Virgen de Guadalupe. Specializing in web application development and continuous improvement.",
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
        eyebrow: "Projects and volunteering",
        title: "Experiences that add technical sensitivity and teamwork",
        project1Title: "Cybersecurity",
        project1Copy:
          "Volunteer in cybersecurity talks to raise awareness of good practices and risk prevention.",
        project2Title: "PreguntaDaw",
        project2Copy:
          "Group development of a video game to raise awareness among young people about climate change.",
        project3Title: "DUALEX",
        project3Copy:
          "A classroom-style platform for managing dual VET programs each year, designed to centralize organization, tracking, and information more clearly.",
      },
      contact: {
        eyebrow: "Contact",
        title: "Ready to talk about your next project?",
        copy: "I'm ready to bring energy, learning, and a technical base to your next project.",
        github: "GitHub",
        linkedin: "LinkedIn pending",
        email: "Email",
        phone: "Phone",
        unavailable: "Currently unavailable",
        location: "Location",
        formName: "Name",
        formEmail: "Email",
        formMessage: "Message",
        formNamePlaceholder: "Your name",
        formEmailPlaceholder: "your@email.com",
        formMessagePlaceholder: "Tell me about your idea...",
        formButton: "Send message",
        formNote: "This person isn't expecting emails yet because they are currently in an internship.",
      },
      footer1: "© 2026 Francisco Javier Martínez Fernández.",
      footer2: "Designed with a focus on clarity, visual rhythm, and a more polished experience.",
    },
  };

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

  const applyLanguage = (language) => {
    const t = translations[language] || translations.es;
    root.setAttribute("lang", language);
    localStorage.setItem("language", language);

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
    if (ui.locationLabel) ui.locationLabel.textContent = t.hero.location;
    if (ui.locationValue) ui.locationValue.textContent = t.hero.locationValue;
    if (ui.focusLabel) ui.focusLabel.textContent = t.hero.focus;
    if (ui.focusValue) ui.focusValue.textContent = t.hero.focusValue;

    if (ui.aboutEyebrow) ui.aboutEyebrow.textContent = t.about.eyebrow;
    if (ui.aboutTitle) ui.aboutTitle.textContent = t.about.title;
    if (ui.aboutCopy) ui.aboutCopy.textContent = t.about.copy;
    if (ui.aboutCardTitle) ui.aboutCardTitle.textContent = t.about.what;
    if (ui.aboutCardCopy) ui.aboutCardCopy.textContent = t.about.whatCopy;
    if (ui.aboutExtraTitle) ui.aboutExtraTitle.textContent = t.about.extraTitle;
    if (ui.aboutExtraCopy) ui.aboutExtraCopy.textContent = t.about.extraCopy;
    if (ui.languagesHeading) ui.languagesHeading.textContent = t.about.languages;
    if (ui.spanishTag) ui.spanishTag.textContent = t.about.spanish;
    if (ui.availabilityHeading) ui.availabilityHeading.textContent = t.about.availability;
    if (ui.availabilityCopy) ui.availabilityCopy.textContent = t.about.availabilityCopy;

    if (ui.skillsEyebrow) ui.skillsEyebrow.textContent = t.skills.eyebrow;
    if (ui.skillsTitle) ui.skillsTitle.textContent = t.skills.title;
    if (ui.languageCardTitle) ui.languageCardTitle.textContent = t.skills.languageCardTitle;
    if (ui.languageCardCopy) ui.languageCardCopy.textContent = t.skills.languageCardCopy;
    if (ui.webCardTitle) ui.webCardTitle.textContent = t.skills.webCardTitle;
    if (ui.webCardCopy) ui.webCardCopy.textContent = t.skills.webCardCopy;
    if (ui.dbCardTitle) ui.dbCardTitle.textContent = t.skills.dbCardTitle;
    if (ui.dbCardCopy) ui.dbCardCopy.textContent = t.skills.dbCardCopy;

    if (ui.experienceEyebrow) ui.experienceEyebrow.textContent = t.experience.eyebrow;
    if (ui.experienceTitle) ui.experienceTitle.textContent = t.experience.title;
    if (ui.expCurrentDate) ui.expCurrentDate.textContent = t.experience.currentDate;
    if (ui.expCurrentTitle) ui.expCurrentTitle.textContent = t.experience.currentTitle;
    if (ui.expCurrentCopy) ui.expCurrentCopy.textContent = t.experience.currentCopy;
    if (ui.expFenles4Date) ui.expFenles4Date.textContent = t.experience.fenles4Date;
    if (ui.expFenles4Title) ui.expFenles4Title.textContent = t.experience.fenles4Title;
    if (ui.expFenles4Copy) ui.expFenles4Copy.textContent = t.experience.fenles4Copy;
    if (ui.expFenles1Date) ui.expFenles1Date.textContent = t.experience.fenles1Date;
    if (ui.expFenles1Title) ui.expFenles1Title.textContent = t.experience.fenles1Title;
    if (ui.expFenles1Copy) ui.expFenles1Copy.textContent = t.experience.fenles1Copy;
    if (ui.expDoscarDate) ui.expDoscarDate.textContent = t.experience.doscarDate;
    if (ui.expDoscarTitle) ui.expDoscarTitle.textContent = t.experience.doscarTitle;
    if (ui.expDoscarCopy) ui.expDoscarCopy.textContent = t.experience.doscarCopy;
    if (ui.expEduDate) ui.expEduDate.textContent = t.experience.eduDate;
    if (ui.expEduTitle) ui.expEduTitle.textContent = t.experience.eduTitle;
    if (ui.expEduCopy) ui.expEduCopy.textContent = t.experience.eduCopy;

    if (ui.projectsEyebrow) ui.projectsEyebrow.textContent = t.projects.eyebrow;
    if (ui.projectsTitle) ui.projectsTitle.textContent = t.projects.title;
    if (ui.project1Title) ui.project1Title.textContent = t.projects.project1Title;
    if (ui.project1Copy) ui.project1Copy.textContent = t.projects.project1Copy;
    if (ui.project2Title) ui.project2Title.textContent = t.projects.project2Title;
    if (ui.project2Copy) ui.project2Copy.textContent = t.projects.project2Copy;
    if (ui.project3Title) ui.project3Title.textContent = t.projects.project3Title;
    if (ui.project3Copy) ui.project3Copy.textContent = t.projects.project3Copy;

    if (ui.contactEyebrow) ui.contactEyebrow.textContent = t.contact.eyebrow;
    if (ui.contactTitle) ui.contactTitle.textContent = t.contact.title;
    if (ui.contactCopy) ui.contactCopy.textContent = t.contact.copy;
    if (ui.contactGitHubLink) ui.contactGitHubLink.textContent = t.contact.github;
    if (ui.contactLinkedInLink) ui.contactLinkedInLink.textContent = t.contact.linkedin;
    if (ui.contactFormNameLabel) ui.contactFormNameLabel.textContent = t.contact.formName;
    if (ui.contactFormEmailLabel) ui.contactFormEmailLabel.textContent = t.contact.formEmail;
    if (ui.contactFormMessageLabel) ui.contactFormMessageLabel.textContent = t.contact.formMessage;
    if (ui.contactFormNamePlaceholder) ui.contactFormNamePlaceholder.placeholder = t.contact.formNamePlaceholder;
    if (ui.contactFormEmailPlaceholder) ui.contactFormEmailPlaceholder.placeholder = t.contact.formEmailPlaceholder;
    if (ui.contactFormMessagePlaceholder) ui.contactFormMessagePlaceholder.placeholder = t.contact.formMessagePlaceholder;
    if (ui.contactFormButton) ui.contactFormButton.textContent = t.contact.formButton;
    if (ui.contactFormNote) ui.contactFormNote.textContent = t.contact.formNote;
    if (ui.emailLabel) ui.emailLabel.textContent = t.contact.email;
    if (ui.emailValue) ui.emailValue.textContent = t.contact.unavailable;
    if (ui.phoneLabel) ui.phoneLabel.textContent = t.contact.phone;
    if (ui.phoneValue) ui.phoneValue.textContent = t.contact.unavailable;
    if (ui.locationLabel2) ui.locationLabel2.textContent = t.contact.location;
    if (ui.locationValue2) ui.locationValue2.textContent = "Badajoz, España";

    if (ui.footerCopy1) ui.footerCopy1.textContent = t.footer1;
    if (ui.footerCopy2) ui.footerCopy2.textContent = t.footer2;

    if (langEsButton) langEsButton.classList.toggle("active", language === "es");
    if (langEnButton) langEnButton.classList.toggle("active", language === "en");
    if (langEsButton) langEsButton.setAttribute("aria-pressed", String(language === "es"));
    if (langEnButton) langEnButton.setAttribute("aria-pressed", String(language === "en"));
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

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const language = root.getAttribute("lang") === "en" ? "en" : "es";
      const t = translations[language];

      if (ui.contactFormNote) {
        ui.contactFormNote.textContent = t.contact.formNote;
      }
    });
  }

  if (window.lucide) {
    lucide.createIcons();
  }
});
