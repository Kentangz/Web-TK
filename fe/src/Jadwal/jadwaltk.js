export function fetchJadwalAB() {
  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/jadwalkelompoktk`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Gagal mengambil data jadwal");
      }
      return response.json();
    })
    .then(result => {
      const data = result.data;
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("Data jadwal kosong");
      }

      return `
        <ul class="jadwal-list">
          ${data.map(item => `
            <li>
              <img src="${item.icon}" alt="Icon Jadwal" />
              ${item.deskripsi}
            </li>
          `).join('')}
        </ul>
      `;
    })
    .catch(error => {
      return `<p style="color:red;">${error.message}</p>`;
    });
}
