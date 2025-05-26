export async function fetchGambarGaleriKegiatan(limit) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/gallerykegiatan`);
    if (!response.ok) throw new Error(`Error! Status: ${response.status}`);

    const result = await response.json();
    const sorted = [...result.data].reverse();
    const gambarList = typeof limit === 'number' ? sorted.slice(0, limit) : sorted;

    if (!gambarList || gambarList.length === 0) {
      return `<p style="color:red;">Tidak ada galeri kegiatan tersedia.</p>`;
    }

    return gambarList.map(gambar => `
      <div class="gallery-item">
        <div class="image-wrapper">
          <img src="${gambar.image}" class="gallery-img" alt="Galeri Kegiatan" loading="lazy"
               onerror="this.src='/images/fallback.jpg';" />
          <div class="gallery-caption">${gambar.nama_kegiatan || ''}</div>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Fetch galeri kegiatan error:', error);
    return `<p style="color:red;">Gagal memuat galeri kegiatan</p>`;
  }
}
