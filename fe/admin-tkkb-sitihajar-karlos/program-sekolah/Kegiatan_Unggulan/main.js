import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#kegiatan-unggulan').innerHTML = `
  ${createSidebarHTML({
    activePage: 'kegiatan-unggulan',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Kegiatan Unggulan</h1>
    <p>Welcome to the Kegiatan Unggulan page!</p>
  </div>
`;

initSidebarFunctionality();

