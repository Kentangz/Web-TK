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
        <li class="dropdown ${activePage === 'beranda' || activePage === 'beranda' ? 'open' : ''}">
          Beranda
          <ul>
            <li class="${activePage === 'Visi & Misi' ? 'active' : ''}">Visi & Misi</li>
            <li class="${activePage === 'Tujuan & Strategi' ? 'active' : ''}">Tujuan & Strategi</li>
            <li class="${activePage === 'Gallery' ? 'active' : ''}">Gallery</li>
          </ul>
        </li>
        <li class="dropdown ${activePage === 'Program Sekolah' || activePage === 'program-sekolah' ? 'open' : ''}">
          Program Sekolah
          <ul>
            <li class="${activePage === 'Kegiatan Unggulan' ? 'active' : ''}">Kegiatan Unggulan</li>
            <li class="${activePage === 'Galeri Kegiatan' ? 'active' : ''}">Galeri Kegiatan</li>
            <li class="${activePage === 'Kegiatan Penunjang' ? 'active' : ''}">Kegiatan Penunjang</li>
            <li class="${activePage === 'Output Yang Dihasilkan' ? 'active' : ''}">Output Yang Dihasilkan</li>
            <li class="${activePage === 'Kurikulum Plus' ? 'active' : ''}">Kurikulum Plus</li>
          </ul>
        </li>
        <li class="dropdown ${activePage === 'fasilitas' || activePage === 'prestasi' ? 'open' : ''}">
          Fasilitas & Prestasi
          <ul>
            <li class="${activePage === 'fasilitas' ? 'active' : ''}">Fasilitas</li>
            <li class="${activePage === 'prestasi' ? 'active' : ''}">Prestasi</li>
            <li class="${activePage === 'prestasi' ? 'active' : ''}">Prestasi</li>
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
