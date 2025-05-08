import '../global.css'
import './style.css'
import logoImage from '/logo.svg'
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

