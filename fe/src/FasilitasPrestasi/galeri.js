export function fetchGaleri() {
  return fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/gallery`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      return result.data.map(item => `
        <div class="galeri-item">
          <img src="${item.image}" alt="Galeri">
        </div>
      `).join('');
    })
    .catch(error => {
      return `<p style="color:red;">Gagal memuat galeri: ${error.message}</p>`;
    });
}
