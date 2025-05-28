import '../global.css'
import './style.css'
import logoImage from '/logo.svg'
import iconPhone from '/telephone.svg'
import iconEmail from '/email.svg'
import iconInstagram from '/instagram.svg'
import iconLocation from '/maps.svg'
import { createNavbarHTML,initNavbarFunctionality} from '../Component/Navbar/navbar.js'
import { fetchContactPerson } from './contactperson.js'
import { fetchEmail } from './email.js'
import { fetchInstagram } from './instagram.js'
import { fetchAlamat } from './alamat.js'
import { createFooterHTML } from '../Component/Footer/footer.js';


document.querySelector('#contact').innerHTML = `
  ${createNavbarHTML({
    logoSrc: logoImage,
    schoolName: 'TK & KB SITI HAJAR',
    activePage: 'contact'
  })}

  <section class="contact-section">
    <h1>KONTAK KAMI</h1>
    <div class="contact-content">
      <div class="contact-info">
        <div class="contact-item">
          <img src="${iconPhone}" alt="Phone Icon" />
          <div class="contact-text">
            <strong>Contact Person :</strong>
            <span id="contact-person">Memuat...</span>
          </div>
        </div>

        <div class="contact-item">
          <img src="${iconEmail}" alt="Email Icon" />
          <div class="contact-text">
            <strong>Email :</strong>
            <span id="contact-email">Memuat...</span>
          </div>
        </div>

        <div class="contact-item">
          <img src="${iconInstagram}" alt="Instagram Icon" />
          <div class="contact-text">
            <strong>Instagram :</strong>
            <span id="contact-instagram">Memuat...</span>
          </div>
        </div>

        <div class="contact-item">
          <img src="${iconLocation}" alt="Location Icon" />
          <div class="contact-text">
            <strong>Alamat :</strong>
            <span id="contact-address">Memuat...</span>
          </div>
        </div>

      </div>

      <div class="contact-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.9565489799265!2d112.59119647536684!3d-7.8996085921233625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7881bf0f69033f%3A0x7ce831bb01b01cb2!2sPAUD%20TERPADU%20SITI%20HAJAR!5e0!3m2!1sid!2sid!4v1747291106600!5m2!1sid!2sid"
          width="600"
          height="450"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  </section>
`;
document.querySelector('#contact').innerHTML += createFooterHTML();

Promise.all([
  fetchContactPerson(),
  fetchEmail(),
  fetchInstagram(),
  fetchAlamat()
])
.then(([contactPerson, email, instagram, alamat]) => {
  document.getElementById('contact-person').textContent = contactPerson;
  document.getElementById('contact-email').textContent = email;
  document.getElementById('contact-instagram').textContent = instagram;
  document.getElementById('contact-address').textContent = alamat;
})
.catch(error => {
  console.error("Gagal memuat data kontak:", error);
  document.getElementById('contact-person').textContent = 'Gagal memuat';
  document.getElementById('contact-email').textContent = 'Gagal memuat';
  document.getElementById('contact-instagram').textContent = 'Gagal memuat';
  document.getElementById('contact-address').textContent = 'Gagal memuat';
});

Promise.all([
  fetchContactPerson(),
  fetchEmail(),
  fetchInstagram(),
  fetchAlamat()
])
.then(([contactPerson, email, instagram, alamat]) => {
  document.getElementById('contact-person').textContent = contactPerson;
  document.getElementById('contact-email').textContent = email;
  document.getElementById('contact-instagram').textContent = instagram;
  document.getElementById('contact-address').textContent = alamat;
})
.catch(error => {
  console.error("Gagal memuat data kontak:", error);
  document.getElementById('contact-person').textContent = 'Gagal memuat';
  document.getElementById('contact-email').textContent = 'Gagal memuat';
  document.getElementById('contact-instagram').textContent = 'Gagal memuat';
  document.getElementById('contact-address').textContent = 'Gagal memuat';
});

initNavbarFunctionality();

