import './style.css';

export function createSidebarHTML(options = {}) {
  const {
    logoSrc = '/logo.svg',
    schoolName = 'TK & KB SITI HAJAR',
    activePage = 'dashboard'
  } = options;

  return `
    <div class="sidebar">
      <div class="logo-container">
        <img src="${logoSrc}" alt="Logo" class="logo" />
        <h2>${schoolName}</h2>
      </div>
      <ul>
        ${createSidebarItem('dashboard', 'Dashboard', activePage)}

        ${createDropdown('beranda', 'Beranda', [
          { id: 'visi-misi', label: 'Visi & Misi' },
          { id: 'tujuan-strategi', label: 'Tujuan & Strategi' },
          { id: 'gallery-beranda', label: 'Gallery' }
        ], activePage)}

        ${createDropdown('program-sekolah', 'Program Sekolah', [
          { id: 'kegiatan-unggulan', label: 'Kegiatan Unggulan' },
          { id: 'galeri-kegiatan', label: 'Galeri Kegiatan' },
          { id: 'kegiatan-penunjang', label: 'Kegiatan Penunjang' },
          { id: 'output', label: 'Output Yang Dihasilkan' },
          { id: 'kurikulum-plus', label: 'Kurikulum Plus' }
        ], activePage)}

        ${createDropdown('fasilitas-prestasi', 'Fasilitas & Prestasi', [
          { id: 'fasilitas', label: 'Fasilitas' },
          { id: 'galeri-fasilitas', label: 'Galeri Fasilitas' },
          { id: 'prestasi', label: 'Prestasi' },
          { id: 'galeri-prestasi', label: 'Galeri Prestasi' }
        ], activePage)}

        ${createDropdown('jadwal', 'Jadwal TK & KB', [
          { id: 'jadwal-a-b', label: 'Kelompok A & B' },
          { id: 'kelompok-bermain', label: 'Kelompok Bermain' }
        ], activePage)}

        ${createSidebarItem('guru', 'Guru', activePage)}
        ${createSidebarItem('contact', 'Contact', activePage)}
      </ul>
    </div>
  `;
}

const basePath = '/admin-tkkb-sitihajar-karlos';
const paths = {
  beranda: '/beranda',
  programSekolah: '/program-sekolah',
  fasilitas: '/fasilitas-prestasi',
  jadwal: '/jadwal'
};
// mapping
const pageMap = {
  'dashboard': `${basePath}/dashboard`,
  'guru': `${basePath}/guru`,
  'contact': `${basePath}/contact`,

  'visi-misi': `${basePath}${paths.beranda}/visi-misi`,
  'tujuan-strategi': `${basePath}${paths.beranda}/tujuan-strategi`,
  'gallery-beranda': `${basePath}${paths.beranda}/gallery-beranda`,

  'kegiatan-unggulan': `${basePath}${paths.programSekolah}/kegiatan-unggulan`,
  'galeri-kegiatan': `${basePath}${paths.programSekolah}/galeri-kegiatan`,
  'kegiatan-penunjang': `${basePath}${paths.programSekolah}/kegiatan-penunjang`,
  'output': `${basePath}${paths.programSekolah}/output`,
  'kurikulum-plus': `${basePath}${paths.programSekolah}/kurikulum-plus`,

  'fasilitas': `${basePath}${paths.fasilitas}/fasilitas`,
  'galeri-fasilitas': `${basePath}${paths.fasilitas}/galeri-fasilitas`,
  'prestasi': `${basePath}${paths.fasilitas}/prestasi`,
  'galeri-prestasi': `${basePath}${paths.fasilitas}/galeri-prestasi`,

  'jadwal-a-b': `${basePath}${paths.jadwal}/jadwal-a-b`,
  'kelompok-bermain': `${basePath}${paths.jadwal}/kelompok-bermain`
};

function createSidebarItem(id, label, activePage) {
  const isActive = activePage === id ? 'active' : '';
  const href = pageMap[id] || '#';
  return `<li class="${isActive}"><a href="${href}" data-id="${id}">${label}</a></li>`;
}

function createDropdown(id, label, items, activePage) {
  const isOpen = items.some(item => item.id === activePage);
  const isActiveGroup = isOpen ? 'active' : '';

  const subItems = items.map(item => {
    const isActive = activePage === item.id ? 'active' : '';
    const href = pageMap[item.id] || '#';
    return `<li class="${isActive}"><a href="${href}" data-id="${item.id}">${item.label}</a></li>`;
  }).join('');

  return `
    <li class="dropdown ${isOpen ? 'open' : ''} ${isActiveGroup}">
      <div class="dropdown-title" data-group="${id}">${label}</div>
      <ul>
        ${subItems}
      </ul>
    </li>
  `;
}


export function initSidebarFunctionality() {
  const dropdowns = document.querySelectorAll('.sidebar .dropdown');
  // dropdown based on localStorage
  const savedGroup = localStorage.getItem('openDropdown');
  if (savedGroup) {
    const target = document.querySelector(`.dropdown-title[data-group="${savedGroup}"]`);
    if (target) {
      target.parentElement.classList.add('open');
    }

  }
  // klik dropdown title
  dropdowns.forEach(dropdown => {
    const title = dropdown.querySelector('.dropdown-title');
    title.addEventListener('click', function () {
      const isOpen = dropdown.classList.contains('open');

      // Tutup semua dropdown
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });
      dropdown.classList.toggle('open');

      // Update localStorage
      if (!isOpen) {
        localStorage.setItem('openDropdown', title.dataset.group);
      } else {
        localStorage.removeItem('openDropdown');
      }
    });
  });

  // Simpan dropdown saat diklik
  const allLinks = document.querySelectorAll('.sidebar a');
  allLinks.forEach(link => {
    link.addEventListener('click', () => {
      const parentDropdown = link.closest('.dropdown');
      if (parentDropdown) {
        const groupId = parentDropdown.querySelector('.dropdown-title').dataset.group;
        localStorage.setItem('openDropdown', groupId);
      } else {
        localStorage.removeItem('openDropdown');
      }
    });
  });
}

// func create Sidebar
export function createSidebar(options = {}) {
  const html = createSidebarHTML(options);
  return {
    html,
    mount(target = document.body) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html.trim();
      const sidebarElement = tempDiv.firstChild;
      target.appendChild(sidebarElement);
      initSidebarFunctionality();
      return this;
    }
  };
}
