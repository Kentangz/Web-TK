export function fetchFasilitas() {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/fasilitas`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal memuat data: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const data = result.data;

      if (!Array.isArray(data)) {
        throw new Error("Data fasilitas tidak valid");
      }

      const listItems = data.map(item =>
        `<li class="fasilitas-text">${item.fasilitas_name}</li>`
      ).join('');

      return `
        <h3>Fasilitas Lainnya :</h3>
        <ul>
          ${listItems}
        </ul>
      `;
    })
    .catch(error => {
      return `<p style="color:red;">Terjadi kesalahan saat memuat fasilitas: ${error.message}</p>`;
    });
}
