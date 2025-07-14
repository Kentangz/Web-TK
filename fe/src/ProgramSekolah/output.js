export function fetchOutput() {
  return fetch(`${import.meta.env.VITE_API_KEY}/programsekolah/output`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Gagal mengambil data output');
      }
      return res.json();
    })
    .then(responseData => {
        const data = responseData.data;

        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('Data output kosong');
        }

        const colCount = 3;
        const perCol = Math.ceil(data.length / colCount);
        const columns = Array.from({ length: colCount }, (_, i) =>
            data.slice(i * perCol, (i + 1) * perCol)
        );

        const columnHTML = columns.map(col => `
            <ul>
              ${col.map(item => `<li class="programsekolah-text">${item.output_description}</li>`).join('')}
            </ul>
          `).join('');
        return `
            <div class="output-section">
            <div class="output-columns">
                ${columnHTML}
            </div>
            </div>
        `;
    })

    .catch(err => {
      console.error(err);
      return `<p style="color:red;">${err.message}</p>`;
    });
}
