import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#galeri-prestasi').innerHTML = `
  ${createSidebarHTML({
    activePage: 'galeri-prestasi',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Galeri Prestasi</h1>
    <p>Welcome to the Galeri Prestasi page!</p>
  </div>
`;

initSidebarFunctionality();

