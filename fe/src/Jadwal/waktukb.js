export function fetchWaktuKB() {
  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/waktukegiatankb`)
    .then(response => {
      if (!response.ok) throw new Error("Gagal mengambil data waktu KB");
      return response.json();
    })
    .then(result => {
      const data = result.data;

      if (Array.isArray(data)) {
        if (data.length === 0) throw new Error("Data waktu KB kosong");
        return data
          .map(item => `<p class="jadwal-text">${item.hari}: ${item.jam}</p>`)
          .join('');
      }

      if (typeof data === 'object' && data !== null && data.hari && data.jam) {
        return `<p class="jadwal-text">${data.hari}: ${data.jam}</p>`;
      }

      throw new Error("Format data waktu KB tidak valid");
    })
    .catch(error => {
      return `<p style="color:red;">${error.message}</p>`;
    });
}
