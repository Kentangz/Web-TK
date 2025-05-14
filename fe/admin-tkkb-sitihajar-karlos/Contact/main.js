import '../global.css'
import './style.css';
import { createSidebarHTML, initSidebarFunctionality } from '../Component/Sidebar/sidebar';

document.querySelector('#contact').innerHTML = `
  ${createSidebarHTML({
    activePage: 'contact',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Contact</h1>
    <p>Welcome to the Contact page!</p>
  </div>
`;

initSidebarFunctionality();
