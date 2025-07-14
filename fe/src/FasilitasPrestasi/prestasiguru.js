export function fetchPrestasiGuru() {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/prestasiguru`)
    .then(respon => {
      if (!respon.ok) {
        throw new Error(`Gagal fetch: ${respon.status}`);
      }
      return respon.json();
    })
    .then(result => {
      const items = result.data;

      const listHTML = items
        .map(item => `<li class="prestasi-text-khusus">${item.prestasi_guru}</li>`)
        .join('');

      return `
        <ul>${listHTML}</ul>
      `;
    })
    .catch(error => {
      return `
        <div class="prestasi-box">
          <h2>Prestasi Guru</h2>
          <p style="color:red;">Gagal memuat data: ${error.message}</p>
        </div>
      `;
    });
}
