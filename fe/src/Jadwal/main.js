import '../global.css'
import './style.css'
import logoImage from '/logo.svg'
import iconcup from '/cup.svg'
import iconbread from '/bread.svg'
import iconbowl from '/bowl.svg'
import iconcandy from '/candy.svg'
import iconmoney from '/money.svg'
import iconmoon from '/moon.svg'
import { createNavbarHTML, initNavbarFunctionality } from '../Component/Navbar/navbar.js'

document.querySelector('#jadwal').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'jadwal'
  })}

  <section class="jadwal-section">
    <div class="jadwal-kelompok-ab">
      <h1>JADWAL KELOMPOK A & B</h1>
      <p>Senin - Kamis = 07.15 - 11.00 WIB<br>Jum’at = 07.15 - 10.30 WIB</p>
      <ul class="jadwal-list">
      <li><img src="${iconcup}" /> Setiap hari ananda wajib membawa air minum (bukan susu kotak atau minuman dalam kemasan).</li>
      <li><img src="${iconbread}" /> Hari senin, rabu, jum’at mendapatkan kue dari sekolah.</li>
      <li><img src="${iconbowl}" /> Hari selasa & kamis ananda wajib membawa bekal nasi, sayur, dan lauk.</li>
      <li><img src="${iconcandy}" /> Ananda tidak diperkenankan membawa candy dari rumah.</li>
      <li><img src="${iconmoney}" /> Hari kamis ananda wajib mengisi kotak amal di sekolah (untuk melatih ananda terbiasa bersedekah dan peduli dengan orang yang membutuhkan).</li>
      <li><img src="${iconmoon}" /> Hari jum’at ananda wajib membawa alat sholat untuk sholat bersama di sekolah.</li>
    </ul>
    </div>

    <div class="jadwal-kelompok-kb">
      <h1>JADWAL KELOMPOK BERMAIN (KB)</h1>
      <p>Senin - Kamis = 07.15 - 10.00 WIB</p>
      <ul class="jadwal-list">
        <li><img src="${iconcup}" /> Setiap hari ananda wajib membawa air minum (bukan susu kotak atau minuman dalam kemasan).</li>
        <li><img src="${iconbread}" /> Hari senin & rabu mendapatkan kue dari sekolah.</li>
        <li><img src="${iconbowl}" /> Hari selasa & kamis ananda wajib membawa bekal nasi, sayur, dan lauk.</li>
        <li><img src="${iconcandy}" /> Ananda tidak diperkenankan membawa candy dari rumah.</li>
        <li><img src="${iconmoney}" /> Hari kamis ananda wajib mengisi kotak amal di sekolah (untuk melatih ananda terbiasa bersedekah dan peduli dengan orang yang membutuhkan).</li>
        <li><img src="${iconmoon}" /> Hari kamis ananda wajib membawa alat sholat untuk sholat bersama di sekolah.</li>
      </ul>
    </div>
  </section>
`
initNavbarFunctionality()
