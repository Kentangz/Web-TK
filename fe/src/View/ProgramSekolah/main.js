//import './style.css'
import logoImage from '/Component/assets/logo.png'

import { createNavbarHTML,initNavbarFunctionality } from '../../../Component/Navbar/navbar'

document.querySelector('#program-sekolah').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'program-sekolah'
  })}
  <div>
  <p>ini progam sekolah</p>
  </div>
`
initNavbarFunctionality();