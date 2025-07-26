const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sortSelect');
const loadMoreBtn = document.getElementById('loadMore');
const loadLessBtn = document.getElementById('loadLess');
const endMessage = document.getElementById('endMessage');
const animeGrid = document.getElementById('animeGrid');
const languageSelect = document.querySelector('#languageSelector select');
const backToTop = document.getElementById('backToTop');

let allCards = [];
let visibleCount = 4;
const step = 4;

const translations = {
  fr: {
    navHome: "Accueil",
    navAbout: "Présentation",
    navProject: "Projet",
    footerCredits: "Images et résumés extraits de Anime-Sama – © Tous droits réservés.",
    footerDesign: "images et design : lizergamme copyright ©",
    h1Title: "🎌 Mes Animes Vus",
    searchPlaceholder: "Rechercher un anime...",
    sortLabel: "Trier par :",
    sortOptions: {
      none: "Aucun tri",
      nameAsc: "Nom A → Z",
      nameDesc: "Nom Z → A",
      noteAsc: "Note croissante",
      noteDesc: "Note décroissante",
    },
    loadMore: "Charger plus",
    loadLess: "Charger moins",
    endList: "🎉 Fin de la liste",
    animeCounterText: "Animes affichés : {shown} / {total}",
    backToTop: "Retour en haut",
    mangaTitle: "📕 Mes Mangas",
     mangaSectionText: "Voici un lien qui vous emmènera vers ma collection de mangas :",
    mangaLinkText: "Voir ma collection Mangacollec",
    sportsTitle: "🏐 Mes Sports",
    sportRugby: "Rugby",
    sportRugbyDesc: "j'en ai fais de 2011-2017",
    sportPetanque: "Pétanque",
    sportPetanqueDesc: "j'en fais depuis 2017",
    sportVolley: "Volley",
    sportVolleyDesc: "j'ai commencé en 2024"
  },
  en: {
    navHome: "Home",
    navAbout: "About",
    navProject: "Project",
    footerCredits: "Images and summaries from Anime-Sama – © All rights reserved.",
    footerDesign: "images and design: lizergamme copyright ©",
    h1Title: "🎌 My Watched Animes",
    searchPlaceholder: "Search an anime...",
    sortLabel: "Sort by:",
    sortOptions: {
      none: "No sorting",
      nameAsc: "Name A → Z",
      nameDesc: "Name Z → A",
      noteAsc: "Rating ascending",
      noteDesc: "Rating descending",
    },
    loadMore: "Load more",
    loadLess: "Load less",
    endList: "🎉 End of the list",
     animeCounterText: "Animes displayed: {shown} / {total}",
    backToTop: "Back to top",
    mangaTitle: "📕 My Mangas",
     mangaSectionText: "Here is a link that will take you to my manga collection:",
    mangaLinkText: "View my Mangacollec collection",
     sportsTitle: "🏐 My Sports",
    sportRugby: "Rugby",
    sportRugbyDesc: "I played from 2011 to 2017",
    sportPetanque: "Pétanque",
    sportPetanqueDesc: "I've been playing since 2017",
    sportVolley: "Volleyball",
    sportVolleyDesc: "I started in 2024"
  }
};

function createCard({ title, image, wikiLink, animeLink, rating, description }) {
  const card = document.createElement('div');
  card.className = 'anime-card';

  card.innerHTML = `
    <div class="card">
      <a href="${animeLink}" target="_blank" rel="noopener noreferrer">
        <img src="${image}" alt="${title}" />
      </a>
      <a href="${wikiLink}" target="_blank" rel="noopener noreferrer" class="card-link">
        <div class="card-content">
          <div class="title">${title}</div>
          <div class="stars" data-rating="${rating}">
            <div class="stars-outer"><div class="stars-inner"></div></div>
          </div>
          <div class="review">${description}</div>
        </div>
      </a>
    </div>
  `;

  return card;
}

function updateStars() {
  document.querySelectorAll('.stars').forEach(star => {
    const rating = parseFloat(star.dataset.rating);
    const width = (rating / 5) * 100;
    const inner = star.querySelector('.stars-inner');
    if (inner) inner.style.width = `${width}%`;
  });
}

function filterAndDisplayCards() {
  const query = searchInput.value.toLowerCase();
  const sortValue = sortSelect.value;

  // Filtrer par titre
  let filteredCards = allCards.filter(card => {
    const title = card.querySelector('.title').textContent.toLowerCase();
    return title.includes(query);
  });

  // Trier
  if (sortValue !== '') {
    filteredCards.sort((a, b) => {
      const titleA = a.querySelector('.title').textContent.toLowerCase();
      const titleB = b.querySelector('.title').textContent.toLowerCase();
      const ratingA = parseFloat(a.querySelector('.stars').dataset.rating);
      const ratingB = parseFloat(b.querySelector('.stars').dataset.rating);

      switch (sortValue) {
        case 'name-asc': return titleA.localeCompare(titleB);
        case 'name-desc': return titleB.localeCompare(titleA);
        case 'note-asc': return ratingA - ratingB;
        case 'note-desc': return ratingB - ratingA;
        default: return 0;
      }
    });
  }

  animeGrid.innerHTML = '';

  filteredCards.forEach((card, index) => {
    if (index < visibleCount) {
      card.style.display = 'block';

      // Appliquer effet fade-in si nouveau
      if (!animeGrid.contains(card)) {
        card.classList.add('fade-in');
        setTimeout(() => {
          card.classList.remove('fade-in');
        }, 400); // Durée de l'animation (en ms)
      }

      animeGrid.appendChild(card);
    } else {
      card.style.display = 'none';
    }
  });

  // Boutons et message de fin
  loadMoreBtn.style.display = visibleCount < filteredCards.length ? 'inline-block' : 'none';
  loadLessBtn.style.display = visibleCount > step ? 'inline-block' : 'none';
  endMessage.style.display = (visibleCount >= filteredCards.length && filteredCards.length > 0) ? 'block' : 'none';

  updateStars();
  updateAnimeCounter(filteredCards.length);
}

