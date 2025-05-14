import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#kurikulum-plus').innerHTML = `
  ${createSidebarHTML({
    activePage: 'kurikulum-plus',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Kurikulum Plus</h1>
    <p>Welcome to the Kurikulum Plus page!</p>
  </div>
`;

initSidebarFunctionality();

