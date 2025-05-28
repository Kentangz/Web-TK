import '../global.css'
import './style.css'
import logoImage from '/logo.svg'
import { createNavbarHTML, initNavbarFunctionality } from '../Component/Navbar/navbar.js'
import { fetchWaktuAB } from './waktutk.js' 
import { fetchJadwalAB } from './jadwaltk.js'
import { fetchWaktuKB } from './waktukb.js';
import { fetchJadwalKB } from './jadwalkb.js';
import { createFooterHTML } from '../Component/Footer/footer.js';

document.querySelector('#jadwal').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'jadwal'
  })}

  <div class="jadwal-wrapper jadwal-wrapper-ab">
    <section class="jadwal-section">
      <div class="jadwal-kelompok-ab">
        <h1>JADWAL KELOMPOK A & B</h1>
        <div id="waktu-ab">Memuat waktu...</div>
        <ul class="jadwal-list" id="jadwal-ab-list">
        </ul>
      </div>
    </section>
  </div>

  <div class="jadwal-wrapper jadwal-wrapper-kb">
    <section class="jadwal2-section">
      <div class="jadwal-kelompok-kb">
        <h1>JADWAL KELOMPOK BERMAIN (KB)</h1>
        <div id="waktu-kb">Memuat waktu...</div>
        <ul class="jadwal-list" id="jadwal-kb-list">
        </ul>
      </div>
    </section>
  </div>
`
document.querySelector('#jadwal').innerHTML += createFooterHTML();

Promise.all([
  fetchWaktuAB(),
  fetchJadwalAB(),
  fetchWaktuKB(),
  fetchJadwalKB()
])
.then(([waktuAB, jadwalAB, waktuKB, jadwalKB]) => {
  document.getElementById('waktu-ab').innerHTML = waktuAB;
  document.getElementById('jadwal-ab-list').innerHTML = jadwalAB;
  document.getElementById('waktu-kb').innerHTML = waktuKB;
  document.getElementById('jadwal-kb-list').innerHTML = jadwalKB;
})
.catch(err => {
  console.error("Gagal memuat salah satu atau lebih data jadwal:", err);
  document.getElementById('waktu-ab').innerHTML = `<p style="color:red;">Gagal memuat waktu AB</p>`;
  document.getElementById('jadwal-ab-list').innerHTML = `<p style="color:red;">Gagal memuat jadwal AB</p>`;
  document.getElementById('waktu-kb').innerHTML = `<p style="color:red;">Gagal memuat waktu KB</p>`;
  document.getElementById('jadwal-kb-list').innerHTML = `<p style="color:red;">Gagal memuat jadwal KB</p>`;
});
initNavbarFunctionality()
