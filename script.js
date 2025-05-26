const projectsData = {
    'Jardiworld': {
        title: 'Jardiworld',
        description: [
            'Jardiworld est un jeu vidéo, fait en équipe de 6 membres. Le jeu présente un monde divisé entre humain et plantes, se confrontant sur un plateau pour la plante dorée. C\'est dans un contexte de projet tutoré que ce jeu à vu le jour.'
        ],
        image: 'https://via.placeholder.com/400x250/4f46e5/ffffff?text=Restaurant',
        technologies: ['CSharp', 'Unity'],
        features: [
            'Accessibilité pour les malvoyants',
            'Placement aléatoire des personnages sur la grille',
            'Système de déplacement / attaque',
            'Tour par tour',
        ],
        date: 'Novembre 2024- Mars 2025'
    },
    
    'Lego-Breaker': {
        title: 'Lego-Breaker',
        description: 'Au cours d\'un projet de la formation, j\'ai participé à la conception d\'un jeu VR. L\'objectif est de révéler et deviner une statue en brisant un bloc de Lego. ',
        image: 'https://via.placeholder.com/400x250/059669/ffffff?text=To-Do+App',
        technologies: ['CSharp', 'Unity'],
        features: [
            'Sélection de difficulté pour la taille de la sculpture',
            'Interface claire et simple',
            'Bruitage et musique adapté aux actions'
        ],
        date: 'Janvier - Mars 2025'
    },
    
    'Vapeur': {
        title: 'Projet Vapeur',
        description: 'L\'objectif de ce projet était de réaliser un site Web de collection de jeu-vidéo. Le site permet d\'ajouter ou de supprimer des jeux ainsi que le nom de leur éditeur.',
        image: 'https://via.placeholder.com/400x250/dc2626/ffffff?text=Blog',
        technologies: ['HTML', 'CSS', 'JavaScript', "Express"],
        features: [
            'Ajout / Suppression d\'un jeu ou d\'un éditeur de jeu',
            'Page d\'information complète de jeu',
            'Navigation facilisé par les liens hypertextes'
        ],
        date: 'Décembre 2024'
    },
    
    'Forum-de-discussion': {
        title: 'Forum de discussion',
        description: 'Ce forum a été créé en binôme dans le cadre d\'un cours de ma formation. L\'objectif était de réaliser un forum interactif qui permet de poster et d\'échanger entre plusieurs utilisateurs connectés',
        image: 'https://via.placeholder.com/400x250/7c3aed/ffffff?text=Memory',
        technologies: ['PHP', 'HTML', 'CSS'],
        features: [
            'Création de post avec images',
            'Possibilité de commenter et d\'aimer un post',
            'Système d\'inscription et de connexion',
            'Recherche par filtre',
        ],
        date: 'Mai 2024'
    }
};

let currentSection = 'projets';

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initProjectGallery();
    initMobileMenu();
    initContactForm();
    updateActiveNavigation();
});

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            currentSection = targetId;

            document.querySelector('.sidebar').classList.remove('open');
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function initProjectGallery() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectPanel(projectId);
        });
    });

    document.getElementById('close-panel').addEventListener('click', closeProjectPanel);

    document.addEventListener('click', function(e) {
        const panel = document.getElementById('project-panel');
        if (panel.classList.contains('open') && !panel.contains(e.target) && !e.target.closest('.project-item')) {
            closeProjectPanel();
        }
    });
}

function openProjectPanel(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    const panel = document.getElementById('project-panel');
    const title = document.getElementById('panel-title');
    const content = document.getElementById('panel-content');

    title.textContent = project.title;

    content.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" style="width: 100%; border: 1px solid #ddd; margin-bottom: 1.5rem;">
        </div>
        
        <div class="project-meta">
            <p style="color: #7f8c8d; margin-bottom: 1rem;"><strong>Date:</strong> ${project.date}</p>
        </div>
        
        <div class="project-description">
            <h3 style="margin-bottom: 1rem; color: #2c3e50;">Description</h3>
            <p style="line-height: 1.6; margin-bottom: 2rem;">${project.description}</p>
        </div>
        
        <div class="project-technologies">
            <h3 style="margin-bottom: 1rem; color: #2c3e50;">Technologies utilisées</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
                ${project.technologies.map(tech => `
                    <span style="background: #3498db; color: white; padding: 0.25rem 0.75rem; border: 1px solid #2980b9; font-size: 0.8rem;">${tech}</span>
                `).join('')}
            </div>
        </div>
        
        <div class="project-features">
            <h3 style="margin-bottom: 1rem; color: #2c3e50;">Fonctionnalités principales</h3>
            <ul style="margin-bottom: 2rem;">
                ${project.features.map(feature => `
                    <li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;">${feature}</li>
                `).join('')}
            </ul>
        </div>

    `;

    panel.classList.add('open');
}

function closeProjectPanel() {
    document.getElementById('project-panel').classList.remove('open');
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const sidebar = document.querySelector('.sidebar');
    
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
}

function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        submitBtn.style.background = '#95a5a6';

        setTimeout(() => {
            submitBtn.textContent = 'Message envoyé !';
            submitBtn.style.background = '#27ae60';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '#3498db';
                form.reset();
            }, 2000);
        }, 2000);
    });
}

function updateActiveNavigation() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentActive = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                currentActive = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentActive) {
                link.classList.add('active');
            }
        });
    })
}
