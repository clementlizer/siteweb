// Gestion de la vidéo au survol
const mediaBlocks = document.querySelectorAll('.media-block');

mediaBlocks.forEach(block => {
  const videoSrc = block.dataset.video;
  const mediaLeft = block.querySelector('.media-left');
  const img = mediaLeft.querySelector('img');

  let videoElement = null;

  block.addEventListener('mouseenter', () => {
    if (videoElement) return;

    videoElement = document.createElement('video');
    videoElement.src = videoSrc;
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;
    videoElement.playsInline = true;

    Object.assign(videoElement.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '10px',
      zIndex: '2',
      opacity: '0',
      transition: 'opacity 0.3s ease'
    });

    mediaLeft.appendChild(videoElement);

    requestAnimationFrame(() => {
      videoElement.style.opacity = '1';
      if (img) img.style.opacity = '0';
    });
  });

  block.addEventListener('mouseleave', () => {
    if (videoElement) {
      videoElement.style.opacity = '0';
      setTimeout(() => {
        videoElement.pause();
        videoElement.remove();
        videoElement = null;
      }, 300);
    }

    if (img) img.style.opacity = '1';
  });
});

// Traductions et gestion de la langue
const languageSelect = document.querySelector('#languageSelector select');

const translations = {
  fr: {
    title: "🛠️ Mes projets",
    navAccueil: "Accueil",
    navPresentation: "Présentation",
    navAutre: "Autre",
    projects: [
      { title: "SAE C++", description: "Notepad pour les parcours présents sur Tera Aventura." },
      { title: "SAE ESP32", description: "Capteur connecté pour calculer la qualité de l'air." },
      { title: "SAE Processing", description: "Un robot qui dessine, ça ne donne pas envie !" },
      { title: "SAE Html", description: "Refonte d'un site web en gardant le design de base." }
    ],
    footer: "lizergamme copyright ©"
  },
  en: {
    title: "🛠️ My Projects",
    navAccueil: "Home",
    navPresentation: "About",
    navAutre: "Other",
    projects: [
      { title: "SAE C++", description: "Notepad for paths available on Tera Aventura." },
      { title: "SAE ESP32", description: "Connected sensor to measure air quality." },
      { title: "SAE Processing", description: "A robot that draws doesn’t look very appealing!" },
      { title: "SAE Html", description: "Redesign of a website keeping the original design." }
    ],
    footer: "lizergamme copyright ©"
  }
};

function applyTranslations(lang) {
  const t = translations[lang];

  document.querySelector('h1').textContent = t.title;

  const navLinks = document.querySelectorAll('nav a');
  navLinks[0].textContent = t.navAccueil;
  navLinks[1].textContent = t.navPresentation;
  navLinks[2].textContent = t.navAutre;

  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach((item, index) => {
    const title = item.querySelector('h3');
    const desc = item.querySelector('p');
    if (t.projects[index]) {
      title.textContent = t.projects[index].title;
      desc.textContent = t.projects[index].description;
    }
  });

  document.querySelector('.footer p').textContent = t.footer;
}

// Sélection de la langue (avec mémoire locale)
languageSelect.addEventListener('change', (e) => {
  const lang = e.target.value;
  localStorage.setItem('preferredLang', lang); // 👈 Sauvegarde de la langue
  applyTranslations(lang);
});

// Initialisation au chargement
window.addEventListener('DOMContentLoaded', () => {
  const storedLang = localStorage.getItem('preferredLang');
  const initialLang = storedLang || languageSelect.value || 'fr';
  languageSelect.value = initialLang;
  applyTranslations(initialLang);
});
