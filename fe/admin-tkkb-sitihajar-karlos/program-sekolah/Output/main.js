import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#output').innerHTML = `
  ${createSidebarHTML({
    activePage: 'output',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <h1>Output</h1>
    <p>Welcome to the Output page!</p>
  </div>
`;

initSidebarFunctionality();

