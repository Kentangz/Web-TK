import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'
import { getAllGambarVisiMisi, postGambarVisiMisi, updateGambarVisiMisiById, deleteGambarVisiMisiById, getAllGambarTujuanStrategi, postGambarTujuanStrategi, updateGambarTujuanStrategiById, deleteGambarTujuanStrategiById } from './fetch.js';
import { checkAuth } from '../../Auth/Api/checkX.js';

if (!checkAuth()) {
  throw new Error("Not authenticated");
}

document.querySelector('#gallery-beranda').innerHTML = `
  ${createSidebarHTML({
    activePage: 'gallery-beranda',
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
        <table class="card-table" id="table-visimisi">
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
      <button class="btn-tambah" data-type="visimisi">Tambah Foto</button>
    </div>

    <div class="gallery-card">
      <div class="card-header">
        <div class="card-title">Data Gambar Tujuan & Strategi</div>
      </div>
      <div class="card-body">
        <table class="card-table" id="table-tujuan">
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
      <button class="btn-tambah" data-type="tujuan">Tambah Foto</button>
    </div>
  </div>
`;

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

function updateButtonVisibility() {
  document.querySelectorAll('.card-table').forEach((table, index) => {
    const rowCount = table.querySelectorAll('tbody tr').length;
    const tambahBtn = document.querySelectorAll('.btn-tambah')[index];
    tambahBtn.style.display = rowCount > 0 ? 'none' : 'inline-block';
  });
}

function disableAllButtons(exceptRow) {
  document.querySelectorAll('.card-table tr').forEach(row => {
    if (row !== exceptRow) {
      row.querySelectorAll('button').forEach(btn => btn.disabled = true);
    }
  });
  document.querySelectorAll('.btn-tambah').forEach(btn => btn.disabled = true);
}

function enableAllButtons() {
  document.querySelectorAll('button').forEach(btn => btn.disabled = false);
}

function tambahBaris({ id, img }, type) {
  const newRow = document.createElement('tr');
  newRow.setAttribute('data-id', id);

  newRow.innerHTML = `
    <td><img src="${img}" style="width:100px;"></td>
    <td>
      <button class="btn-edit">Edit</button>
      <button class="btn-hapus">Hapus</button>
    </td>
  `;
  attachButtonHandlers(newRow, type);
  return newRow;
}

function attachButtonHandlers(row, type) {
  const tdImage = row.children[0];
  const tdOptions = row.children[1];
  let originalSrc = tdImage.querySelector('img').src;
  const id = row.getAttribute('data-id');

  const btnEdit = row.querySelector('.btn-edit');
  const btnHapus = row.querySelector('.btn-hapus');

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
        fileInput.onchange = function() {
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
          showToast("Foto berhasil di upload.", "success");
        };
        reader.readAsDataURL(file);
        };
      });

      btnSimpan.addEventListener('click', () => {
          if (!selectedFile) {
          tdOptions.innerHTML = `
            <button class="btn-edit">Edit</button>
            <button class="btn-hapus">Hapus</button>
          `;
          img.src = originalSrc;
          enableAllButtons();
          updateButtonVisibility();
          attachButtonHandlers(row, type);
          return;
        }
        
        if (type === 'visimisi') {
        updateGambarVisiMisiById(id, {  imageFile: selectedFile }).then(updated => {
          if (updated) {
            img.src = updated.img;
            originalSrc = updated.img;
            showToast('Data gambar visi dan misi berhasil disimpan.', "success");
          } else {
            showToast('Gagal memperbarui data gambar visi dan misi.', "error");
          }
          tdOptions.innerHTML = `
              <button class="btn-edit">Edit</button>
              <button class="btn-hapus">Hapus</button>
            `;
          enableAllButtons();
          updateButtonVisibility();
          attachButtonHandlers(row, type);
        });
      } else {
        updateGambarTujuanStrategiById(id, { imageFile: selectedFile }).then(updated => {
          if (updated) {
            originalSrc = updated.img;
            img.src = updated.img;
            showToast('Data gambar tujuan dan strategi berhasil disimpan.', "success");
          } else {
            showToast('Gagal memperbarui data gambar tujuan dan strategi.', "error");
          }
          tdOptions.innerHTML = `
            <button class="btn-edit">Edit</button>
            <button class="btn-hapus">Hapus</button>
          `;
          enableAllButtons();
          updateButtonVisibility();
          attachButtonHandlers(row, type);
        });
      }
    });

      btnBatal.addEventListener('click', () => {
        fileInput.value = "";
        img.src = originalSrc;
        tdOptions.innerHTML = `
          <button class="btn-edit">Edit</button>
          <button class="btn-hapus">Hapus</button>
        `;
        enableAllButtons();
        attachButtonHandlers(row, type);
      });
    });
    

  btnHapus.addEventListener('click', function() {

    disableAllButtons(row);

    if (type === 'visimisi') {
      deleteGambarVisiMisiById(id).then(function(deleted) {
        if (deleted) {
          row.remove();
          showToast('Data gambar visi dan misi berhasil dihapus.', "error");
        } else {
          showToast('Gagal menghapus data gambar visi dan misi.', "error");
        }
        enableAllButtons();
        updateButtonVisibility();
      });
    } else {
      deleteGambarTujuanStrategiById(id).then(function(deleted) {
        if (deleted) {
          row.remove();
          showToast('Data gambar tujuan dan strategi berhasil dihapus.', "error");
        } else {
          showToast('Gagal menghapus data gambar tujuan dan strategi.', "error");
        }
        enableAllButtons();
        updateButtonVisibility();
      });
    }
  });
}

