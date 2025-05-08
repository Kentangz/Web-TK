import './style.css';
import logoImage from '/logo.svg'; // Pastikan path logo sudah benar

export function createSidebarHTML(activePage = '') {
  return `
    <div class="sidebar">
      <div class="logo-container">
        <img src="${logoImage}" alt="Logo" class="logo" />
        <h2>TK & KB SITI HAJAR</h2>
      </div>
      <ul>
        <li class="${activePage === 'dashboard' ? 'active' : ''}">Dashboard</li>
        <li class="${activePage === 'beranda' ? 'active' : ''}">Beranda</li>
        <li class="${activePage === 'program' ? 'active' : ''}">Program Sekolah</li>
        <li class="dropdown ${activePage === 'fasilitas' || activePage === 'prestasi' ? 'open' : ''}">
          Fasilitas & Prestasi
          <ul>
            <li class="${activePage === 'fasilitas' ? 'active' : ''}">Fasilitas</li>
            <li class="${activePage === 'prestasi' ? 'active' : ''}">Prestasi</li>
          </ul>
        </li>
        <li class="${activePage === 'jadwal' ? 'active' : ''}">Jadwal TK & KB</li>
        <li class="${activePage === 'contact' ? 'active' : ''}">Contact</li>
        <li class="${activePage === 'guru' ? 'active' : ''}">Guru</li>
      </ul>

    </div>
  `;
}

export function initSidebarFunctionality() {
  document.querySelectorAll('.sidebar .dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', () => {
      dropdown.classList.toggle('open');
    });
  });
}
