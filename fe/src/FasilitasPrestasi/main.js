import '../global.css'
import './style.css'
import logoImage from '/logo.svg'
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

