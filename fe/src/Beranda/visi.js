export function fetchvisi() {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/visi`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const items = result.data; 

      const visiHTML = items
        .map(item => `<p class="beranda-text">${item.visi_description}</p>`)
        .join(''); 

      return `
        <h2>Visi</h2>
        ${visiHTML}
      `;
    })
    .catch(error => {
      return `<p>Error memuat visi: ${error.message}</p>`;
    });
}