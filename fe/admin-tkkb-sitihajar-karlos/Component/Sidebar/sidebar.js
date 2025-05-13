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

const pageMap = {
  'dashboard': `${basePath}/dashboard.html`,
  'guru': `${basePath}/guru.html`,
  'contact': `${basePath}/contact.html`,

  'visi-misi': `${basePath}${paths.beranda}/visi-misi`,
  'tujuan-strategi': `${basePath}${paths.beranda}/tujuan-strategi`,
  'gallery-beranda': `${basePath}${paths.beranda}/gallery-beranda`,

  'kegiatan-unggulan': `${basePath}${paths.programSekolah}/kegiatan-unggulan/kegiatan-unggulan`,
  'galeri-kegiatan': `${basePath}${paths.programSekolah}/galeri-kegiatan/galeri-kegiatan`,
  'kegiatan-penunjang': `${basePath}${paths.programSekolah}/kegiatan-penunjang/kegiatan-penunjang`,
  'output': `${basePath}${paths.programSekolah}/output/output`,
  'kurikulum-plus': `${basePath}${paths.programSekolah}/kurikulum-plus/kurikulum-plus`,

  'fasilitas': `${basePath}${paths.fasilitas}/fasilitas.html`,
  'galeri-fasilitas': `${basePath}${paths.fasilitas}/galeri-fasilitas.html`,
  'prestasi': `${basePath}${paths.fasilitas}/prestasi.html`,
  'galeri-prestasi': `${basePath}${paths.fasilitas}/galeri-prestasi.html`,

  'jadwal-a-b': `${basePath}${paths.jadwal}/jadwal-a-b.html`,
  'kelompok-bermain': `${basePath}${paths.jadwal}/kelompok-bermain.html`
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
    <li class="dropdown ${isOpen ? 'open' : ''}">
      <div class="dropdown-title ${isActiveGroup}" data-group="${id}">${label}</div>
      <ul>
        ${subItems}
      </ul>
    </li>
  `;
}

export function initSidebarFunctionality() {
  const dropdowns = document.querySelectorAll('.sidebar .dropdown');

  dropdowns.forEach(dropdown => {
    const title = dropdown.querySelector('.dropdown-title');
    title.addEventListener('click', function () {
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });
      dropdown.classList.toggle('open');
    });
  });

  // Menutup semua dropdown saat submenu diklik
  const allLinks = document.querySelectorAll('.sidebar a');
  allLinks.forEach(link => {
    link.addEventListener('click', () => {
      dropdowns.forEach(d => d.classList.remove('open'));
    });
  });
}

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
