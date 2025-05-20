import '../global.css';
import './style.css';
import logoImage from '/logo.svg';
import { createNavbarHTML, initNavbarFunctionality } from '../Component/Navbar/navbar.js';

const guruDataTop = [
  {
    name: "Dr. Niniek Misniati, M. Pd",
    title: "Kepala Yayasan",
    ttl: "Batu, 15 April 1951",
    phone: "08813325407",
    img: "/images/guru1.jpg"
  },
  {
    name: "Puji Rahayu, S. Pd",
    title: "Kepala Sekolah",
    ttl: "Malang, 20 Maret 1977",
    phone: "085784433206",
    img: "/images/guru1.jpg"
  }
];

const guruDataScrollable = [
  {
    name: "Nanik Ferbrianti, S. Psi",
    title: "Guru Kelompok B",
    ttl: "Pasuruan, 08 Mei 1979",
    phone: "081553591877",
    img: "/images/guru1.jpg"
  },
  {
    name: "Renny Djulijana, S. Pd",
    title: "Guru Kelompok Bermain",
    ttl: "Malang, 23 Juli 1966",
    phone: "082132765432",
    img: "/images/guru1.jpg"
  },
  {
    name: "Renny Djulijana, S. Pd",
    title: "Guru Kelompok Bermain",
    ttl: "Malang, 23 Juli 1966",
    phone: "082132765432",
    img: "/images/guru1.jpg"
  },
  {
    name: "Renny Djulijana, S. Pd",
    title: "Guru Kelompok Bermain",
    ttl: "Malang, 23 Juli 1966",
    phone: "082132765432",
    img: "/images/guru1.jpg"
  },
];

function generateGuruCard(guru) {
  return `
    <div class="guru-card">
      <img src="${guru.img}" alt="${guru.name}" class="guru-img" />
      <div class="guru-info">
        <h3>${guru.title}</h3>
        <p><strong>${guru.name}</strong></p>
        <p>TTL : ${guru.ttl}</p>
        <p>Telp : ${guru.phone}</p>
      </div>
    </div>
  `;
}

const topGuruHTML = guruDataTop.map(generateGuruCard).join('');
const scrollableGuruHTML = guruDataScrollable.map(generateGuruCard).join('');
const pageContent = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'guru'
  })}
  <main class="guru-page">
    <h1 class="judul-guru">DAFTAR GURU</h1>
    <section class="guru-top">
      ${topGuruHTML}
    </section>
    <section class="guru-scroll-wrapper">
      <button class="scroll-btn left" id="scrollLeft">&#8592;</button>
      <div class="guru-scroll" id="scrollContainer">
        <div class="guru-scroll-container">
          ${scrollableGuruHTML}
        </div>
      </div>
      <button class="scroll-btn right" id="scrollRight">&#8594;</button>
    </section>
  </main>
`;

document.querySelector('#guru').innerHTML = pageContent;
initNavbarFunctionality();

document.getElementById('scrollLeft').addEventListener('click', () => {
  document.getElementById('scrollContainer').scrollBy({
    left: -300,
    behavior: 'smooth'
  });
});

document.getElementById('scrollRight').addEventListener('click', () => {
  document.getElementById('scrollContainer').scrollBy({
    left: 300,
    behavior: 'smooth'
  });
});