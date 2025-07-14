export function fetchVisiMisiImage() {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/imagevisi`)
    .then(response => {
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      return response.json();
    })
    .then(result => {
      const item = result.data[0]; 
      return `<img src="${item.image}" alt="Gambar Visi Misi" class="visi-img beranda-text" />`;
    })
    .catch(err => {
      return `<p style="color:red;">Gagal memuat gambar</p>`;
    });
}
