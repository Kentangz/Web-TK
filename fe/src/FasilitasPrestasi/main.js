import './style.css'
import '../global.css'
import logoImage from '/public/logo.png'
import { createNavbarHTML,initNavbarFunctionality} from '../Component/Navbar/navbar.js'


document.querySelector('#fasilitas-prestasi').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'fasilitas-prestasi'
  })}
  <div>
    <h1>Fasilitas & prestasi</h1>
  </div>
`

initNavbarFunctionality();

