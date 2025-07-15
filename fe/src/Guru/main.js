import '../global.css';
import './style.css';
import logoImage from '/logo.svg';
import { createNavbarHTML, initNavbarFunctionality } from '../Component/Navbar/navbar.js';
import { fetchGuru } from './guru.js';
import { createFooterHTML } from '../Component/Footer/footer.js';
import { fetchWithCache } from '../cache/cache.js';

fetchWithCache('Dataguru', fetchGuru)
  .then(guruData => {
    const topGuru = guruData.slice(0, 2).map(guru => `
      <div class="guru-item">
        <div class="guru-img-box">
          <img src="${guru.img}" alt="${guru.name}" class="guru-img" />
        </div>
        <div class="guru-card">
          <div class="guru-info">
            <h3 class="guru-text">${guru.title}</h3>
            <p class="guru-text"><strong>${guru.name}</strong></p>
            <p class="guru-text">TTL : ${guru.ttl}</p>
            <p class="guru-text">Telp : ${guru.phone}</p>
          </div>
        </div>
      </div>
    `).join('');

    const scrollGuru = guruData.slice(2).map(guru => `
      <div class="guru-item guru-scroll-item">
        <div class="guru-img-box">
          <img src="${guru.img}" alt="${guru.name}" class="guru-img" />
        </div>
        <div class="guru-card">
          <div class="guru-info">
            <h3 class="guru-text">${guru.title}</h3>
            <p class="guru-text"><strong>${guru.name}</strong></p>
            <p class="guru-text">TTL : ${guru.ttl}</p>
            <p class="guru-text">Telp : ${guru.phone}</p>
          </div>
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
          <div class="guru-scroll" id="scrollContainer">
            <div class="guru-scroll-container">
              ${scrollGuru}
            </div>
          </div>
        </section>
      </main>
    `;

    initNavbarFunctionality();
    document.querySelector('#guru').innerHTML += createFooterHTML();
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
