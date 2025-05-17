import '../global.css'
import './style.css'
import logoImage from '/logo.svg'
import { createNavbarHTML,initNavbarFunctionality} from '../Component/Navbar/navbar.js'


document.querySelector('#fasilitas-prestasi').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'fasilitas-prestasi'
  })}
  
  <section class="fasilitas-section">
    <h1 class="judul">FASILITAS KAMI</h1>
    <div class="fasilitas-container">
      <div class="fasilitas-list">
        <h3>Fasilitas Lainnya :</h3>
        <ul>
          <li>Kelas KB</li>
          <li>Kelas TK A1 dan TK A2</li>
          <li>Kelas TK B1 dan TK B2</li>
          <li>Playground</li>
          <li>Alat-alat Ekstrakurikuler</li>
          <li>Gudang Sekolah</li>
          <li>Tempat Wudhu</li>
          <li>Kamar Mandi / WC</li>
          <li>Lapangan</li>
          <li>Ruang Guru</li>
        </ul>
      </div>
      <div class="fasilitas-gallery">
        <div class="gallery-box">
          <div class="gallery-item"><img src="/images/fasilitas1.png" alt="Fasilitas 1" /></div>
          <div class="gallery-item"><img src="/images/fasilitas2.png" alt="Fasilitas 2" /></div>
          <div class="gallery-item"><img src="/images/fasilitas3.png" alt="Fasilitas 3" /></div>
          <div class="gallery-item"><img src="/images/fasilitas4.png" alt="Fasilitas 4" /></div>
          <div class="gallery-item"><img src="/images/fasilitas5.png" alt="Fasilitas 5" /></div>
          <div class="gallery-item"><img src="/images/fasilitas6.png" alt="Fasilitas 6" /></div>
          <div class="gallery-item"><img src="/images/fasilitas7.png" alt="Fasilitas 7" /></div>
          <div class="gallery-item"><img src="/images/fasilitas8.png" alt="Fasilitas 8" /></div>
        </div>
      </div>
    </div>
  </section>

  <section class="prestasi-section">
    <h1 class="judul">DAFTAR PRESTASI</h1>
    <div class="prestasi-container">
      <div class="prestasi-box">
        <h2>Prestasi Guru</h2>
        <ul>
          <li>Lomba Inovasi Guru Kab. Malang Juara 3</li>
          <li>Porseni Jawa Timur Pembelajar</li>
        </ul>
      </div>
      <div class="prestasi-box">
        <h2>Prestasi Siswa</h2>
        <ul>
          <li>Lomba Hari Anak Nasional Juara Harapan 3 Menyanyi Tunggal</li>
          <li>Lomba Hari Anak Nasional Juara 1</li>
          <li>Festival Kolase Eco Green Park Juara 1</li>
          <li>Festival Kolase Eco Green Park Juara 3</li>
          <li>Lomba Hari Anak Nasional Juara 1</li>
          <li>3M (Melipat, Menggunting, Menempel)</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="galeri-section">
    <h1 class="judul">GALERI</h1>
    <div class="galeri-grid">
      <div class="galeri-item"><img src="/images/foto 1.jpg" alt="Galeri 1"></div>
      <div class="galeri-item"><img src="/images/foto 2.jpg" alt="Galeri 2"></div>
      <div class="galeri-item"><img src="/images/foto 3.jpg" alt="Galeri 3"></div>
      <div class="galeri-item"><img src="/images/foto 4.jpg" alt="Galeri 4"></div>
      <div class="galeri-item"><img src="/images/foto 5.jpg" alt="Galeri 5"></div>
      <div class="galeri-item"><img src="/images/foto 6.jpg" alt="Galeri 6"></div>
      <div class="galeri-item"><img src="/images/foto 7.jpg" alt="Galeri 7"></div>
      <div class="galeri-item"><img src="/images/foto 8.jpg" alt="Galeri "></div>
    </div>
  </section>

`

initNavbarFunctionality();

