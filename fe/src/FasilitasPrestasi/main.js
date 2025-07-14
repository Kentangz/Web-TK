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
import { fetchWithCache } from '../cache/cache.js';
import { initScrollAnimations } from '../Component/animasi/animasiscroll.js';

document.querySelector('#fasilitas-prestasi').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'fasilitas-prestasi'
  })}

  <section class="section-fasiltas">
    <section class="fasilitas-section scroll-animate">
      <h1 class="judul">FASILITAS KAMI</h1>
      <div class="fasilitas-container">
        <div class="fasilitas-list" id="fasilitas-list">
          <div class="loader"></div>
        </div>
        <div class="fasilitas-gallery">
          <div class="gallery-box gallery-scroll" id="gallery-fasilitas">
            <div class="loader"></div>
          </div>
        </div>
      </div>
    </section>
  </section>

  <section class="section-fasiltas">
    <section class="prestasi-section scroll-animate">
      <h1 class="judul">DAFTAR PRESTASI</h1>
      <div class="prestasi-container">
        <div class="prestasi-box">
          <h2>Prestasi Guru</h2>
          <ul id="prestasi-guru">
            <div class="loader"></div>
          </ul>
        </div>
        <div class="prestasi-box">
          <h2>Prestasi Siswa</h2>
          <ul id="prestasi-siswa">
            <div class="loader"></div>
          </ul>
        </div>
      </div>
    </section>
  </section>

  <section class="section-fasiltas">
    <section class="galeri-section scroll-animate">
      <h1 class="judul">GALERI</h1>
      <div class="galeri-grid" id="galeri-grid"></div>
    </section>
  </section>

`

document.querySelector('#fasilitas-prestasi').innerHTML += createFooterHTML();
initNavbarFunctionality();

// FASILITAS LIST
fetchWithCache('fasilitas-list', fetchFasilitas)
  .then(data => {
    document.getElementById('fasilitas-list').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('fasilitas-list').innerHTML = `<p style="color:red;">Gagal memuat fasilitas</p>`;
  });

// GALERI FASILITAS
fetchWithCache('gallery-fasilitas', fetchGambarFasilitas)
  .then(data => {
    document.getElementById('gallery-fasilitas').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('gallery-fasilitas').innerHTML = `<p style="color:red;">Gagal memuat galeri fasilitas</p>`;
  });

// PRESTASI GURU
fetchWithCache('prestasi-guru', fetchPrestasiGuru)
  .then(data => {
    document.getElementById('prestasi-guru').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('prestasi-guru').innerHTML = `<p style="color:red;">Gagal memuat prestasi guru</p>`;
  });

// PRESTASI SISWA
fetchWithCache('prestasi-siswa', fetchPrestasiSiswa)
  .then(data => {
    document.getElementById('prestasi-siswa').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('prestasi-siswa').innerHTML = `<p style="color:red;">Gagal memuat prestasi siswa</p>`;
  });

// GALERI GRID
fetchWithCache('galeri-grid', fetchGaleri)
  .then(data => {
    document.getElementById('galeri-grid').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('galeri-grid').innerHTML = `<p style="color:red;">Gagal memuat galeri</p>`;
  });

initScrollAnimations();


const galleryScroll = document.getElementById('gallery-fasilitas');
if (galleryScroll) {
  let isDown = false;
  let startX;
  let scrollLeft;
  let isScrolling = false;

  galleryScroll.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - galleryScroll.offsetLeft;
    scrollLeft = galleryScroll.scrollLeft;
    galleryScroll.classList.add('active');
  });

  galleryScroll.addEventListener('mouseleave', () => {
    isDown = false;
    galleryScroll.classList.remove('active');
  });

  galleryScroll.addEventListener('mouseup', () => {
    isDown = false;
    galleryScroll.classList.remove('active');
  });

  galleryScroll.addEventListener('mousemove', (e) => {
    if (!isDown) return;

    e.preventDefault();

    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        const x = e.pageX - galleryScroll.offsetLeft;
        const walk = (x - startX) * 1.5;
        galleryScroll.scrollLeft = scrollLeft - walk;
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
}
