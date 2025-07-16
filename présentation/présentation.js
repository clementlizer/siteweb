const languageSelect = document.querySelector('#languageSelector select');

const translations = {
  fr: {
    title: "💻 Ma présentation",
    navAccueil: "Accueil",
    navProjet: "Projet",
    navAutre: "Autre",
    firstNameLabel: "Prénom : <strong>Clément</strong>",
    bioTitle: "petite présentation :",
    bioTexts: [
      "Je m'appelle Clément, j'ai 19 ans et je suis en première année de <strong>BUT Informatique</strong>. J'ai choisi cette formation par passion pour les jeux vidéo et par curiosité de comprendre comment sont conçues les applications que nous utilisons au quotidien.",
      "Au fil de cette année, je suis devenu un véritable passionné d'informatique. En parallèle, je fais partie d'un club de pétanque depuis 2018 et j'ai commencé à pratiquer le volley-ball cette année.",
      "En cours, nous avons abordé plusieurs langages et technologies, tels que <em>Processing, Java, C++, MySQL, Arduino, HTML et CSS</em>.",
      "En dehors de l'informatique, j'ai plusieurs passions : le <strong>dessin</strong>, le <strong>sport</strong>, les <strong>animes/mangas</strong> et bien sûr les <strong>jeux vidéo</strong>."
    ],
    cvLink: {
      text: "Voir mon CV (PDF)",
      url: "White simple Sales Representative Cv Resume.pdf"
    },
    contactTitle: "Contact",
    contactItems: [
      "💬 Discord : clement9949",
      "📸 Instagram : <a href=\"https://instagram.com/clement.julliard39\" target=\"_blank\">@clement.julliard39</a>",
      "🐙 GitHub : <a href=\"https://github.com/clementlizer\" target=\"_blank\">github.com/clementlizer</a>",
      "🔗 LinkedIn : <a href=\"\" target=\"_blank\"></a>..."
    ],
    footer: "lizergamme copyright ©"
  },
  en: {
    title: "💻 My Presentation",
    navAccueil: "Home",
    navProjet: "Project",
    navAutre: "Other",
    firstNameLabel: "Name : <strong>Clément</strong>",
    bioTitle: "Brief introduction:",
    bioTexts: [
      "My name is Clément, I am 19 years old and I am in my first year of <strong>BUT Computer Science</strong>. I chose this program out of passion for video games and curiosity to understand how the applications we use daily are made.",
      "During this year, I have become a real computer enthusiast. In parallel, I have been part of a pétanque club since 2018 and started playing volleyball this year.",
      "In class, we covered several languages and technologies such as <em>Processing, Java, C++, MySQL, Arduino, HTML and CSS</em>.",
      "Outside of computing, I have several passions: <strong>drawing</strong>, <strong>sports</strong>, <strong>animes/mangas</strong> and of course <strong>video games</strong>."
    ],
    cvLink: {
      text: "View my CV (PDF)",
      url: "En White simple Sales Representative Cv Resume.pdf"
    },
    contactTitle: "Contact",
    contactItems: [
      "💬 Discord: clement9949",
      "📸 Instagram: <a href=\"https://instagram.com/clement.julliard39\" target=\"_blank\">@clement.julliard39</a>",
      "🐙 GitHub: <a href=\"https://github.com/clementlizer\" target=\"_blank\">github.com/clementlizer</a>",
      "🔗 LinkedIn: <a href=\"\" target=\"_blank\"></a>..."
    ],
    footer: "lizergamme copyright ©"
  }
};

function applyTranslations(lang) {
  const t = translations[lang];

  document.querySelector('h1').textContent = t.title;
  document.getElementById('firstNameLabel').innerHTML = t.firstNameLabel;

  const navLinks = document.querySelectorAll('nav a');
  navLinks[0].textContent = t.navAccueil;
  navLinks[1].textContent = t.navProjet;
  navLinks[2].textContent = t.navAutre;

  document.querySelector('.bio h2').textContent = t.bioTitle;

  const bioParagraphs = document.querySelectorAll('.bio p');
  bioParagraphs.forEach((p, i) => {
    if (t.bioTexts[i]) {
      p.innerHTML = t.bioTexts[i];
    }
  });

  const cvLink = document.getElementById('cvLink');
  if (cvLink) {
    cvLink.textContent = t.cvLink.text;
    cvLink.href = t.cvLink.url;
  }

  document.querySelector('.contact h2').textContent = t.contactTitle;

  const contactItems = document.querySelectorAll('.contact-grid li');
  contactItems.forEach((li, i) => {
    if (t.contactItems[i]) {
      li.innerHTML = t.contactItems[i];
    }
  });

  document.querySelector('.footer p').textContent = t.footer;
}

// ✅ Écouteur de changement de langue avec stockage local
languageSelect.addEventListener('change', (e) => {
  const lang = e.target.value;
  localStorage.setItem('preferredLang', lang); // ← Sauvegarde
  applyTranslations(lang);
});

// ✅ Langue au chargement (récupérée si disponible)
window.addEventListener('DOMContentLoaded', () => {
  const storedLang = localStorage.getItem('preferredLang');
  const initialLang = storedLang || languageSelect.value || 'fr';
  languageSelect.value = initialLang;
  applyTranslations(initialLang);
});
