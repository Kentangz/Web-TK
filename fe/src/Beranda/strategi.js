export function fetchStrategi() {
  return fetch(`${import.meta.env.VITE_API_KEY}/beranda/strategi`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      const strategiList = result.data;
      const items = strategiList.map(item => `<li>${item.strategi_description}</li>`).join('');
      return `
        <h2>Strategi</h2>
        <ul>${items}</ul>
      `;
    })
    .catch(error => `<p style="color:red;">Gagal memuat strategi</p>`);
}
