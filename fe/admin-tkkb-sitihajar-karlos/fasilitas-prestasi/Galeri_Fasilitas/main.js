import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#galeri-fasilitas').innerHTML = `
  ${createSidebarHTML({
    activePage: 'galeri-fasilitas',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Galeri Fasilitas</h1>
    <p>Welcome to the Galeri Fasilitas page!</p>
  </div>
`;

initSidebarFunctionality();

