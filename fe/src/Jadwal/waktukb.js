export function fetchWaktuKB() {
  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/waktukegiatankb`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Gagal mengambil data waktu KB");
      }
      return response.json();
    })
    .then(result => {
      const data = result.data;

      // Jika data array
      if (Array.isArray(data)) {
        if (data.length === 0) throw new Error("Data waktu KB kosong");
        return `<p>${data[0].hari}: ${data[0].jam}</p>`;
      }

      // Jika data tunggal
      if (!data.hari || !data.jam) {
        throw new Error("Data waktu KB tidak lengkap");
      }

      return `<p>${data.hari}: ${data.jam}</p>`;
    })
    .catch(error => {
      return `<p style="color:red;">${error.message}</p>`;
    });
}
