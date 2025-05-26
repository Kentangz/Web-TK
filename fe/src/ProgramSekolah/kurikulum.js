export function fetchKurikulumPlus() {
  const baseUrl = import.meta.env.VITE_API_KEY;

  const suratPendekAPI = fetch(`${baseUrl}/programsekolah/kurikulumplus/suratpendek`)
    .then(res => {
      if (!res.ok) throw new Error('Gagal mengambil data surat pendek');
      return res.json();
    });

  const doaAPI = fetch(`${baseUrl}/programsekolah/kurikulumplus/doa`)
    .then(res => {
      if (!res.ok) throw new Error('Gagal mengambil data doa');
      return res.json();
    });

  const haditsAPI = fetch(`${baseUrl}/programsekolah/kurikulumplus/hadits`)
    .then(res => {
      if (!res.ok) throw new Error('Gagal mengambil data hadist');
      return res.json();
    });

  return Promise.all([suratPendekAPI, doaAPI, haditsAPI])  // <= INI HARUS ADA
    .then(([suratPendekRes, doaRes, haditsRes]) => {
      const suratPendek = suratPendekRes.data;
      const doa = doaRes.data;
      const hadits = haditsRes.data;

      const suratHTML = suratPendek.map(s => `${s.surat_name}`).join('<br>');
      const doaHTML = doa.map(d => `${d.doa_name}`).join('<br>');
      const haditsHTML = hadits.map(h => `${h.hadits_name}`).join('<br>');

      return `
          <table class="kurikulum-table">
            <thead>
              <tr>
                <th>SURAT-SURAT PENDEK</th>
                <th>DOA</th>
                <th>HADIST</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${suratHTML}</td>
                <td>${doaHTML}</td>
                <td>${haditsHTML}</td>
              </tr>
            </tbody>
          </table>
      `;
    })
    .catch(err => {
      console.error(err);
      return `<p style="color:red;">${err.message}</p>`;
    });
}
