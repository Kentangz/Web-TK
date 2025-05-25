import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

document.querySelector('#galeri-prestasi').innerHTML = `
  ${createSidebarHTML({
    activePage: 'galeri-prestasi',
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
        <div class="card-title">Data Gambar Prestasi</div>
      </div>
      <div class="card-body">
        <table class="card-table">
          <thead>
            <tr>
              <th>Gambar</th>
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
`;

const gambarData = [
  { gambar: '/user.png' },
  { gambar: '/user.png' }
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

function tambahBaris(imageSrc) {
  const tbody = document.querySelector('.card-table tbody');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td><img src="${imageSrc}" style="width:100px;"></td>
    <td>
      <button class="btn-edit">Edit</button>
      <button class="btn-hapus">Hapus</button>
    </td>
  `;
  tbody.appendChild(newRow);
  attachButtonHandlers(newRow);
}

gambarData.forEach(data => {
  tambahBaris(data.gambar);
});

document.querySelector('.btn-tambah').addEventListener('click', () => {
  disableAllButtons(null);
  fileInput.value = '';
  fileInput.click();

  let reenabled = false;

  setTimeout(() => {
    if (!reenabled) {
      enableAllButtons();
    }
  }, 1000);

  fileInput.onchange = () => {
    const file = fileInput.files[0];
    if (!file) {
      enableAllButtons();
      reenabled = true;
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      tambahBaris(e.target.result);
      enableAllButtons();
      reenabled = true;
    };
    reader.readAsDataURL(file);
  };
});

function attachButtonHandlers(row) {
  const tdImage = row.children[0];
  const tdOptions = row.children[1];
  let originalSrc = tdImage.querySelector('img').src;

  const btnEdit = row.querySelector('.btn-edit');
  const btnHapus = row.querySelector('.btn-hapus');

  btnHapus.addEventListener('click', () => {
    const konfirmasi = confirm('Yakin ingin menghapus data ini?');
    if (konfirmasi) {
      row.remove();
    }
  });

  btnEdit.addEventListener('click', () => {
    disableAllButtons(row);

    const img = tdImage.querySelector('img');
    let newSrc = originalSrc;

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
      originalSrc = newSrc;
      tdOptions.innerHTML = `
        <button class="btn-edit">Edit</button>
        <button class="btn-hapus">Hapus</button>
      `;
      attachButtonHandlers(row);
      enableAllButtons();
    });

    btnBatal.addEventListener('click', () => {
      img.src = originalSrc;
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