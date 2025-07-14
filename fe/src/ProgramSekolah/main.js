import '../global.css';
import './style.css';
import logoImage from '/logo.svg';
import { createNavbarHTML, initNavbarFunctionality } from '../Component/Navbar/navbar';
import { createFooterHTML } from '../Component/Footer/footer.js';
import { fetchActivityCards } from './activitycard.js';
import { fetchGambarGaleriKegiatan } from './gambargalerikegiatan.js';
import { fetchPenunjang } from './penunjang';
import { fetchOutput } from './output';
import { fetchKurikulumPlus } from './kurikulum';
import { fetchWithCache } from '../cache/cache.js';
import { initScrollAnimations } from '../Component/animasi/animasiscroll.js';

document.querySelector('#program-sekolah').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'program-sekolah'
  })}

  <section class = "section-prosekolah">
    <section class="kegiatanunggulan scroll-animate">
      <h1 class="section-title">Kegiatan Unggulan</h1>
      <div class="card-content">
        <div class="grid-container" id="activity-cards">
          <div class="loader"></div>
        </div>
      </div>
    </section>
  </section>

  <section class = "section-prosekolah">
    <section class="fotokegiatan scroll-animate">
      <div class="gallery-section">
        <h2 class="section-title">Foto Kegiatan</h2>
        <div class="gallery-scroll-wrapper">
          <div class="gallery-scroll" id="galleryScroll">
            <div class="gallery-grid" id="gallery-section">
              <div class="loader"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
  
  <section class = "section-prosekolah">
    <section class="kegiatanpenunjang scroll-animate">
      <div id="penunjang-wrapper">
        <h2 class="section-title">Kegiatan Penunjang</h2>
        <div id="penunjang-section">
          <div class="loader"></div>
        </div>
      </div>
    </section>
  </section>

  <section class = "section-prosekolah">
    <section class="output scroll-animate">
      <div id="output-wrapper">
        <h2 class="section-title">Output Yang Dihasilkan</h2>
        <div id="output-section">
          <div class="loader"></div>
        </div>
      </div>
    </section>
  </section>

  <section class = "section-prosekolah">
    <section class="kurikulumplus scroll-animate">
      <div id="kurikulum-wrapper">
        <h2 class="section-title">Kurikulum Plus</h2>
        <div class="kurikulum-section" id="kurikulum-section">
          <div class="loader"></div>
        </div>
      </div>
    </section>
  </section>
`;

document.querySelector('#program-sekolah').innerHTML += createFooterHTML();

initNavbarFunctionality();

// ACTIVITY CARDS
fetchWithCache('activity', fetchActivityCards)
  .then(data => {
    document.getElementById('activity-cards').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('activity-cards').innerHTML = `<p style="color:red;">Gagal memuat aktivitas</p>`;
  });

// GALERI
fetchWithCache('gambargaleri', fetchGambarGaleriKegiatan)
  .then(data => {
    document.getElementById('gallery-section').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('gallery-section').innerHTML = `<p style="color:red;">Gagal memuat galeri</p>`;
  });

// PENUNJANG
fetchWithCache('penunjang', fetchPenunjang)
  .then(data => {
    document.getElementById('penunjang-section').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('penunjang-section').innerHTML = `<p style="color:red;">Gagal memuat penunjang</p>`;
  });

// OUTPUT
fetchWithCache('output', fetchOutput)
  .then(data => {
    document.getElementById('output-section').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('output-section').innerHTML = `<p style="color:red;">Gagal memuat output</p>`;
  });

// KURIKULUM PLUS
fetchWithCache('kurikulumplus', fetchKurikulumPlus)
  .then(data => {
    document.getElementById('kurikulum-section').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('kurikulum-section').innerHTML = `<p style="color:red;">Gagal memuat kurikulum</p>`;
  });
  
initScrollAnimations();
// Tambahkan drag-scroll dengan mouse pada galleryScroll
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
      const walk = (x - startX) * 1.5; // adjust speed
      galleryScroll.scrollLeft = scrollLeft - walk;
      isScrolling = false;
    });
    isScrolling = true;
  }
});