function loadData(type) {
  const tbody = document.querySelector(`#table-${type} tbody`);
  tbody.innerHTML =`<tr><td colspan="2">Loading data gambar...</td></tr>`;

  if (type === 'visimisi') {
    getAllGambarVisiMisi().then(function(data) {
      const tbody = document.querySelector(`#table-${type} tbody`);
      tbody.innerHTML = '';
      if (data) {
        data.forEach(function(item) {
          const row = tambahBaris(item, type);
          tbody.appendChild(row);
        });
      }
      updateButtonVisibility();
    });
  } else {
    getAllGambarTujuanStrategi().then(function(data) {
      const tbody = document.querySelector(`#table-${type} tbody`);
      tbody.innerHTML = '';
      if (data) {
        data.forEach(function(item) {
          const row = tambahBaris(item, type);
          tbody.appendChild(row);
        });
      }
      updateButtonVisibility();
    });
  }
}

document.querySelectorAll('.btn-tambah').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const type = btn.dataset.type;
    fileInput.click();

    let reenabled = false;
    setTimeout(() => {
      if (!reenabled) enableAllButtons();
    }, 1000);

    fileInput.onchange = function() {
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

      disableAllButtons();

      if (type === 'visimisi') {
        postGambarVisiMisi({ imageFile : file }).then(function(added) {
          if (added) {
            const tbody = document.querySelector(`#table-${type} tbody`);
            const row = tambahBaris(added, type);
            tbody.appendChild(row);
            showToast('Foto visi dan misi berhasil ditambahkan.', "success");
          } else {
            showToast('Gagal menambahkan data gambar visi dan misi.', "error");
          }
          enableAllButtons();
          updateButtonVisibility();
          reenabled = true;
        });
      } else {
        postGambarTujuanStrategi({ imageFile : file }).then(function(added) {
          if (added) {
            const tbody = document.querySelector(`#table-${type} tbody`);
            const row = tambahBaris(added, type);
            tbody.appendChild(row);
            showToast('Foto tujuan dan strategi berhasil ditambahkan.',"success");
          } else {
            showToast('Gagal menambahkan data gambar tujuan dan strategi.', "error");
          }
          enableAllButtons();
          updateButtonVisibility();
          reenabled = true;
        });
      }
    };
  });
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

loadData('visimisi');
loadData('tujuan');

initSidebarFunctionality();