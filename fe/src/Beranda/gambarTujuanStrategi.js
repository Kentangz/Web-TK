export function fetchGambarTujuan() {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/imagetujuan`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const gambar = result.data[0];
      return `<img src="${gambar.image}" alt="Gambar Tujuan Strategi" />`;
    })
    .catch(error => `<p style="color:red;">Gagal memuat gambar</p>`);
}
