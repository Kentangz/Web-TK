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

document.querySelector('#program-sekolah').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'program-sekolah'
  })}
  <section class="kegiatanunggulan">
    <h1 class="section-title">Kegiatan Unggulan</h1>
    <div class="card-content">
      <div class="grid-container" id="activity-cards">Memuat...</div>
    </div>
  </section>

  <section class="fotokegiatan">
    <div class="gallery-section">
      <h2 class="section-title">Foto Kegiatan</h2>
      <div class="gallery-scroll-wrapper">
        <div class="gallery-scroll" id="galleryScroll">
          <div class="gallery-grid" id="gallery-section">Memuat galeri...</div>
        </div>
      </div>
    </div>
  </section>

  <section class="kegiatanpenunjang">
    <div id="penunjang-wrapper">
      <h2 class="section-title">Kegiatan Penunjang</h2>
      <div id="penunjang-section">Memuat kegiatan penunjang...</div>
    </div>
  </section>

  <section class="output">
    <div id="output-wrapper">
      <h2 class="section-title">Output Yang Dihasilkan</h2>
      <div id="output-section">Memuat output...</div>
    </div>
  </section>

  <section class="kurikulumplus">
    <div id="kurikulum-wrapper">
      <h2 class="section-title">Kurikulum Plus</h2>
      <div class="kurikulum-section" id="kurikulum-section">Memuat kurikulum...</div>
    </div>
  </section>
`;

document.querySelector('#program-sekolah').innerHTML += createFooterHTML();

Promise.all([
  fetchActivityCards(),
  fetchGambarGaleriKegiatan(), 
  fetchPenunjang(),
  fetchOutput(),
  fetchKurikulumPlus()
])
.then(([activityCardsHTML, galleryHTML, penunjangHTML, outputHTML, kurikulumHTML]) => {
  document.getElementById('activity-cards').innerHTML = activityCardsHTML;
  document.getElementById('gallery-section').innerHTML = galleryHTML;
  document.getElementById('penunjang-section').innerHTML = penunjangHTML;
  document.getElementById('output-section').innerHTML = outputHTML;
  document.getElementById('kurikulum-section').innerHTML = kurikulumHTML;

  // Aktifkan scroll tombol
  document.getElementById('scrollLeft')?.addEventListener('click', () => {
    document.getElementById('galleryScroll')?.scrollBy({
      left: -400,
      behavior: 'smooth'
    });
  });

  document.getElementById('scrollRight')?.addEventListener('click', () => {
    document.getElementById('galleryScroll')?.scrollBy({
      left: 400,
      behavior: 'smooth'
    });
  });
})
.catch(err => {
  console.error("Gagal memuat salah satu atau lebih konten:", err);
});

initNavbarFunctionality();
