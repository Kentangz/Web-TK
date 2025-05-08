import '../global.css'
import './style.css'
import logoImage from '/logo.svg'
import { createNavbarHTML,initNavbarFunctionality} from '../Component/Navbar/navbar.js'


document.querySelector('#beranda').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'beranda'
  })}
  <div>
    <h1>Beranda</h1>
  </div>
`

initNavbarFunctionality();

