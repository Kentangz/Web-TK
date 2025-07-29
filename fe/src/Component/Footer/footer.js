import './style.css';

export function createFooterHTML() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="footer-section">
        <i class="fa-regular social-icon fa-copyright"></i>
        <div>
          <p class="footer-label">COPYRIGHT</p>
          <p>All Rights Reserved &copy; ${year}</p>
        </div>
      </div>

      <div class="footer-section center">
        <div class="footer-brand">
          <img src="/logo.svg" alt="Logo Sekolah" class="footer-logo" />
          <p class="footer-school-name">TK & KB SITI HAJAR</p>
        </div>
      </div>

      <div class="footer-section right">
        <a href="#"><i class="fab fa-facebook-f social-icon facebook"></i></a>
        <a href="#"><i class="fab fa-twitter social-icon twitter"></i></a>
        <a href="https://www.instagram.com/bundasitihajarkarangploso?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram social-icon instagram"></i></a>
        <a href="https://youtube.com/@sitihajarkarlos9935?si=sR5RmNJAYS4N7HDV" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube social-icon youtube"></i></a>
      </div>
    </footer>
  `;
}
