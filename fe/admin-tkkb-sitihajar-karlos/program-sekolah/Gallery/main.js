import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

import { getAllGambarKegiatan, postGambarkegiatan, updateGambarKegiatanById, deleteGambarKegiatanById } from './fetch.js';

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
        <div class="card-title">Data Gambar Kegiatan</div>
      </div>
      <div class="card-body">
        <table class="card-table id="table-kegiatan"">
          <thead>
            <tr>
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

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

function disableAllButtons(exceptRow) {
  document.querySelectorAll('.card-table tbody tr').forEach(row => {
    if (row !== exceptRow) {
      row.querySelectorAll('button').forEach(btn => btn.disabled = true);
    } else {
      row.querySelectorAll('button').forEach(btn => btn.disabled = false);
    }
  });
  document.querySelector('.btn-tambah').disabled = true;
}

function enableAllButtons() {
  document.querySelectorAll('button').forEach(btn => btn.disabled = false);
}

function tambahBaris({ id, img, activity }) {
  const tbody = document.querySelector('.card-table tbody');
  const newRow = document.createElement('tr');
  newRow.setAttribute('data-id', id);

  newRow.innerHTML = `
    <td><img src="${img}" style="width:100px;"></td>
    <td>${activity}</td>
    <td>
      <button class="btn-edit">Edit</button>
      <button class="btn-hapus">Hapus</button>
    </td>
  `;
  tbody.appendChild(newRow);
  attachButtonHandlers(newRow);
}

function attachButtonHandlers(row) {
  const tdImage = row.children[0];
  const tdActivity = row.children[1];
  const tdOptions = row.children[2];
  let originalSrc = tdImage.querySelector('img').src;
  const originalActivity = tdActivity.innerText;
  const id = row.getAttribute('data-id');

  const btnEdit = row.querySelector('.btn-edit');
  const btnHapus = row.querySelector('.btn-hapus');

  btnHapus.addEventListener('click', () => {
    deleteGambarKegiatanById(id)
      .then(() => {
        row.remove();
        showToast("Data gambar kegiatan berhasil dihapus.", "error");
      })
      .catch(() => {
        showToast("Gagal menghapus data gambar kegiatan.", "error");
      });
  });

  btnEdit.addEventListener('click', () => {
    disableAllButtons(row);

    const img = tdImage.querySelector('img');
    let newSrc = originalSrc;
    let selectedFile = null;

    tdActivity.innerHTML = `<input type="text" class="input-activity" value="${originalActivity}" style="width:100%;">`;

    tdOptions.innerHTML = `
      <button class="btn-upload">Upload Foto</button>
      <button class="btn-simpan">Simpan</button>
      <button class="btn-batal">Batal</button>
    `;

    const btnUpload = tdOptions.querySelector('.btn-upload');
    const btnSimpan = tdOptions.querySelector('.btn-simpan');
    const btnBatal = tdOptions.querySelector('.btn-batal');
    const inputActivity = tdActivity.querySelector('.input-activity');

    btnUpload.addEventListener('click', () => {
      fileInput.value = "";
      fileInput.click();
      fileInput.onchange = () => {
        const file = fileInput.files[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
        const maxSize = 2 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
          showToast('Format file tidak didukung.', "error");
          fileInput.value = '';
          return;
        }

        if (file.size > maxSize) {
          showToast('Ukuran gambar maksimal 2MB.', "error");
          fileInput.value = '';
          return;
        }

        selectedFile = file;
        const reader = new FileReader();
        reader.onload = e => {
          newSrc = e.target.result;
          img.src = newSrc;
          showToast("Foto kegiatan berhasil diupload.", "success");
        };
        reader.readAsDataURL(file);
      };
    });

    btnSimpan.addEventListener('click', () => {
      const newActivity = inputActivity.value.trim();
      if (!newActivity) {
        showToast("Data kegiatan tidak boleh kosong.", "error");
        return;
      }

      updateGambarKegiatanById(id, { nama_kegiatan: newActivity }, selectedFile)
        .then(updated => {
          if (updated) {
            originalSrc = updated.img;
            img.src = updated.img;
            tdActivity.textContent = updated.activity;
            showToast("Data gambar kegiatan berhasil disimpan.", "success");
          } else {
            showToast("Gagal menyimpan data gambar kegiatan.", "error");
            tdActivity.textContent = originalActivity;
          }

          tdOptions.innerHTML = `
            <button class="btn-edit">Edit</button>
            <button class="btn-hapus">Hapus</button>
          `;
          attachButtonHandlers(row);
          enableAllButtons();
        })
        .catch(() => {
          showToast("Gagal menyimpan data gambar kegiatan.", "error");
          tdActivity.textContent = originalActivity;
          enableAllButtons();
        });
    });

    btnBatal.addEventListener('click', () => {
      fileInput.value = "";
      img.src = originalSrc;
      tdActivity.textContent = originalActivity;
      tdOptions.innerHTML = `
        <button class="btn-edit">Edit</button>
        <button class="btn-hapus">Hapus</button>
      `;
      attachButtonHandlers(row);
      enableAllButtons();
    });
  });
}

