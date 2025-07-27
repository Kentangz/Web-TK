import '../global.css';
import './style.css';
import { createSidebarHTML, initSidebarFunctionality } from '../Component/Sidebar/sidebar';
import { checkAuth } from '../Auth/Api/checkX';

if (!checkAuth()) {
	throw new Error("Not authenticated");
}

document.querySelector('#dashboard').innerHTML = `
  ${createSidebarHTML({
    activePage: 'dashboard',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  
  <div class="main-content">

    <div class="topbar">
      <div class="admin-info">
        <img src="/user.png" alt="Admin Profile"> 
        <div class="admin-text">
          <div class="admin-role">Admin</div>
          <div class="admin-name">Linna Indriyanti, S. Psi</div>
        </div>
      </div>
    </div>

    <div class="welcome-text">
       <img src="/images/bgberanda.png" alt="Welcome Background" class="welcome-bg" />
      <h2>Selamat Datang, Admin!</h2>
      <p>Sistem Informasi Akademik TK & KB Siti Hajar, Jawa Timur</p>
      <button>Tampilan Utama</button>
    </div>

    <div class="dashboard-box">
      <div class="dashboard-title">Dashboard TK & KB Siti Hajar</div>
      <div class="dashboard-cards">
        <div class="card">Beranda</div>
        <div class="card">Fasilitas & Prestasi</div>
        <div class="card">Guru</div>
      </div>
    </div>

  </div>
`;

initSidebarFunctionality();

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const name = card.textContent.trim();

      switch (name) {
        case "Beranda":
          window.location.href = "/admin-tkkb-sitihajar-karlos/beranda/visi-misi";
          break;
        case "Fasilitas & Prestasi":
          window.location.href = "/admin-tkkb-sitihajar-karlos/fasilitas-prestasi/fasilitas";
          break;
        case "Guru":
          window.location.href = "/admin-tkkb-sitihajar-karlos/guru";
          break;
        default:
          console.warn(`No route defined for ${name}`);
      }
    });
  });
});

 // Event untuk tombol Contact
  const contactButton = document.querySelector(".welcome-text button");
  if (contactButton) {
    contactButton.addEventListener("click", () => {
      window.location.href = "/index"; 
    });
  }
