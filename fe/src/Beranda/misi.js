export function fetchMisi() {
    return fetch(`${import.meta.env.VITE_API_KEY}/beranda/misi`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            const items = result.data;
            return `
                <h2>Misi</h2>
                <ul>
                    ${items.map(item => `<li>${item.misi_description}</li>`).join('')}
                </ul>
            `;
        })
        .catch(err => {
            return `<p style="color:red;">Gagal memuat misi</p>`;
        });
}
