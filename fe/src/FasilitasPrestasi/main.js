import '../global.css';
import './style.css';
import logoImage from '/logo.svg';
import { createNavbarHTML, initNavbarFunctionality } from '../Component/Navbar/navbar.js';
import { createFooterHTML } from '../Component/Footer/footer.js';
import { fetchGambarFasilitas } from './galerifasilitas.js';
import { fetchFasilitas } from './fasilitas.js';
import { fetchPrestasiGuru } from './prestasiguru.js';
import { fetchPrestasiSiswa } from './prestasisiswa.js';
import { fetchGaleri } from './galeri.js'; 


document.querySelector('#fasilitas-prestasi').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'fasilitas-prestasi'
  })}

  <section class="fasilitas-section">
    <h1 class="judul">FASILITAS KAMI</h1>
    <div class="fasilitas-container">
      <div class="fasilitas-list" id="fasilitas-list">
        <!-- Konten dari API -->
      </div>
      <div class="fasilitas-gallery">
        <div class="gallery-box" id="gallery-fasilitas">
          <!-- Gambar dari API -->
        </div>
      </div>
    </div>
  </section>

  <section class="prestasi-section">
    <h1 class="judul">DAFTAR PRESTASI</h1>
    <div class="prestasi-container">
      <div class="prestasi-box">
        <h2>Prestasi Guru</h2>
        <ul id="prestasi-guru">
          <!-- Data prestasi guru akan dimuat di sini -->
        </ul>
      </div>
      <div class="prestasi-box">
        <h2>Prestasi Siswa</h2>
        <ul id="prestasi-siswa">
          <!-- Data prestasi siswa akan dimuat di sini -->
        </ul>
      </div>
    </div>
  </section>


  <section class="galeri-section">
    <h1 class="judul">GALERI</h1>
    <div class="galeri-grid" id="galeri-grid"></div>
  </section>
`

document.querySelector('#fasilitas-prestasi').innerHTML += createFooterHTML();

Promise.all([
  fetchFasilitas(),
  fetchGambarFasilitas(),
  fetchPrestasiGuru(),
  fetchPrestasiSiswa(),
  fetchGaleri()
])
.then(([htmlFasilitas, htmlGalleryFasilitas, htmlPrestasiGuru, htmlPrestasiSiswa, htmlGaleri]) => {
  document.getElementById('fasilitas-list').innerHTML = htmlFasilitas;
  document.getElementById('gallery-fasilitas').innerHTML = htmlGalleryFasilitas;
  document.getElementById('prestasi-guru').innerHTML = htmlPrestasiGuru;
  document.getElementById('prestasi-siswa').innerHTML = htmlPrestasiSiswa;
  document.getElementById('galeri-grid').innerHTML = htmlGaleri;
})
.catch(err => {
  console.error("Gagal memuat salah satu atau lebih data:", err);
  document.getElementById('fasilitas-list').innerHTML = `<p style="color:red;">Gagal memuat fasilitas</p>`;
  document.getElementById('gallery-fasilitas').innerHTML = `<p style="color:red;">Gagal memuat galeri fasilitas</p>`;
  document.getElementById('prestasi-guru').innerHTML = `<p style="color:red;">Gagal memuat prestasi guru</p>`;
  document.getElementById('prestasi-siswa').innerHTML = `<p style="color:red;">Gagal memuat prestasi siswa</p>`;
  document.getElementById('galeri-grid').innerHTML = `<p style="color:red;">Gagal memuat galeri</p>`;
});

initNavbarFunctionality();

