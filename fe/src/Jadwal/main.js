import '../global.css'
import './style.css'
import logoImage from '/logo.svg'
import { createNavbarHTML, initNavbarFunctionality } from '../Component/Navbar/navbar.js'
import { fetchWaktuAB } from './waktutk.js' 
import { fetchJadwalAB } from './jadwaltk.js'
import { fetchWaktuKB } from './waktukb.js';
import { fetchJadwalKB } from './jadwalkb.js';
import { createFooterHTML } from '../Component/Footer/footer.js';
import { fetchWithCache } from '../cache/cache.js'
import { initScrollAnimations } from '../Component/animasi/animasiscroll.js'

document.querySelector('#jadwal').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'jadwal'
  })}

  <div class="jadwal-wrapper jadwal-wrapper-ab scroll-animate">
    <section class="jadwal-section">
      <div class="jadwal-kelompok-ab">
        <h1>JADWAL KELOMPOK A & B</h1>
        <div id="waktu-ab">
          <div class="loader"></div>
        </div>
        <ul class="jadwal-list" id="jadwal-ab-list">
        </ul>
      </div>
    </section>
  </div>

  <div class="jadwal-wrapper jadwal-wrapper-kb scroll-animate">
    <section class="jadwal2-section">
      <div class="jadwal-kelompok-kb">
        <h1>JADWAL KELOMPOK BERMAIN (KB)</h1>
        <div id="waktu-kb">
          <div class="loader"></div>
        </div>
        <ul class="jadwal-list" id="jadwal-kb-list">
        </ul>
      </div>
    </section>
  </div>
`
document.querySelector('#jadwal').innerHTML += createFooterHTML();

initNavbarFunctionality();

// WAKTU AB
fetchWithCache('waktuab', fetchWaktuAB)
  .then(data => {
    document.getElementById('waktu-ab').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('waktu-ab').innerHTML = `<p style="color:red;">Gagal memuat waktu AB</p>`;
  });

// JADWAL AB
fetchWithCache('jadwalab', fetchJadwalAB)
  .then(data => {
    document.getElementById('jadwal-ab-list').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('jadwal-ab-list').innerHTML = `<p style="color:red;">Gagal memuat jadwal AB</p>`;
  });

// WAKTU KB
fetchWithCache('waktukb', fetchWaktuKB)
  .then(data => {
    document.getElementById('waktu-kb').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('waktu-kb').innerHTML = `<p style="color:red;">Gagal memuat waktu KB</p>`;
  });

// JADWAL KB
fetchWithCache('jadwalkb', fetchJadwalKB)
  .then(data => {
    document.getElementById('jadwal-kb-list').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('jadwal-kb-list').innerHTML = `<p style="color:red;">Gagal memuat jadwal KB</p>`;
  });

initScrollAnimations();


