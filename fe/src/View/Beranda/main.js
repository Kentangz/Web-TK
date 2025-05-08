//import './style.css'
import logoImage from '/Component/assets/logo.png'
import { createNavbarHTML,initNavbarFunctionality} from '/Component/Navbar/navbar.js'

// Import components
import { setupCounter } from './counter.js'
import { createNavbarHTML,initNavbarFunctionality} from '/Component/navbar.js'

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