function loadAnimesFromFile(lang = 'fr') {
  const filename = lang === 'en' ? 'autre en.txt' : 'autre.txt';

  fetch(filename)
    .then(response => {
      if (!response.ok) throw new Error(`Fichier introuvable: ${filename}`);
      return response.text();
    })
    .then(text => {
      const lines = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && line.includes('|'));

      allCards = lines.map(line => {
        const parts = line.split('|').map(p => p.trim());
        if (parts.length < 6) return null;
        const [title, image, wikiLink, animeLink, rating, description] = parts;
        return createCard({ title, image, wikiLink, animeLink, rating, description });
      }).filter(card => card !== null);

      visibleCount = step;
      filterAndDisplayCards();
    })
    .catch(err => {
      animeGrid.innerHTML = `<p style="color: white;">Erreur de chargement : ${err.message}</p>`;
    });
}

function applyTranslations(lang) {
  const t = translations[lang];
  const sportsIds = [
  'sportsTitle',
  'sportRugby', 'sportRugbyDesc',
  'sportPetanque', 'sportPetanqueDesc',
  'sportVolley', 'sportVolleyDesc'
];

  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) pageTitle.textContent = t.h1Title;

  const mangaSectionText = document.getElementById('mangaSectionText');
  if (mangaSectionText) mangaSectionText.textContent = t.mangaSectionText;

  const mangaLink = document.getElementById('mangaLink');
  if (mangaLink) mangaLink.textContent = t.mangaLinkText;

  const mangaTitle = document.getElementById('mangaTitle');
  if (mangaTitle) mangaTitle.textContent = t.mangaTitle;

  searchInput.placeholder = t.searchPlaceholder;
  document.getElementById('sortLabel').textContent = t.sortLabel;

  Array.from(sortSelect.options).forEach(option => {
    switch (option.value) {
      case "":
        option.textContent = t.sortOptions.none;
        break;
      case "name-asc":
        option.textContent = t.sortOptions.nameAsc;
        break;
      case "name-desc":
        option.textContent = t.sortOptions.nameDesc;
        break;
      case "note-asc":
        option.textContent = t.sortOptions.noteAsc;
        break;
      case "note-desc":
        option.textContent = t.sortOptions.noteDesc;
        break;
    }
  });

  loadMoreBtn.textContent = t.loadMore;
  loadLessBtn.textContent = t.loadLess;
  endMessage.textContent = t.endList;
  backToTop.setAttribute('aria-label', t.backToTop);

  const headerIds = ['navHome', 'navAbout', 'navProject'];
  const footerIds = ['footerCredits', 'footerDesign'];

  headerIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = t[id];
  });

  footerIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = t[id];
  });
  
sportsIds.forEach(id => {
  const el = document.getElementById(id);
  if (el && t[id]) el.textContent = t[id];
});
}

// Événements
searchInput.addEventListener('input', () => {
  visibleCount = step;
  filterAndDisplayCards();
});
sortSelect.addEventListener('change', () => {
  filterAndDisplayCards();
});
loadMoreBtn.addEventListener('click', () => {
  visibleCount += step;
  filterAndDisplayCards();
});
loadLessBtn.addEventListener('click', () => {
  visibleCount = Math.max(step, visibleCount - step);
  filterAndDisplayCards();
});

languageSelect.addEventListener('change', (e) => {
  const lang = e.target.value;
  localStorage.setItem('preferredLang', lang);
  applyTranslations(lang);
  loadAnimesFromFile(lang);
});

// Initialisation au chargement complet du DOM
window.addEventListener('DOMContentLoaded', () => {
  const storedLang = localStorage.getItem('preferredLang');
  const initialLang = storedLang || languageSelect.value || 'fr';
  languageSelect.value = initialLang;
  applyTranslations(initialLang);
  loadAnimesFromFile(initialLang);
});

// Bouton retour haut
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});



function updateAnimeCounter(totalVisible) {
  const counter = document.getElementById('animeCounter');
  if (!counter) return;

  const lang = languageSelect.value;
  const t = translations[lang] || translations['fr'];
  const total = allCards.length;
  const shown = Math.min(visibleCount, totalVisible);

  counter.textContent = t.animeCounterText
    .replace('{shown}', shown)
    .replace('{total}', total);
}
