import '../global.css'
import './style.css'
import logoImage from '/logo.svg'
import { createNavbarHTML,initNavbarFunctionality} from '../Component/Navbar/navbar.js'


document.querySelector('#jadwal').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'jadwal'
  })}
  <div>
    <h1>Jadwal</h1>
  </div>
`

initNavbarFunctionality();

