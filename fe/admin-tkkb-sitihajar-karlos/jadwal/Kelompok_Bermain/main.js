import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#kelompok-bermain').innerHTML = `
  ${createSidebarHTML({
    activePage: 'kelompok-bermain',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Kelompok Bermain</h1>
    <p>Welcome to the Kelompok Bermain page!</p>
  </div>
`;

initSidebarFunctionality();

