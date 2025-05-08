import './style.css'
import '../global.css'
import logoImage from '/public/logo.png'
import { createNavbarHTML,initNavbarFunctionality} from '../Component/Navbar/navbar.js'


document.querySelector('#contact').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'contact'
  })}
  <div>
    <h1>Contact</h1>
  </div>
`

initNavbarFunctionality();

