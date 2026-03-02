// Mode sombre/clair
const toggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
toggleButton.textContent = currentTheme === 'dark' ? '🌙 Mode Sombre' : '☀️ Mode Clair';

toggleButton.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleButton.textContent = '☀️ Mode Clair';
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleButton.textContent = '🌙 Mode Sombre';
    localStorage.setItem('theme', 'dark');
  }
});

// Affichage dynamique des projets GitHub avec recherche et pagination
const username = 'AngeliHerimpitia';
const projectsContainer = document.getElementById('projects');
const searchInput = document.getElementById('search-projects');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadMoreContainer = document.getElementById('load-more-container');

let allProjects = []; // Stocker tous les projets
let visibleCount = 4; // Nombre de projets visibles au départ

fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
  .then(response => response.json())
  .then(repos => {
    allProjects = repos;
    displayProjects(allProjects);
    
    // Afficher le bouton "Voir plus" si plus de 4 projets
    if (allProjects.length > visibleCount) {
      loadMoreContainer.style.display = 'block';
    }
  })
  .catch(err => {
    projectsContainer.innerHTML = '<p>Impossible de charger les projets GitHub.</p>';
    console.error(err);
  });

function displayProjects(projects, showAll = false) {
  projectsContainer.innerHTML = '';
  
  const projectsToShow = showAll ? projects : projects.slice(0, visibleCount);
  
  projectsToShow.forEach(repo => {
    const lang = repo.language || 'Other';
    const langClass = 'lang-' + lang.replace(/\+/g,'p').replace(/\s/g,'') || 'lang-Other';

    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-name', repo.name.toLowerCase());
    card.setAttribute('data-description', (repo.description || '').toLowerCase());
    card.setAttribute('data-language', lang.toLowerCase());
    
    card.innerHTML = `
      <h3><i class="fab fa-github"></i> ${repo.name}</h3>
      <p>${repo.description || 'Pas de description disponible.'}</p>
      <span class="lang-badge ${langClass}">${lang}</span>
      <div class="buttons">
        <a href="${repo.html_url}" target="_blank"><i class="fab fa-github"></i> Code</a>
        <a href="https://${username}.github.io/${repo.name}/" target="_blank">Voir</a>
      </div>
    `;
    projectsContainer.appendChild(card);
  });
  
  // Mettre à jour le bouton "Voir plus"
  if (showAll || projects.length <= visibleCount) {
    loadMoreContainer.style.display = 'none';
  } else {
    loadMoreContainer.style.display = 'block';
  }
}

// Bouton "Voir plus"
loadMoreBtn.addEventListener('click', () => {
  displayProjects(allProjects, true);
  loadMoreBtn.textContent = 'Voir moins';
  loadMoreBtn.onclick = () => {
    displayProjects(allProjects, false);
    loadMoreBtn.textContent = 'Voir plus de projets';
    loadMoreBtn.onclick = null;
    loadMoreBtn.addEventListener('click', arguments.callee);
  };
});

// Fonction de recherche
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  
  if (searchTerm === '') {
    // Si la recherche est vide, afficher les projets normalement
    displayProjects(allProjects, false);
    return;
  }
  
  // Filtrer les projets
  const filteredProjects = allProjects.filter(repo => {
    const name = repo.name.toLowerCase();
    const description = (repo.description || '').toLowerCase();
    const language = (repo.language || '').toLowerCase();
    
    return name.includes(searchTerm) || 
           description.includes(searchTerm) || 
           language.includes(searchTerm);
  });
  
  // Afficher les résultats (tous les résultats si recherche active)
  displayProjects(filteredProjects, true);
  
  // Afficher un message si aucun résultat
  if (filteredProjects.length === 0) {
    projectsContainer.innerHTML = '<p style="text-align: center; color: #888;">Aucun projet trouvé pour cette recherche.</p>';
  }
});

// Système de notation par étoiles
const stars = document.querySelectorAll('.stars i');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.getAttribute('data-rating'));
    updateStars();
  });

  star.addEventListener('mouseenter', () => {
    const rating = parseInt(star.getAttribute('data-rating'));
    highlightStars(rating);
  });
});

document.querySelector('.stars').addEventListener('mouseleave', () => {
  updateStars();
});

function highlightStars(rating) {
  stars.forEach(star => {
    const starRating = parseInt(star.getAttribute('data-rating'));
    if (starRating <= rating) {
      star.classList.remove('far');
      star.classList.add('fas');
    } else {
      star.classList.remove('fas');
      star.classList.add('far');
    }
  });
}

function updateStars() {
  highlightStars(selectedRating);
}

// Gestion des avis anonymes
const feedbacksKey = 'portfolio-feedbacks';

function loadFeedbacks() {
  const feedbacks = JSON.parse(localStorage.getItem(feedbacksKey)) || [];
  const container = document.getElementById('feedbacks');
  
  if (feedbacks.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #888;">Aucun avis pour le moment. Soyez le premier !</p>';
    return;
  }

  container.innerHTML = '';
  feedbacks.reverse().forEach(feedback => {
    const item = document.createElement('div');
    item.className = 'feedback-item';
    
    const starsHTML = Array(5).fill(0).map((_, i) => 
      `<i class="fa${i < feedback.rating ? 's' : 'r'} fa-star"></i>`
    ).join('');

    item.innerHTML = `
      <div class="feedback-header">
        <span class="feedback-anonymous">Anonyme</span>
        <div class="feedback-rating">${starsHTML}</div>
      </div>
      <p class="feedback-message">${feedback.message}</p>
      <div class="feedback-date">${feedback.date}</div>
    `;
    container.appendChild(item);
  });
}

document.getElementById('submit-feedback').addEventListener('click', () => {
  const message = document.getElementById('feedback-message').value.trim();

  if (!message) {
    alert('Veuillez écrire un message.');
    return;
  }

  if (selectedRating === 0) {
    alert('Veuillez sélectionner une note.');
    return;
  }

  const feedbacks = JSON.parse(localStorage.getItem(feedbacksKey)) || [];
  const newFeedback = {
    message: message,
    rating: selectedRating,
    date: new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  feedbacks.push(newFeedback);
  localStorage.setItem(feedbacksKey, JSON.stringify(feedbacks));

  // Réinitialiser le formulaire
  document.getElementById('feedback-message').value = '';
  selectedRating = 0;
  updateStars();

  // Recharger les avis
  loadFeedbacks();

  alert('Merci pour votre avis ! 🎉');
});

// Charger les avis au démarrage
loadFeedbacks();

// Afficher l'année actuelle dans le pied de page (robuste)
function updateFooterYear() {
  const currentYearSpan = document.getElementById('current-year');
  if (!currentYearSpan) {
    console.warn('Élément #current-year introuvable');
    return;
  }

  const now = new Date();
  let year;
  try {
    year = now.getFullYear();
  } catch (e) {
    console.error('Erreur lors du calcul de l’année', e);
  }

  if (typeof year !== 'number' || isNaN(year)) {
    year = (new Date()).getFullYear() || '2026';
  }

  currentYearSpan.textContent = year;
  console.log('Année du footer mise à jour :', year);
}

document.addEventListener('DOMContentLoaded', updateFooterYear);
// Essayer immédiatement au cas où DOMContentLoaded aurait déjà eu lieu
updateFooterYear();

// Toggle responsive navigation
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // fermer le menu quand on clique sur un lien (amélioration UX mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

