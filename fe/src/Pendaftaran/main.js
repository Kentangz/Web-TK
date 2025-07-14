import './style.css';
import '../global.css';
import './web.css';
import logoImage from '/logo.svg';
import { createNavbarHTML, initNavbarFunctionality } from '../Component/Navbar/navbar.js';
import { createFooterHTML } from '../Component/Footer/footer.js';
import { createFormPendaftaranHTML } from './formpendaftaran.js';
import { handlePendaftaranSubmit } from './pendaftaranhandler.js';

document.querySelector('#pendaftaran').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'pendaftaran'
  })}
  <main class="pendaftaran-container">
     <!-- Popup metode pendaftaran -->
    <div id="popupPilihMetode" class="popup-container">
      <div class="popup-box">
        <h3>Isi Formulir Pendaftaran</h3>
        <p>Secara Digital atau Manual?</p>
        <div class="popup-buttons">
          <button id="btnDigital" class="btn-pdf">
            Digital <i class="fas fa-mobile-alt"></i>
          </button>
          <button id="btnManual" class="btn-pdf">
            Manual <i class="fas fa-pen"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Formulir akan muncul setelah memilih metode -->
    <div id="formContainer">
      ${createFormPendaftaranHTML()}
    </div>
  </main>
  ${createFooterHTML()}
`;

initNavbarFunctionality();

document.getElementById('formPendaftaran').addEventListener('submit', handlePendaftaranSubmit);

const btnDigital = document.getElementById('btnDigital');
const btnManual = document.getElementById('btnManual');
const popup = document.getElementById('popupPilihMetode');

if (popup) {
  
  document.body.classList.add('no-scroll');
}

if (btnDigital && popup) {
  btnDigital.addEventListener('click', () => {
    popup.style.display = 'none';
    document.body.classList.remove('no-scroll'); 
  });
}

if (btnManual && popup) {
  btnManual.addEventListener('click', () => {
    popup.style.display = 'none';
    document.body.classList.remove('no-scroll'); 

    
    setTimeout(() => {
      const target = document.getElementById('scrollToUnduh');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.focus(); 
      }
    }, 300);
  });
}



// document.getElementById('btnManual').addEventListener('click', () => {
//   window.open('Formulir_manual.pdf', '_blank');
// });