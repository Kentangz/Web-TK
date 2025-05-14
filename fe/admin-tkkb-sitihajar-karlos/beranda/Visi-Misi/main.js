import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#visi-misi').innerHTML = `
  ${createSidebarHTML({
    activePage: 'visi-misi',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Visi dan Misi</h1>
    <p>Welcome to the Visi dan Misi page!</p>
  </div>
`;

initSidebarFunctionality();

