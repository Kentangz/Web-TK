import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#tujuan-strategi').innerHTML = `
  ${createSidebarHTML({
    activePage: 'tujuan-strategi',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Tujuan dan Strategi</h1>
    <p>Welcome to the Tujuan dan Strategi page!</p>
  </div>
`;

initSidebarFunctionality();

