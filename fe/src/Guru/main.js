import './style.css'
import '../global.css'
import logoImage from '/public/logo.png'
import { createNavbarHTML,initNavbarFunctionality} from '../Component/Navbar/navbar.js'


document.querySelector('#guru').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'guru'
  })}
  <div>
    <h1>Guru</h1>
  </div>
`

initNavbarFunctionality();

