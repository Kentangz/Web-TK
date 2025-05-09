import '../global.css'
import './style.css';
import { createSidebarHTML, initSidebarFunctionality } from '../Component/Sidebar/sidebar.js';

document.querySelector('#dashboard').innerHTML = `
  ${createSidebarHTML('dashboard')}
  <div class="main-content">
    <h1>Dashboard</h1>
    <p>Welcome to the dashboard!</p>
  </div>
`;

initSidebarFunctionality();
