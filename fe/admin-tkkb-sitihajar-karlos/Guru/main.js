import '../global.css'
import './style.css';
import { createSidebarHTML, initSidebarFunctionality } from '../Component/Sidebar/sidebar';

document.querySelector('#guru').innerHTML = `
  ${createSidebarHTML({
    activePage: 'guru',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Guru</h1>
    <p>Welcome to the Guru!</p>
  </div>
`;

initSidebarFunctionality();
