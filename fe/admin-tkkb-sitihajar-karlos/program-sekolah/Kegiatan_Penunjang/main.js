import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#kegiatan-penunjang').innerHTML = `
  ${createSidebarHTML({
    activePage: 'kegiatan-penunjang',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Kegiatan Penunjang</h1>
    <p>Welcome to the Kegiatan Penunjang page!</p>
  </div>
`;

initSidebarFunctionality();

