export function fetchInstagram() {
  return fetch(`${import.meta.env.VITE_API_KEY}/contact/instagram`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Gagal mengambil data Instagram. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const data = result.data;

      if (Array.isArray(data) && data.length > 0 && data[0].ig_name) {
        return `${data[0].ig_name}`;
      } else {
        throw new Error("Data Instagram tidak ditemukan atau format tidak valid");
      }
    })
    .catch(error => {
      console.error("Kesalahan fetchInstagram:", error);
      return `Gagal memuat contact person`;
    });
}
