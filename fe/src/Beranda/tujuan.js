export function fetchTujuan() {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/tujuan`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const data = result.data[0];
      return `
        <h2>Tujuan</h2>
        <p class="beranda-text">${data.tujuan_description}</p>
      `;
    })
    .catch(error => `<p style="color:red;">Gagal memuat tujuan</p>`);
}