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
import { fetchGambarGaleriKegiatanPreview } from '../ProgramSekolah/gambargalerikegiatan.js';
import { fetchGambarFasilitas } from '../FasilitasPrestasi/galerifasilitas.js';
import { createFooterHTML } from '../Component/Footer/footer.js';
import { initScrollAnimations } from '../Component/animasi/animasiscroll.js'
import { fetchWithCache } from '../cache/cache.js'

document.querySelector('#beranda').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'beranda'
  })}
  <section class="hero">
    <div class="hero-content scroll-animate">
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

  <section class="visi-misi scroll-animate" id="tentang-kami">
    <div class="container">
      <div class="image-section scroll-animate" id="gambar-visi-misi">
        <div class="loader"></div>
      </div>
      <div class="text-section scroll-animate" id="visi-misi-content">
      </div>
    </div>
  </section>

  <section class="tujuan-strategi scroll-animate">
    <div class="container">
      <div class="text-section scroll-animate" id="tujuan-strategi-content">
      </div>
      <div class="image-section scroll-animate" id="gambar-tujuan-strategi">
        <div class="loader"></div>
      </div>
    </div>
  </section>

  <section class="preview-section scroll-animate">
    <div class = "container">
      <h2 class="preview-title">Preview</h2>
      <div class="preview-category scroll-animate">
        <h3>Program sekolah</h3>
        <div class="preview-gallery" id="gallery-kegiatan">
          <div class="loader"></div>
        </div>
        <a href="/program-sekolah" class="preview-next">
        <img src="/arrow.svg" alt="Next" class="arrow-icon" />
        </a>
      </div>
      <div class="preview-category scroll-animate">
        <h3>Fasilitas & Prestasi</h3>
        <div class="preview-gallery" id="gallery-fasilitas">
          <div class="loader"></div>
        </div>
        <a href="/fasilitas-prestasi" class="preview-next">
          <img src="/arrow.svg" alt="Next" class="arrow-icon" />
        </a>
      </div>
    </div>
  </section>
`
document.querySelector('#beranda').innerHTML += createFooterHTML();
// Isi konten dari API
initNavbarFunctionality();
initScrollAnimations();
// VISI
fetchWithCache('visi', fetchvisi)
  .then(data => {
    document.querySelector('#visi-misi-content').innerHTML += data;
  })
  .catch(() => {
    document.querySelector('#visi-misi-content').innerHTML += `<p style="color:red;">Gagal memuat visi</p>`;
  });

// MISI
fetchWithCache('misi', fetchMisi)
  .then(data => {
    document.querySelector('#visi-misi-content').innerHTML += data;
  })
  .catch(() => {
    document.querySelector('#visi-misi-content').innerHTML += `<p style="color:red;">Gagal memuat misi</p>`;
  });

// GAMBAR VISI MISI
fetchWithCache('gambarVisiMisi', fetchVisiMisiImage)
  .then(data => {
    document.querySelector('#gambar-visi-misi').innerHTML = data;
  })
  .catch(() => {
    document.querySelector('#gambar-visi-misi').innerHTML = `<p style="color:red;">Gagal memuat gambar</p>`;
  });

// TUJUAN
fetchWithCache('tujuan', fetchTujuan)
  .then(data => {
    document.querySelector('#tujuan-strategi-content').innerHTML += data;
  })
  .catch(() => {
    document.querySelector('#tujuan-strategi-content').innerHTML += `<p style="color:red;">Gagal memuat tujuan</p>`;
  });

// STRATEGI
fetchWithCache('strategi', fetchStrategi)
  .then(data => {
    document.querySelector('#tujuan-strategi-content').innerHTML += data;
  })
  .catch(() => {
    document.querySelector('#tujuan-strategi-content').innerHTML += `<p style="color:red;">Gagal memuat strategi</p>`;
  });

// GAMBAR TUJUAN
fetchWithCache('gambarTujuan', fetchGambarTujuan)
  .then(data => {
    document.querySelector('#gambar-tujuan-strategi').innerHTML = data;
  })
  .catch(() => {
    document.querySelector('#gambar-tujuan-strategi').innerHTML = `<p style="color:red;">Gagal memuat gambar tujuan</p>`;
  });

// GALERI KEGIATAN
fetchWithCache('gambarGaleriKegiatan', () => fetchGambarGaleriKegiatanPreview(3))
  .then(data => {
    document.querySelector('#gallery-kegiatan').innerHTML = data;
  })
  .catch(() => {
    document.querySelector('#gallery-kegiatan').innerHTML = `<p style="color:red;">Gagal memuat galeri kegiatan</p>`;
  });

// GALERI FASILITAS
fetchWithCache('gambarFasilitas', () => fetchGambarFasilitas(3))
  .then(data => {
    document.querySelector('#gallery-fasilitas').innerHTML = data;
  })
  .catch(() => {
    document.querySelector('#gallery-fasilitas').innerHTML = `<p style="color:red;">Gagal memuat galeri fasilitas</p>`;
  });
