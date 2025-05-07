// Import styles and assets
//import './style.css'
import logoImage from '/Component/assets/logo.png'
import { createNavbarHTML,initNavbarFunctionality} from '/Component/Navbar/navbar.js'


document.querySelector('#beranda').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'beranda'
  })}
  <div>
    <h1>HI</h1>
  </div>
`

initNavbarFunctionality();

