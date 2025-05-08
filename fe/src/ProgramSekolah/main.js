import '../global.css'
import './style.css'
import logoImage from '/public/logo.png'

import { createNavbarHTML,initNavbarFunctionality } from '../Component/Navbar/navbar'

document.querySelector('#program-sekolah').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'program-sekolah'
  })}
  <div>
  <h1>Progam Sekolah</h1>
  </div>
`
initNavbarFunctionality();