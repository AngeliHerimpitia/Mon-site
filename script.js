
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

    // Affichage dynamique des projets GitHub
    const username = 'AngeliHerimpitia';
    const projectsContainer = document.getElementById('projects');

    fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
      .then(response => response.json())
      .then(repos => {
        repos.forEach(repo => {
          const lang = repo.language || 'Other';
          const langClass = 'lang-' + lang.replace(/\+/g,'p').replace(/\s/g,'') || 'lang-Other';

          const card = document.createElement('div');
          card.className = 'project-card';
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
      })
      .catch(err => {
        projectsContainer.innerHTML = '<p>Impossible de charger les projets GitHub.</p>';
        console.error(err);
      });
 