document.querySelector('.btn-tambah').addEventListener('click', () => {
  disableAllButtons(null);
  const tbody = document.querySelector('.card-table tbody');
  const newRow = document.createElement('tr');
  let selectedFile = null;

  newRow.innerHTML = `
    <td><img src="/user.png" alt="Preview" style="width:80px; height:auto;"></td>
    <td><input type="text" class="input-activity" placeholder="Nama Kegiatan" style="width:100%;"></td>
    <td>
      <button class="btn-upload">Upload Foto</button>
      <button class="btn-simpan">Simpan</button>
      <button class="btn-batal">Batal</button>
    </td>
  `;

  tbody.appendChild(newRow);

  const btnUpload = newRow.querySelector('.btn-upload');
  const btnSimpan = newRow.querySelector('.btn-simpan');
  const btnBatal = newRow.querySelector('.btn-batal');
  const inputActivity = newRow.querySelector('.input-activity');
  const previewImg = newRow.querySelector('img');

  btnUpload.addEventListener('click', () => {
    fileInput.value = '';
    fileInput.click();

    fileInput.onchange = () => {
      const file = fileInput.files[0];
      if (!file) return;

      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
      const maxSize = 2 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        showToast('Format file tidak didukung.', "error");
        fileInput.value = '';
        return;
      }

      if (file.size > maxSize) {
        showToast('Ukuran gambar maksimal 2MB.', "error");
        fileInput.value = '';
        return;
      }

      selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => {
        previewImg.src = e.target.result;
        showToast("Foto kegiatan berhasil diupload.", "success");
      };
      reader.readAsDataURL(file);
    };
  });

  btnSimpan.addEventListener('click', () => {
    const activityValue = inputActivity.value.trim();
    if (!activityValue || !selectedFile) {
      showToast("Data kegiatan tidak boleh kosong.", "error");
      return;
    }

    postGambarkegiatan({ nama_kegiatan: activityValue }, selectedFile)
      .then(result => {
        if (result) {
          tambahBaris(result);
          newRow.remove();
          showToast("Data gambar kegiatan berhasil ditambahkan.", "success");
        } else {
          showToast("Gagal menambahkan data gambar kegiatan.", "error");
        }
        enableAllButtons();
      })
      .catch(() => {
        showToast("Gagal menambahkan data gambar kegiatan.", "error");
        enableAllButtons();
      });
  });

  btnBatal.addEventListener('click', () => {
    newRow.remove();
    enableAllButtons();
  });
});

const tbody = document.querySelector("table tbody");
tbody.innerHTML = `<tr><td colspan="3">Loading data gambar kegiatan...</td></tr>`;

getAllGambarKegiatan()
  .then(data => {

    if (data) {
      tbody.innerHTML = '';
      data.forEach(item => {
        tambahBaris(item);
      });
    }
  })
  .catch(() => {
    showToast("Gagal memuat data gambar kegiatan.", "error");
  });

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

document.body.insertAdjacentHTML("beforeend", `
  <div id="toast-container"></div>
`);

initSidebarFunctionality();
