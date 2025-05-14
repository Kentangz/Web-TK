import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#fasilitas').innerHTML = `
  ${createSidebarHTML({
    activePage: 'fasilitas',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Fasilitas</h1>
    <p>Welcome to the Fasilitas page!</p>
    <p>testing testing testing testing testing testing testing testing</p>
  </div>
`;

initSidebarFunctionality();

