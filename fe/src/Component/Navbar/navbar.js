import './style.css';

export function createNavbarHTML(options = {}) {
    const {
        logoSrc = '/logo.svg',
        schoolName = 'TK & KB SITI HAJAR',
        activePage = 'beranda'
    } = options;
    
    return `
        <nav class="tk-navbar">
            <div class="navbar">
                <div class="logo-container">
                    <img class="logo" src="${logoSrc}" alt="School Logo">
                    <span class="school-name">${schoolName}</span>
                </div>
                <ul class="nav-links">
                    ${createNavItem('beranda', 'Beranda', activePage)}
                    ${createNavItem('program-sekolah', 'Program Sekolah', activePage)}
                    ${createNavItem('fasilitas-prestasi', 'Fasilitas & Prestasi', activePage)}
                    ${createNavItem('jadwal', 'Jadwal TK & KB', activePage)}
                    ${createNavItem('pendaftaran', 'Pendaftaran', activePage)}
                    ${createNavItem('contact', 'Contact', activePage, 'contact-btn')}
                </ul>
            </div>
        </nav>
    `;
}

//func inner item
function createNavItem(id, text, activePage, className = 'nav-link') {
    const isActive = activePage === id ? 'active' : '';
    
    //mapping
    const pageMap = {
        'beranda': 'beranda',
        'program-sekolah': 'program-sekolah',
        'fasilitas-prestasi': 'fasilitas-prestasi',
        'jadwal': 'jadwal',
        'pendaftaran': 'pendaftaran',
        'contact': 'contact'
    };

    const href = pageMap[id] || '#beranda'; //fallback

    return `<li><a href="${href}" class="${className} ${isActive}">${text}</a></li>`;
}


//import func 
export function initNavbarFunctionality() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contactBtn = document.querySelector('.contact-btn');
    
    const allNavItems = [...navLinks];
    if (contactBtn) allNavItems.push(contactBtn);
    
    allNavItems.forEach(link => {
        link.addEventListener('click', handleNavClick.bind(null, allNavItems));
    });
}

//handle click
function handleNavClick(allItems, event) {
    allItems.forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');
}

//create navbar
export function createNavbar(options = {}) {
    console.warn('if createNavbar error ganti createNavbarHTML dan initNavbarFunctionality');
    
    const html = createNavbarHTML(options);
    
    return {
        html,
        //inner html again
        mount(target = document.body) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const navElement = tempDiv.firstChild;
            
            if (target.firstChild) {
                target.insertBefore(navElement, target.firstChild);
            } else {
                target.appendChild(navElement);
            }
            
            initNavbarFunctionality();
            return this;
        }
    };
}