import './style.css'
import '../global.css'
import logoImage from '/public/logo.png'
import { createNavbarHTML,initNavbarFunctionality} from '../Component/Navbar/navbar.js'


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

initNavbarFunctionality();

