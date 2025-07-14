export function fetchJadwalKB() {
  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/jadwalkelompokkb`)
    .then(response => {
      if (!response.ok) throw new Error("Gagal mengambil data jadwal KB");
      return response.json();
    })
    .then(result => {
      const data = result.data;
      if (!Array.isArray(data) || data.length === 0) throw new Error("Data jadwal KB kosong");

      return data.map(item => `
        <li>
          <img src="${item.icon}" alt="Icon Jadwal KB" />
          <span class="jadwal-text">${item.deskripsi}</span>
        </li>
      `).join('');
    })
    .catch(error => {
      return `<p style="color:red;">${error.message}</p>`;
    });
}
