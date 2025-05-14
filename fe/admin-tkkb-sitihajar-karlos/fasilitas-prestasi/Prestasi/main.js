import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#prestasi').innerHTML = `
  ${createSidebarHTML({
    activePage: 'prestasi',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Prestasi</h1>
    <p>Welcome to the Prestasi page!</p>
  </div>
`;

initSidebarFunctionality();

