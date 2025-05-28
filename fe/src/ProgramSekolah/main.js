import '../global.css'
import './style.css'
import logoImage from '/logo.svg'
import { createNavbarHTML,initNavbarFunctionality } from '../Component/Navbar/navbar'
import { createFooterHTML } from '../Component/Footer/footer.js';

function createActivityCard(iconPath, title, description) {
  return `
    <div class="card">
      <div class="icon">
        <img src="${iconPath}" alt="${title}" />
      </div>
      <h3 class="card-title">${title}</h3>
      <p class="card-desc">${description}</p>
    </div>
  `
}

function createGallerySection(images) {
  return `
    <div class="gallery-section">
      <h2 class="section-title">Foto Kegiatan</h2>
      <div class="gallery-scroll-wrapper">
        <button class="scroll-btn left" id="scrollLeft">&#8592;</button>
        <div class="gallery-scroll" id="galleryScroll">
          <div class="gallery-grid">
            ${images.map(img => `
              <div class="gallery-item">
                <div class="image-wrapper">
                  <img src="${img.src}" class="gallery-img" alt="Foto Kegiatan" />
                  <div class="gallery-caption">${img.caption}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <button class="scroll-btn right" id="scrollRight">&#8594;</button>
      </div>
    </div>
  `;
}

function createKegiatanPenunjangHTML() {
  return `
    <div class="penunjang-wrapper">
      <h2 class="section-title">Kegiatan Penunjang</h2>
      <ul class="penunjang-list">
        <li>Mengikuti berbagai lomba di tingkat kabupaten maupun kotamadya.</li>
        <li>Kunjungan ke instansi, tempat umum, maupun kantor pemerintah (misalnya kantor polisi, Puskesmas, kantor pos, pasar, PMK).</li>
        <li>Mengadakan kegiatan-kegiatan dalam rangka memperingati hari besar Nasional.</li>
        <li>Mengisi acara anak-anak dalam berbagai media.</li>
      </ul>
    </div>
  `;
}

function createOutputSection() {
  return `
    <div class="output-section">
      <h2 class="section-title">Output Yang Dihasilkan</h2>
      <div class="output-columns">
        <ul>
          <li>Mengenal sholat.</li>
          <li>Perilaku Sosial Baik.</li>
          <li>Belajar berbakti kepada orang tua.</li>
          <li>Disiplin dan Mandiri.</li>
        </ul>
        <ul>
          <li>Hafal Hadist pilihan.</li>
          <li>Kemampuan Komunikasi baik.</li>
          <li>Belajar percaya diri.</li>
        </ul>
        <ul>
          <li>Memiliki budaya bersih.</li>
          <li>Terbiasa mengucap salam.</li>
          <li>Mengenal baca Al-Qur'an.</li>
          <li>Hafal Do'a Harian.</li>
        </ul>
      </div>
    </div>
  `
}

function createKurikulumPlusSection() {
  return `
    <div class="kurikulum-section">
      <h2 class="section-title">Kurikulum Plus</h2>
      <table class="kurikulum-table">
        <thead>
          <tr>
            <th>SURAT-SURAT PENDEK</th>
            <th>DOA</th>
            <th>HADIST</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              An-nas<br>
              Al-Falaq<br>
              Al-Ikhlas<br>
              Al-Lahab<br>
              Al-Kautsar<br>
              Al-Nasr<br>
              Al-Fil<br>
              Al-Maun<br>
              Ayat Kursi
            </td>
            <td>
              Doa sebelum & Bangun Tidur<br>
              Doa Sebelum & Sesudah Belaajr<br>
              Doa Keluar & Masuk Kamar Mandi<br>
              Doa Ketika Hujan Turun<br>
              Doa Masuk & keluar Masjid<br>
              Doa Naik Kendaraan Darat<br>
              Doa Naik Kendaraan Laut<br>
              Doa Kedua Orang Tua<br>
              Doa Keselamatan dunia akhirat<br>
              Doa Panjang Umur
            </td>
            <td>
              Hadist Senyum<br>
              Hadist kebersihan<br>
              Hadist Jangan Marah<br>
              Hadist Cinta Tanah Air<br>
              Hadist Sholat<br>
              Asmaul Husna 1-50
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
}

document.querySelector('#program-sekolah').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'program-sekolah'
  })}
  <div class="content-container">
    <h1 class="section-title">Kegiatan Unggulan</h1>
    <div class="grid-container">
      ${createActivityCard('/rs.svg', 'DONAT (Dokter Anak Sehat)', 'Pemeriksaan kesehatan anak, penyuluhan gizi, konseling psikologi, dll')}
      ${createActivityCard('/rs.svg', 'Ekstrakurikuler', '(Drumband, English day, Komputer day, Bela diri dan Tari, Mengaji)')}
      ${createActivityCard('/rs.svg', 'Student Day', 'Meliputi: Memasak, Berkebun, Life skill, dll')}
      ${createActivityCard('/rs.svg', 'Puncak Tema', 'Kegiatan yang diadakan pada akhir tema pelajaran')}
      ${createActivityCard('/rs.svg', 'ODOA', '(One Day One Ayat)')}
      ${createActivityCard('/rs.svg', 'Pondok Ramadhan', '')}
      ${createActivityCard('/rs.svg', 'Home Visit', '')}
      ${createActivityCard('/rs.svg', 'Parent Day', '')}
    </div>

    ${createGallerySection([
      { src: '/images/foto 1.jpg', caption: 'Kunjungan Edukasi' },
      { src: '/images/foto 2.jpg', caption: 'Kegiatan Berkebun' },
      { src: '/images/foto 3.jpg', caption: 'Kelas Memasak' },
      { src: '/images/foto 4.jpg', caption: 'Pentas Seni' },
      { src: '/images/foto 5.jpg', caption: 'Peringatan Hari Besar' },
      { src: '/images/foto 6.jpg', caption: 'Kegiatan Outdoor' },
      { src: '/images/foto 6.jpg', caption: 'Kegiatan Outdoor' },
      { src: '/images/foto 6.jpg', caption: 'Kegiatan Outdoor' },
      { src: '/images/foto 6.jpg', caption: 'Kegiatan Outdoor' },
      { src: '/images/foto 6.jpg', caption: 'Kegiatan Outdoor' },
      { src: '/images/foto 6.jpg', caption: 'Kegiatan Outdoor' }
    ])}

    ${createKegiatanPenunjangHTML()}
    ${createOutputSection()}
    ${createKurikulumPlusSection()}
  </div>
`

document.querySelector('#program-sekolah').innerHTML += createFooterHTML();

initNavbarFunctionality()

document.getElementById('scrollLeft').addEventListener('click', () => {
  document.getElementById('galleryScroll').scrollBy({
    left: -400,
    behavior: 'smooth'
  })
})

document.getElementById('scrollRight').addEventListener('click', () => {
  document.getElementById('galleryScroll').scrollBy({
    left: 400,
    behavior: 'smooth'
  })
})