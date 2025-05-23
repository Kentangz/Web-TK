import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#galeri-kegiatan').innerHTML = `
  ${createSidebarHTML({
    activePage: 'galeri-kegiatan',
    logoSrc: '/logo.svg',
    schoolName: 'TK & KB SITI HAJAR'
  })}
  <div class="main-content">
    <div class="topbar">
      <div class="admin-info">
        <img src="/user.png" alt="Admin Profile">
        <div class="admin-text">
          <div class="admin-role">Admin</div>
          <div class="admin-name">Linna Indriyanti, S. Psi</div>
        </div>
      </div>
    </div>

    <div class="gallery-card">
      <div class="card-header">
        <div class="card-title">Data Gambar Visi & Misi</div>
      </div>
      <div class="card-body">
        <table class="card-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Gambar</th>
              <th>Nama Kegiatan</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
      <div class="button-group">
        <button class="btn-tambah">Tambah Foto</button>
      </div>
  </div>
`;

const gambarData = [
  { gambar: '/user.png', nama: 'Kegiatan 1' },
  { gambar: '/user.png', nama: 'Kegiatan 2' }
];

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

function disableAllButtons(exceptRow) {
  document.querySelectorAll('.card-table tr').forEach(row => {
    if (row !== exceptRow) {
      row.querySelectorAll('button').forEach(btn => btn.disabled = true);
    }
  });
  document.querySelector('.btn-tambah').disabled = true;
}

function enableAllButtons() {
  document.querySelectorAll('button').forEach(btn => btn.disabled = false);
}

function tambahBaris(imageSrc, namaKegiatan = '') {
  const tbody = document.querySelector('.card-table tbody');
  const newRow = document.createElement('tr');
  const rowNumber = tbody.rows.length + 1;

  newRow.innerHTML = `
    <td>${rowNumber}</td>
    <td><img src="${imageSrc}" style="width:100px;"></td>
    <td class="nama-kegiatan">${namaKegiatan}</td>
    <td>
      <button class="btn-edit">Edit</button>
      <button class="btn-hapus">Hapus</button>
    </td>
  `;
  tbody.appendChild(newRow);
  attachButtonHandlers(newRow);
}

gambarData.forEach(data => tambahBaris(data.gambar, data.nama));

document.querySelector('.btn-tambah').addEventListener('click', () => {
  disableAllButtons(null);

  const tbody = document.querySelector('.card-table tbody');
  const tr = document.createElement('tr');
  const rowNumber = tbody.rows.length + 1;
  let newImage = '';

  tr.innerHTML = `
    <td>${rowNumber}</td>
    <td class="gambar"><img src="/user.png" width="100" /></td>
    <td class="nama-kegiatan"><input type="text" placeholder="Masukkan nama kegiatan" style="width: 100%;"></td>
    <td>
      <button class="btn-upload">Upload Foto</button>
      <button class="btn-simpan">Simpan</button>
      <button class="btn-batal">Batal</button>
    </td>
  `;

  tbody.appendChild(tr);

  const inputNama = tr.querySelector('.nama-kegiatan input');

  tr.querySelector('.btn-upload').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        newImage = ev.target.result;
        tr.querySelector('.gambar').innerHTML = `<img src="${newImage}" width="100" />`;
      };
      reader.readAsDataURL(file);
    };
    input.click();
  });

  tr.querySelector('.btn-simpan').addEventListener('click', () => {
    const nama = inputNama.value.trim();
    if (!nama || !newImage) {
      alert('Data tidak boleh kosong!');
      return;
    }

    tr.innerHTML = `
      <td>${rowNumber}</td>
      <td><img src="${newImage}" width="100" /></td>
      <td class="nama-kegiatan">${nama}</td>
      <td>
        <button class="btn-edit">Edit</button>
        <button class="btn-hapus">Hapus</button>
      </td>
    `;
    attachButtonHandlers(tr);
    enableAllButtons();
  });

  tr.querySelector('.btn-batal').addEventListener('click', () => {
    tr.remove();
    enableAllButtons();
  });
});

function attachButtonHandlers(row) {
  const tdImage = row.children[1];
  const tdNama = row.children[2];
  const tdOptions = row.children[3];
  let originalSrc = tdImage.querySelector('img').src;
  let originalNama = tdNama.textContent;

  const btnEdit = row.querySelector('.btn-edit');
  const btnHapus = row.querySelector('.btn-hapus');

  btnHapus.addEventListener('click', () => {
    const konfirmasi = confirm('Yakin ingin menghapus data ini?');
    if (konfirmasi) row.remove();
  });

  btnEdit.addEventListener('click', () => {
    disableAllButtons(row);

    const img = tdImage.querySelector('img');
    let newSrc = originalSrc;
    let newNama = originalNama;

    tdNama.innerHTML = `<input type="text" value="${originalNama}" class="input-nama-kegiatan" style="width: 100%;">`;

    tdOptions.innerHTML = `
      <button class="btn-upload">Upload Foto</button>
      <button class="btn-simpan">Simpan</button>
      <button class="btn-batal">Batal</button>
    `;

    const btnUpload = tdOptions.querySelector('.btn-upload');
    const btnSimpan = tdOptions.querySelector('.btn-simpan');
    const btnBatal = tdOptions.querySelector('.btn-batal');

    btnUpload.addEventListener('click', () => {
      fileInput.click();
      fileInput.onchange = () => {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = e => {
          newSrc = e.target.result;
          img.src = newSrc;
        };
        reader.readAsDataURL(file);
      };
    });

    btnSimpan.addEventListener('click', () => {
      newNama = tdNama.querySelector('.input-nama-kegiatan').value.trim();

      if (!newNama || !newSrc) {
        alert('Data tidak boleh kosong!');
        return;
      }

      originalSrc = newSrc;
      originalNama = newNama;
      tdImage.querySelector('img').src = originalSrc;
      tdNama.textContent = originalNama;

      tdOptions.innerHTML = `
        <button class="btn-edit">Edit</button>
        <button class="btn-hapus">Hapus</button>
      `;
      attachButtonHandlers(row);
      enableAllButtons();
    });

    btnBatal.addEventListener('click', () => {
      img.src = originalSrc;
      tdNama.textContent = originalNama;
      tdOptions.innerHTML = `
        <button class="btn-edit">Edit</button>
        <button class="btn-hapus">Hapus</button>
      `;
      attachButtonHandlers(row);
      enableAllButtons();
    });
  });
}

initSidebarFunctionality();