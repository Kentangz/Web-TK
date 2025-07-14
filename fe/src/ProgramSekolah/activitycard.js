export function fetchActivityCards() {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kegiatanunggulan`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Gagal mengambil data activity card');
      }
      return response.json();
    })
    .then(responseData => {
      const items = responseData.data; 
      if (!Array.isArray(items) || items.length === 0) {
        throw new Error('Data activity card kosong');
      }

      return items.map(card => {
        const icon = card.icon || '/default-icon.svg';
        const title = card.nama_kegiatan || 'Tanpa Judul';
        const description = card.deskripsi_kegiatan || '';
        return `
          <div class="card programsekolah-text">
            <div class="icon">
              <img src="${icon}" alt="${title}" />
            </div>
            <h3 class="card-title programsekolah-text">${title}</h3>
            <p class="card-desc programsekolah-text">${description}</p>
          </div>
        `;
      }).join('');

    })
    .catch(error => {
      console.error('Error loading activity cards:', error);
      return `<p style="color: red;">${error.message}</p>`;
    });
}
