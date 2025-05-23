export function fetchWaktuAB() {
  return fetch(`${import.meta.env.VITE_API_KEY}/jadwal/waktukegiatantk`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Gagal mengambil data waktu");
      }
      return response.json();
    })
    .then(result => {
      const data = result.data;

      // Jika data adalah array, render semua item
      if (Array.isArray(data)) {
        if (data.length === 0) {
          throw new Error("Data kosong");
        }
        return data
          .map(item => `<p>${item.hari}: ${item.jam}</p>`)
          .join('');
      }

      // Jika data adalah objek tunggal
      if (typeof data === 'object' && data !== null && data.hari && data.jam) {
        return `<p>${data.hari}: ${data.jam}</p>`;
      }

      throw new Error("Format data tidak valid");
    })
    .catch(error => {
      return `<p style="color:red;">${error.message}</p>`;
    });
}
