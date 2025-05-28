export async function fetchGambarFasilitas(limit) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/fasilitasprestasi/galleryfasilitas`);
    if (!response.ok) throw new Error(`Error! Status: ${response.status}`);

    const result = await response.json();
    const sorted = [...result.data].reverse(); // Gambar terbaru duluan
    const gambarList = typeof limit === 'number' ? sorted.slice(0, limit) : sorted;

    if (!gambarList || gambarList.length === 0) {
      return `<p style="color:red;">Tidak ada gambar fasilitas tersedia.</p>`;
    }

    return gambarList.map(gambar => `
      <div class="gallery-item">
        <img src="${gambar.image}" alt="Galeri Fasilitas" loading="lazy"
             onerror="this.src='/images/fallback.jpg';" />
      </div>
    `).join('');
  } catch (error) {
    console.error('Fetch galeri fasilitas error:', error);
    return `<p style="color:red;">Gagal memuat galeri fasilitas</p>`;
  }
}
