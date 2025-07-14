import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'
import { getAllGambarPrestasi, postGambarPrestasi, updateGambarPrestasiById, deleteGambarPrestasiById } from './fetch.js';
import { checkAuth } from '../../Auth/Api/checkX.js';

if (!checkAuth()) {
  throw new Error("Not authenticated");
}

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

function tambahBaris({ id, img }) {
  const tbody = document.querySelector('.card-table tbody');
  const newRow = document.createElement('tr');
  newRow.setAttribute('data-id', id);

  newRow.innerHTML = `
    <td><img src="${img}" style="width:100px;"></td>
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
  const tdOptions = row.children[1];
  let originalSrc = tdImage.querySelector('img').src;
  const id = row.getAttribute('data-id');

  const btnEdit = row.querySelector('.btn-edit');
  const btnHapus = row.querySelector('.btn-hapus');

  btnHapus.addEventListener('click', () => {
    deleteGambarPrestasiById(id)
      .then(() => {
        row.remove();
        showToast("Data gambar prestasi berhasil dihapus.", "error");
      })
      .catch(() => {
        showToast("Gagal menghapus data gambar prestasi.", "error");
      });
  });

  btnEdit.addEventListener('click', () => {
    disableAllButtons(row);

    const img = tdImage.querySelector('img');
    let newSrc = originalSrc;
    let selectedFile = null;

    tdOptions.innerHTML = `
      <button class="btn-upload">Upload Foto</button>
      <button class="btn-simpan">Simpan</button>
      <button class="btn-batal">Batal</button>
    `;

    const btnUpload = tdOptions.querySelector('.btn-upload');
    const btnSimpan = tdOptions.querySelector('.btn-simpan');
    const btnBatal = tdOptions.querySelector('.btn-batal');

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
          showToast("Foto prestasi berhasil di upload.", "success");
        };
        reader.readAsDataURL(file);
      };
    });

    btnSimpan.addEventListener('click', () => {
      updateGambarPrestasiById(id, { imageFile: selectedFile })
        .then(updated => {
          if (updated) {
            originalSrc = updated.img;
            img.src = updated.img;
            showToast("Data gambar prestasi berhasil disimpan.", "success");
          }
          tdOptions.innerHTML = `
            <button class="btn-edit">Edit</button>
            <button class="btn-hapus">Hapus</button>
          `;
          attachButtonHandlers(row);
          enableAllButtons();
          })
          .catch(() => {
            showToast("Gagal menyimpan data gambar prestasi.", "error");
          });
      });

    btnBatal.addEventListener('click', () => {
      fileInput.value = "";
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

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      showToast('Format file tidak didukung.', "error");
      fileInput.value = '';
      enableAllButtons();
      reenabled = true;
      return;
    }

     if (file.size > maxSize) {
      showToast('Ukuran gambar maksimal 2MB.', "error");
      fileInput.value = '';
      enableAllButtons();
      reenabled = true;
      return;
    }

    postGambarPrestasi({ imageFile: file })
      .then(result => {
        if (result) {
          tambahBaris(result);
           showToast("Foto prestasi berhasil ditambahkan.", "success");
        }
        enableAllButtons();
        reenabled = true;
      })
        .catch(() => {
    showToast("Gagal menambahkan foto prestasi.", "error");
    enableAllButtons();
    reenabled = true;
  });
  };
});

const tbody = document.querySelector("table tbody");
tbody.innerHTML = `<tr><td colspan="2">Loading data gambar prestasi...</td></tr>`;

getAllGambarPrestasi()
  .then(data => {
    if (data) {
      tbody.innerHTML = '';
      data.forEach(item => {
        tambahBaris(item);
      });
    }
  })
    .catch(() => {
    showToast("Gagal memuat data gambar prestasi.", "error");
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