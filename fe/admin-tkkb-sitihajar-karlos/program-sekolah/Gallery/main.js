import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#galeri-kegiatan').innerHTML = `
  ${createSidebarHTML({
    activePage: 'galeri-kegiatan',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Gallery Kegiatan</h1>
    <p>Welcome to the Gallery Kegiatan page!</p>
  </div>
`;

initSidebarFunctionality();

