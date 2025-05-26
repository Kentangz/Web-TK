export async function fetchGambarFasilitas(limit = 3) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/galleryfasilitas`);
    if (!response.ok) throw new Error(`Error! Status: ${response.status}`);

    const result = await response.json();
    const gambarList = limit ? result.data.slice(0, limit) : result.data;

    return gambarList.map(gambar => `
      <div class="preview-image">
        <img src="${gambar.image}" alt="Galeri Fasilitas" />
      </div>
    `).join('');
  } catch (error) {
    return `<p style="color:red;">Gagal memuat galeri fasilitas</p>`;
  }
}
