import '../global.css';
import './style.css';
import logoImage from '/logo.svg';
import { createNavbarHTML, initNavbarFunctionality } from '../Component/Navbar/navbar.js';
import { fetchGuru } from './guru.js';
import { createFooterHTML } from '../Component/Footer/footer.js';

fetchGuru()
  .then(guruData => {
    const topGuru = guruData.slice(0, 2).map(guru => `
      <div class="guru-card">
        <img src="${guru.img}" alt="${guru.name}" class="guru-img" />
        <div class="guru-info">
          <h3>${guru.title}</h3>
          <p><strong>${guru.name}</strong></p>
          <p>TTL : ${guru.ttl}</p>
          <p>Telp : ${guru.phone}</p>
        </div>
      </div>
    `).join('');

    const scrollGuru = guruData.slice(2).map(guru => `
      <div class="guru-card">
        <img src="${guru.img}" alt="${guru.name}" class="guru-img" />
        <div class="guru-info">
          <h3>${guru.title}</h3>
          <p><strong>${guru.name}</strong></p>
          <p>TTL : ${guru.ttl}</p>
          <p>Telp : ${guru.phone}</p>
        </div>
      </div>
    `).join('');

    document.querySelector('#guru').innerHTML = `
      ${createNavbarHTML({
        logoSrc: logoImage,
        schoolName: 'TK & KB SITI HAJAR',
        activePage: 'guru'
      })}
      <main class="guru-page">
        <h1 class="judul-guru">DAFTAR GURU</h1>
        <section class="guru-top">
          ${topGuru}
        </section>
        <section class="guru-scroll-wrapper">
          <button class="scroll-btn left" id="scrollLeft"><img src="/arrowback.svg" alt="Scroll Left" class="scroll-icon" /></button>
          <div class="guru-scroll" id="scrollContainer">
            <div class="guru-scroll-container">
              ${scrollGuru}
            </div>
          </div>
          <button class="scroll-btn right" id="scrollRight"><img src="/arrow.svg" alt="Scroll Left" class="scroll-icon" /></button>
        </section>
      </main>
    `;

    document.querySelector('#guru').innerHTML += createFooterHTML();
    // Scroll tombol
    document.getElementById('scrollLeft').addEventListener('click', () => {
      document.getElementById('scrollContainer').scrollBy({ left: -300, behavior: 'smooth' });
    });
    document.getElementById('scrollRight').addEventListener('click', () => {
      document.getElementById('scrollContainer').scrollBy({ left: 300, behavior: 'smooth' });
    });

    initNavbarFunctionality();
  })
  .catch(err => {
    console.error('Gagal memuat data guru:', err);
    document.querySelector('#guru').innerHTML = `
      ${createNavbarHTML({
        logoSrc: logoImage,
        schoolName: 'TK & KB SITI HAJAR',
        activePage: 'guru'
      })}
      <main class="guru-page">
        <h1 class="judul-guru">DAFTAR GURU</h1>
        <p style="color:red;">Gagal memuat data guru</p>
      </main>
    `;
    initNavbarFunctionality();
  });
