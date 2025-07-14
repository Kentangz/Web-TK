export function fetchAlamat() {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/alamat`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data alamat. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const data = result.data;

      if (Array.isArray(data) && data.length > 0 && data[0].alamat) {
        return `
          <div class="contact-text">
            <span>${data[0].alamat}</span>
          </div>
        `;
      } else {
        throw new Error("Data alamat tidak ditemukan atau format tidak valid");
      }
    })
    .catch(error => {
      console.error("Kesalahan fetchAlamat:", error);
      return `<p class="contact-text" style="color:red;">Gagal memuat contact person</p>`;
    });
}
