import './style.css'
import '../global.css'
import logoImage from '/logo.svg'
import { createNavbarHTML,initNavbarFunctionality} from '../Component/Navbar/navbar.js'
import { createFooterHTML } from '../Component/Footer/footer.js';


document.querySelector('#pendaftaran').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'pendaftaran'
  })}
  <div>
    <h1>Pendaftaran</h1>
  </div>
`
document.querySelector('#pendaftaran').innerHTML += createFooterHTML();
initNavbarFunctionality();

