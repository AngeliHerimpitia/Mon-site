:root {
  --primary-color: #4b73ff;
  --secondary-color: #7b5bff;
  --bg-color: #0f0f14;
  --section-bg: #181820;
  --text-color: #e9e9e9;
  --border-radius: 14px;
}

[data-theme="light"] {
  --bg-color: #f5f5f5;
  --section-bg: #ffffff;
  --text-color: #111111;
  --primary-color: #4b73ff;
  --secondary-color: #7b5bff;
}

* {
  box-sizing: border-box;
  transition: background 0.3s, color 0.3s;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
}

/* Navigation principale */
.main-nav {
  position: sticky;
  top: 0;
  background: var(--section-bg);
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.nav-logo {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
}

.nav-links {
  margin: 0;
  padding: 10px 0;
  display: flex;
  list-style: none;
  gap: 25px;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.nav-toggle .hamburger {
  display: block;
  width: 25px;
  height: 2px;
  background: var(--text-color);
  position: relative;
  transition: background 0.3s;
}

.nav-toggle .hamburger::before,
.nav-toggle .hamburger::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 2px;
  background: var(--text-color);
  transition: transform 0.3s;
}

.nav-toggle .hamburger::before {
  transform: translateY(-8px);
}

.nav-toggle .hamburger::after {
  transform: translateY(8px);
}

/* responsive menu */
@media (max-width: 768px) {
  .nav-toggle {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: var(--section-bg);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .nav-links.open {
    max-height: 300px;
  }

  .nav-links li {
    text-align: center;
    padding: 10px 0;
  }
}

header {
  text-align: center;
  padding: 70px 20px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.45);
}

header img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 4px solid #fff;
  object-fit: cover;
  transition: transform 0.3s;
}

header img:hover {
  transform: scale(1.05);
}

h1 {
  margin-top: 15px;
  font-size: 32px;
  font-weight: 600;
}

header p {
  margin: 5px 0 0;
  font-weight: 300;
  color: var(--text-color);
}

section {
  width: 90%;
  max-width: 1000px;
  margin: 30px auto;
  padding: 25px;
  background: var(--section-bg);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 15px rgba(0,0,0,0.35);
  animation: fadeIn 0.7s ease;
  scroll-margin-top: 80px; /* évite que la section soit masquée par la nav */
}

h2 {
  color: var(--secondary-color);
  border-left: 4px solid var(--secondary-color);
  padding-left: 10px;
  margin-bottom: 15px;
}

ul {
  list-style: none;
  padding-left: 0;
}

ul li {
  padding: 6px 0;
}

.project-btn {
  display: inline-block;
  padding: 12px 20px;
  background: var(--primary-color);
  color: white;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  margin: 10px 10px 0 0;
  transition: all 0.3s ease;
}

.project-btn:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* Barre de recherche */
.search-container {
  margin-bottom: 20px;
}

#search-projects {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  background: var(--section-bg);
  color: var(--text-color);
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s;
}

#search-projects:focus {
  outline: none;
  border-color: var(--secondary-color);
  box-shadow: 0 0 10px rgba(75, 115, 255, 0.3);
}

#search-projects::placeholder {
  color: #888;
}

.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.project-card {
  background: var(--section-bg);
  border-radius: var(--border-radius);
  padding: 20px;
  flex: 1 1 calc(50% - 20px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.project-card.hidden {
  display: none;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.45);
}

.project-card h3 {
  margin-top: 0;
  color: var(--primary-color);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.project-card p {
  font-size: 0.9rem;
  color: var(--text-color);
  flex-grow: 1;
  margin-top: 5px;
}

.project-card .buttons {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.project-card a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: white;
  background: var(--primary-color);
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 600;
  transition: background 0.3s;
}

.project-card a:hover {
  background: var(--secondary-color);
}

.lang-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  margin-top: 8px;
}

.lang-JavaScript { background: #f7df1e; color: #111; }
.lang-C { background: #00599C; }
.lang-Cp { background: #00599C; }
.lang-Python { background: #3572A5; }
.lang-HTML { background: #e34c26; }
.lang-CSS { background: #264de4; }
.lang-Other { background: #6c757d; }

/* Bouton Voir plus */
.load-more-container {
  text-align: center;
  margin-top: 20px;
}

#load-more-btn {
  padding: 12px 30px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
}

#load-more-btn:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* Section Contact */
.contact-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 15px;
}

.contact-links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.contact-links a:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* Section Feedback/Avis */
.feedback-form {
  background: rgba(75, 115, 255, 0.05);
  padding: 20px;
  border-radius: var(--border-radius);
  margin-top: 15px;
}

.feedback-form textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  background: var(--section-bg);
  color: var(--text-color);
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
}

.feedback-form textarea:focus {
  outline: none;
  border-color: var(--secondary-color);
}

.rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.stars {
  display: flex;
  gap: 5px;
}

.stars i {
  font-size: 1.5rem;
  color: #ffd700;
  cursor: pointer;
  transition: transform 0.2s;
}

.stars i:hover {
  transform: scale(1.2);
}

.stars i.fas {
  color: #ffd700;
}

.stars i.far {
  color: #555;
}

[data-theme="light"] .stars i.far {
  color: #ccc;
}

#submit-feedback {
  padding: 12px 30px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

#submit-feedback:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
}

.feedbacks-container {
  margin-top: 25px;
}

.feedback-item {
  background: rgba(75, 115, 255, 0.08);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  border-left: 3px solid var(--primary-color);
}

.feedback-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.feedback-anonymous {
  font-weight: 600;
  color: var(--primary-color);
}

.feedback-rating {
  display: flex;
  gap: 2px;
}

.feedback-rating i {
  font-size: 0.9rem;
  color: #ffd700;
}

.feedback-message {
  color: var(--text-color);
  font-size: 0.95rem;
  line-height: 1.5;
}

.feedback-date {
  font-size: 0.75rem;
  color: #888;
  margin-top: 8px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

#theme-toggle {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 12px 16px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  z-index: 1000;
}

#theme-toggle:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
}

@media (max-width: 600px) {
  header { padding: 35px 15px; }
  h1 { font-size: 26px; }
  .project-card { width: 100%; }
  .contact-links { flex-direction: column; }
  .contact-links a { width: 100%; justify-content: center; }
  .main-nav ul { flex-direction: column; }
  .main-nav li { margin-bottom: 10px; }
  #theme-toggle { bottom: 20px; right: 20px; }
}

/* Footer */
footer {
  text-align: center;
  padding: 20px;
  color: var(--text-color);
  background: var(--section-bg);
  border-top: 1px solid rgba(255,255,255,0.1);
  margin-top: 30px;
  font-size: 0.9rem;
}

/* Slight polish on sections */
section {
  transition: transform 0.3s;
}

/* Increase base font size for readability */
body {
  font-size: 16px;
}
