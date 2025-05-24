export function fetchGuru() {
  return fetch(`${import.meta.env.VITE_API_KEY}/guru`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data guru. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const data = result.data;
      if (!Array.isArray(data)) {
        throw new Error("Format data guru tidak valid");
      }
      return data.map(guru => ({
        img: guru.image,         // URL gambar
        title: guru.jabatan,     // Jabatan
        name: guru.nama,         // Nama
        ttl: guru.ttl,           // Tempat, Tanggal Lahir
        phone: guru.nomor        // Nomor telepon
      }));
    })
    .catch(error => {
      console.error("Kesalahan fetchGuru:", error);
      return [];
    });
}
