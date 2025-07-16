const languageSelect = document.querySelector('#languageSelector select');

const translations = {
  fr: {
    mainTitle: "🖥️ Présentation du site",
    navPresentation: "Présentation",
    navProject: "Projet",
    navOther: "Autre",
    p1: "Ce site a été créé dans le cadre d’un projet personnel pour m’améliorer en programmation.",
    p2: "L’objectif est de m’en servir comme portfolio et CV. Vous y trouverez mes projets, une présentation de moi-même, ainsi que mon CV accessible sur une page dédiée.",
    p3: "Dans la page \"Autre\", j’ai mis mes passions, notamment les animés, que vous pouvez découvrir en détail.",
    card1Title: "Présentation",
    card1Text: "Dans cette page, vous allez retrouver ma bio et mon CV au format PDF. Vous pouvez aussi retrouver mes contacts.",
    card2Title: "Projets",
    card2Text: "Dans cette page, vous allez retrouver mes projets réalisés durant mon BUT Informatique ainsi que mes projets personnels. Si vous cliquez sur les projets, vous serez redirigé vers mon GitHub.",
    card3Title: "Autre",
    card3Text: "Dans cette page, vous pouvez retrouver mes activités hors informatique. Par exemple, mes animes vus sont présentés sous forme de cartes cliquables. Si vous cliquez sur le texte, vous serez redirigé vers la page Wikipédia de l’anime, et si vous cliquez sur l’image, vous serez redirigé vers la page Anime-sama. (Les étoiles indiquent mes notes.)",
    eventTitle: "Projets & actus en cours :",
    eventText: "Dans cette section, vous retrouverez les événements à venir et les projets actuellement en développement ou en mise en ligne sur le site.",
    footerText: "lizergamme copyright ©"
  },
  en: {
    mainTitle: "🖥️ Website Presentation",
    navPresentation: "Presentation",
    navProject: "Project",
    navOther: "Other",
    p1: "This website was created as part of a personal project to improve my programming skills.",
    p2: "The goal is to use it as a portfolio and résumé. You will find my projects, a self-introduction, and my CV available on a dedicated page.",
    p3: "In the \"Other\" page, I’ve added my hobbies, especially anime, which you can explore in detail.",
    card1Title: "Presentation",
    card1Text: "On this page, you'll find my bio and my résumé in PDF format. You can also find my contact information.",
    card2Title: "Projects",
    card2Text: "On this page, you'll find projects I completed during my BUT Computer Science studies as well as personal projects. Clicking on a project will redirect you to my GitHub.",
    card3Title: "Other",
    card3Text: "On this page, you’ll find my activities outside of computer science. For example, the anime I’ve watched are presented as clickable cards. Clicking on the text redirects you to the anime’s Wikipedia page, and clicking on the image redirects you to Anime-sama. (Stars represent my ratings.)",
    eventTitle: "Current Projects & News:",
    eventText: "In this section, you’ll find upcoming events and projects currently in development or being published on the website.",
    footerText: "lizergamme copyright ©"
  }
};

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  for (const id in t) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = t[id];
    }
  }
}

// 🔁 Changement de langue = sauvegarde + traduction
languageSelect.addEventListener('change', (e) => {
  const lang = e.target.value;
  localStorage.setItem('preferredLang', lang);
  applyTranslations(lang);
});

// 🔁 Chargement initial avec langue enregistrée
window.addEventListener('DOMContentLoaded', () => {
  const storedLang = localStorage.getItem('preferredLang');
  const initialLang = storedLang || languageSelect.value || 'fr';
  languageSelect.value = initialLang;
  applyTranslations(initialLang);
});