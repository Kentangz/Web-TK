import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#jadwal-a-b').innerHTML = `
  ${createSidebarHTML({
    activePage: 'jadwal-a-b',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Jadwal A-B</h1>
    <p>Welcome to the Jadwal A-B page!</p>
  </div>
`;

initSidebarFunctionality();

