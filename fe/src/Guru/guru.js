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
        img: guru.image,       
        title: guru.jabatan,     
        name: guru.nama,       
        ttl: guru.ttl,           
        phone: guru.nomor       
      }));
    })
    .catch(error => {
      console.error("Kesalahan fetchGuru:", error);
      return [];
    });
}
