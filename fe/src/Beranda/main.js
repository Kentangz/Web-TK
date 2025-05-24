import '../global.css'
import './style.css'
import logoImage from '/logo.svg'
import { createNavbarHTML,initNavbarFunctionality} from '../Component/Navbar/navbar.js'
import { fetchvisi } from './visi.js'
import { fetchMisi } from './misi.js';
import { fetchVisiMisiImage } from './gambarVisiMisi.js';
import { fetchTujuan } from './tujuan.js'
import { fetchStrategi } from './strategi.js'
import { fetchGambarTujuan } from './gambarTujuanStrategi.js'
import { fetchGambarGaleriKegiatan } from '../ProgramSekolah/gambargalerikegiatan.js';
import { fetchGambarFasilitas } from '../FasilitasPrestasi/gambarfasilitas.js';


document.querySelector('#beranda').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'beranda'
  })}
  <section class="hero">
    <div class="hero-content">
        <div class="text-content">
          <h1>TK & KB SITI HAJAR</h1>
          <div class="text-child">
            <p>Jl. Ampel Pratama V Blok E2 No.9, Perum Pesanggrahan Pratama Karangploso.</p>
          </div>
          <p>
            KB/TK Siti Hajar membantu anak untuk mempunyai impian yang bersama-sama
            dicapai dengan keceriaan dan belajar yang penuh semangat.
          </p>
          <div class="hero-buttons">
            <a href="#tentang-kami" class="btn-outline">
              Tentang Kami
              <img src="/arrowdown.svg" alt="Arrow Down" class="icon" />
            </a>
            <a href="/guru" class="btn-filled">
              Guru
              <img src="/people.svg" alt="Guru Icon" class="icon" />
              <img src="/arrowguru.svg" alt="Arrow Right" class="icon arrow" />
            </a>
          </div>
        </div>
        <div class="logo-content">
          <img src="/images/logo.png" alt="Logo Siti Hajar" class="school-logo">
          <p class="akreditasi">TERAKREDITASI A</p>
        </div>
      </div>
  </section>

  <section class="visi-misi" id="tentang-kami">
    <div class="container">
      <div class="image-section" id="gambar-visi-misi">
        <!-- Gambar akan dimuat di sini -->
      </div>
      <div class="text-section" id="visi-misi-content">
        <p>Sedang memuat visi & misi...</p>
      </div>
    </div>
  </section>

  <section class="tujuan-strategi">
    <div class="container">
      <div class="text-section" id="tujuan-strategi-content">
        <p>Sedang memuat tujuan & strategi...</p>
      </div>
      <div class="image-section" id="gambar-tujuan-strategi">
        <!-- Gambar dari API akan muncul di sini -->
      </div>
    </div>
  </section>

  <section class="preview-section">
    <h2 class="preview-title">Preview</h2>

    <div class="preview-category">
      <h3>Program sekolah</h3>
      <div class="preview-gallery" id="gallery-kegiatan">
        <!-- Gambar dari API /programsekolah/gallerykegiatan akan dimuat di sini -->
      </div>
      <a href="/program-sekolah" class="preview-next">
      <img src="/arrow.svg" alt="Next" class="arrow-icon" />
      </a>
    </div>

    <div class="preview-category">
      <h3>Fasilitas & Prestasi</h3>
      <div class="preview-gallery" id="gallery-fasilitas">
        <!-- Gambar dari API /fasilitasprestasi/galleryfasilitas akan dimuat di sini -->
      </div>
      <a href="/fasilitas-prestasi" class="preview-next">
        <img src="/arrow.svg" alt="Next" class="arrow-icon" />
      </a>
    </div>
  </section>
`
// Isi konten dari API
Promise.all([
  fetchvisi(),
  fetchMisi(),
  fetchVisiMisiImage(),
  fetchTujuan(),
  fetchStrategi(),
  fetchGambarTujuan(),
  fetchGambarFasilitas(3),
  fetchGambarGaleriKegiatan(3)
])
.then(([visiberanda, misiberanda, gambarvisimisi, tujuanberanda, strategiberanda, gambartujuanstrategi, gambarFasilitas, gambarGaleriKegiatan]) => {
  // Isi ke DOM
  document.querySelector('#visi-misi-content').innerHTML = `
    ${visiberanda}
    ${misiberanda}
  `;
  document.querySelector('#tujuan-strategi-content').innerHTML = `
    ${tujuanberanda}
    ${strategiberanda}
  `;
  document.querySelector('#gambar-visi-misi').innerHTML = gambarvisimisi;
  document.querySelector('#gambar-tujuan-strategi').innerHTML = gambartujuanstrategi;
  document.querySelector('#gallery-kegiatan').innerHTML = gambarGaleriKegiatan;
  document.querySelector('#gallery-fasilitas').innerHTML = gambarFasilitas;
})
.catch(err => {
  console.error("Gagal memuat salah satu atau lebih data:", err);
  document.querySelector('#visi-misi-content').innerHTML = `<p style="color:red;">Gagal memuat visi & misi</p>`;
  document.querySelector('#gambar-visi-misi').innerHTML = `<p style="color:red;">Gagal memuat gambar</p>`;
  document.querySelector('#tujuan-strategi-content').innerHTML = `<p style="color:red;">Gagal memuat data tujuan & strategi</p>`;
  document.querySelector('#gambar-tujuan-strategi').innerHTML = `<p style="color:red;">Gagal memuat gambar</p>`;
  document.querySelector('#gallery-kegiatan').innerHTML = `<p style="color:red;">Gagal memuat galeri kegiatan</p>`;
  document.querySelector('#gallery-fasilitas').innerHTML = `<p style="color:red;">Gagal memuat galeri fasilitas</p>`;
});

initNavbarFunctionality();