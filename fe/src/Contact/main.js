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
import { createFooterHTML } from '../Component/Footer/footer.js'
import { fetchWithCache } from '../cache/cache.js'
import { initScrollAnimations } from '../Component/animasi/animasiscroll.js'

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
        <div class="contact-item scroll-animate">
          <img src="${iconPhone}" alt="Phone Icon" />
          <div class="contact-text">
            <strong>Contact Person :</strong>
            <span id="contact-person">
              <div class="loader"></div>
            </span>
          </div>
        </div>

        <div class="contact-item scroll-animate">
          <img src="${iconEmail}" alt="Email Icon" />
          <div class="contact-text">
            <strong>Email :</strong>
            <span id="contact-email">
              <div class="loader"></div>
            </span>
          </div>
        </div>

        <div class="contact-item scroll-animate">
          <img src="${iconInstagram}" alt="Instagram Icon" />
          <div class="contact-text">
            <strong>Instagram :</strong>
            <span id="contact-instagram">
              <div class="loader"></div>
            </span>
          </div>
        </div>

        <div class="contact-item scroll-animate">
          <img src="${iconLocation}" alt="Location Icon" />
          <div class="contact-text">
            <strong>Alamat :</strong>
            <span id="contact-address">
              <div class="loader"></div>
            </span>
          </div>
        </div>
      </div>
      <div class="contact-map-wrapper">
        <div class="contact-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.9565489799265!2d112.59119647536684!3d-7.8996085921233625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7881bf0f69033f%3A0x7ce831bb01b01cb2!2sPAUD%20TERPADU%20SITI%20HAJAR!5e0!3m2!1sid!2sid!4v1747291106600!5m2!1sid!2sid"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  </section>
`;
document.querySelector('#contact').innerHTML += createFooterHTML();
initNavbarFunctionality();

// CONTACT PERSON
fetchWithCache('contactperson', fetchContactPerson)
  .then(data => {
    document.getElementById('contact-person').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('contact-person').textContent = 'Gagal memuat';
  });

// EMAIL
fetchWithCache('email', fetchEmail)
  .then(data => {
    document.getElementById('contact-email').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('contact-email').textContent = 'Gagal memuat';
  });

// INSTAGRAM
fetchWithCache('instagram', fetchInstagram)
  .then(data => {
    document.getElementById('contact-instagram').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('contact-instagram').textContent = 'Gagal memuat';
  });

// ALAMAT
fetchWithCache('alamat', fetchAlamat)
  .then(data => {
    document.getElementById('contact-address').innerHTML = data;
  })
  .catch(() => {
    document.getElementById('contact-address').textContent = 'Gagal memuat';
  });

initScrollAnimations();


