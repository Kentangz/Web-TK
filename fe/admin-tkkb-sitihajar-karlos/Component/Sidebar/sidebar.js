import './style.css';
import logoImage from '/logo.svg';

export function createSidebarHTML(activePage = '') {
  return `
<div class="sidebar">
  <div class="logo-container">
    <img src="${logoImage}" alt="Logo" class="logo" />
    <h2>TK & KB SITI HAJAR</h2>
  </div>
  <ul>
    <li class="${activePage === 'dashboard' ? 'active' : ''}">Dashboard</li>

    <li class="dropdown ${['visi-misi', 'tujuan-strategi', 'gallery-beranda'].includes(activePage) ? 'open' : ''}">
      Beranda
      <ul>
        <li class="${activePage === 'visi-misi' ? 'active' : ''}">Visi & Misi</li>
        <li class="${activePage === 'tujuan-strategi' ? 'active' : ''}">Tujuan & Strategi</li>
        <li class="${activePage === 'gallery-beranda' ? 'active' : ''}">Gallery</li>
      </ul>
    </li>

    <li class="dropdown ${[
      'kegiatan-unggulan', 'galeri-kegiatan', 'kegiatan-penunjang', 'output', 'kurikulum-plus'
    ].includes(activePage) ? 'open' : ''}">
      Program Sekolah
      <ul>
        <li class="${activePage === 'kegiatan-unggulan' ? 'active' : ''}">Kegiatan Unggulan</li>
        <li class="${activePage === 'galeri-kegiatan' ? 'active' : ''}">Galeri Kegiatan</li>
        <li class="${activePage === 'kegiatan-penunjang' ? 'active' : ''}">Kegiatan Penunjang</li>
        <li class="${activePage === 'output' ? 'active' : ''}">Output Yang Dihasilkan</li>
        <li class="${activePage === 'kurikulum-plus' ? 'active' : ''}">Kurikulum Plus</li>
      </ul>
    </li>

    <li class="dropdown ${['fasilitas', 'galeri-fasilitas', 'prestasi', 'galeri-prestasi'].includes(activePage) ? 'open' : ''}">
      Fasilitas & Prestasi
      <ul>
        <li class="${activePage === 'fasilitas' ? 'active' : ''}">Fasilitas</li>
        <li class="${activePage === 'galeri-fasilitas' ? 'active' : ''}">Galeri Fasilitas</li>
        <li class="${activePage === 'prestasi' ? 'active' : ''}">Prestasi</li>
        <li class="${activePage === 'galeri-prestasi' ? 'active' : ''}">Galeri Prestasi</li>
      </ul>
    </li>

    <li class="dropdown ${['jadwal-a-b', 'kelompok-bermain'].includes(activePage) ? 'open' : ''}">
      Jadwal TK & KB
      <ul>
        <li class="${activePage === 'jadwal-a-b' ? 'active' : ''}">Kelompok A & B</li>
        <li class="${activePage === 'kelompok-bermain' ? 'active' : ''}">Kelompok Bermain</li>
      </ul>
    </li>

    <li class="${activePage === 'contact' ? 'active' : ''}">Contact</li>
    <li class="${activePage === 'guru' ? 'active' : ''}">Guru</li>
  </ul>
</div>

  `;
}

//dropdown func
export function initSidebarFunctionality() {
  const dropdowns = document.querySelectorAll('.sidebar .dropdown');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function (e) {
      if (e.target.closest('ul') && e.target !== this) return;
      dropdowns.forEach(d => {
        if (d !== this) {
          d.classList.remove('open');
        }
      });
      this.classList.toggle('open');
    });
  });
}



