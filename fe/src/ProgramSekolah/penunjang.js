export function fetchPenunjang() {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/kegiatanpenunjang`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Gagal mengambil data kegiatan penunjang');
      }
      return res.json();
    })
    .then(responseData => {
      const items = responseData.data;

      if (!Array.isArray(items) || items.length === 0) {
        throw new Error('Data kegiatan penunjang kosong');
      }

      const listItems = items.map(item => `<li class="programsekolah-text">${item.kegiatan_penunjang}</li>`).join('');

      return `
        <ul class="penunjang-list">
          ${listItems}
        </ul>
      `;
    })
    .catch(err => {
      console.error(err);
      return `<p style="color:red;">${err.message}</p>`;
    });
}
