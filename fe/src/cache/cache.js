//const CACHE_EXPIRY_MS = 5 * 60 * 1000; // 5 menit
const CACHE_EXPIRY_MS = 80 * 1000; // 30 detik


export async function fetchWithCache(key, fetchFunction) {
  const now = Date.now();


  const isBypass = new URLSearchParams(location.search).get('nocache') === 'true';
  if (isBypass) {
    console.log(`🔄 Bypassing cache untuk ${key}`);
    localStorage.removeItem(key);
  }

  const cached = !isBypass && localStorage.getItem(key);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (now - parsed.timestamp < CACHE_EXPIRY_MS) {
        console.log(`✅ Mengambil data ${key} dari cache`);
        return parsed.data;
      } else {
        console.log(`⏰ Cache ${key} sudah kadaluarsa`);
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn(`⚠️ Gagal parse cache ${key}, hapus cache`, e);
      localStorage.removeItem(key);
    }
  }

  try {
    console.log(`🌐 Mengambil data ${key} dari API`);
    const data = await fetchFunction();

    if (data && data.trim && data.trim() !== '') {
      localStorage.setItem(key, JSON.stringify({ data, timestamp: now }));
    } else {
      console.warn(`⚠️ Tidak menyimpan cache untuk ${key} karena data kosong`);
    }

    return data;
  } catch (err) {
    console.error(`❌ Gagal fetch data ${key} dari API`, err);

    const fallback = localStorage.getItem(key);
    if (fallback) {
      try {
        const parsed = JSON.parse(fallback);
        console.warn(`⚠️ Menggunakan cache lama untuk ${key}`);
        return parsed.data;
      } catch (e) {
        console.error(`🔥 Cache lama ${key} juga rusak`, e);
      }
    }

    throw new Error(`Fetch gagal dan tidak ada cache untuk ${key}`);
  }
}
