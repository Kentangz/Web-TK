export function createFooterHTML() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="footer-section">
        <img src="/copyright.svg" alt="Copyright" class="footer-icon" />
        <div>
          <p class="footer-label">COPYRIGHT</p>
          <p>All Rights Reserved &copy; ${year}</p>
        </div>
      </div>

      <div class="footer-section center">
        <img src="/logo.svg" alt="Logo Sekolah" class="footer-logo" />
        <p class="footer-school-name">TK & KB SITI HAJAR</p>
      </div>

      <div class="footer-section right">
        <a href="#"><img src="/facebook.svg" alt="Facebook" class="social-icon" /></a>
        <a href="#"><img src="/twitter.svg" alt="Twitter" class="social-icon" /></a>
        <a href="#"><img src="/instagram.svg" alt="Instagram" class="social-icon active" /></a>
        <a href="#"><img src="/youtube.svg" alt="YouTube" class="social-icon" /></a>
      </div>
    </footer>
  `;
}
