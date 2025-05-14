import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#gallery-beranda').innerHTML = `
  ${createSidebarHTML({
    activePage: 'gallery-beranda',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Gallery Beranda</h1>
    <p>Welcome to the Gallery Beranda page!</p>
  </div>
`;

initSidebarFunctionality();

