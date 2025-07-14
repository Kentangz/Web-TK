import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'
import { getAllKegiatanUnggulan, postKegiatanUnggulan, updateKegiatanUnggulanById, deleteKegiatanUnggulanById } from './fetch.js';
import { checkAuth } from '../../Auth/Api/checkX.js';

if (!checkAuth()) {
	throw new Error("Not authenticated");
}

document.querySelector('#kegiatan-unggulan').innerHTML = `
  ${createSidebarHTML({
    activePage: 'kegiatan-unggulan',
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

    <div class="featured_activities-card">
      <div class="card-header">Kegiatan Unggulan</div>
      <div class="card-body">
        <table class="card-table" id="tabelUnggulan">
          <thead>
            <tr>
              <th>Ikon</th>
              <th>Nama Kegiatan</th>
              <th>Deskripsi</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
    <div class="button-group">
      <button id="btnTambah" class="btn-tambah">Tambah</button>
    </div>
`;

let kegiatanUnggulanData = [];

let editingIndex = null;

function renderTabelUnggulan() {
  const tbody = document.querySelector("#tabelUnggulan tbody");
  tbody.innerHTML =`<tr><td colspan="4">Loading data kegiatan unggulan...</td></tr>`;

  getAllKegiatanUnggulan()
    .then(data => {
      kegiatanUnggulanData = data;
      const tbody = document.querySelector("#tabelUnggulan tbody");
      tbody.innerHTML = "";

      kegiatanUnggulanData.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <tr data-id="${item.id}">
          <td class="icon">${item.icon ? `<img src="${item.icon}" width="50" height="50"/>` : "0"}</td>
          <td class="judul" style="max-width:300px; word-wrap:break-word; white-space:normal;">${item.activity}</td>
          <td class="deskripsi" style="max-width:300px; word-wrap:break-word; white-space:normal;">${item.desc}</td>
          <td>
            <button class="btn-edit" data-index="${index}">Edit</button>
            <button class="btn-hapus" data-index="${index}">Hapus</button>
          </td>
        `;

        tbody.appendChild(tr);

        const btnEdit = tr.querySelector(".btn-edit");
        const btnHapus = tr.querySelector(".btn-hapus");

        btnEdit.addEventListener("click", () => {
          if (editingIndex!== null) return
          editingIndex = index;
          disableAllButtonsExcept(tr);

          let selectedFile = null;

          tr.querySelector(".icon").innerHTML = `<img src="${item.icon}" width="50" height="50"/>`;
          tr.querySelector(".judul").innerHTML = `<input type="text" value="${item.activity}" style="width: 100%;" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)">`;
          tr.querySelector(".deskripsi").innerHTML = `<input type="text" value="${item.desc}" style="width: 100%;" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)">`;
          tr.querySelector("td:last-child").innerHTML = `
            <button class="btn-upload">Upload Ikon</button>
            <button class="btn-edit btn-simpan">Simpan</button>
            <button class="btn-hapus btn-batal">Batal</button>
          `;

          tr.querySelector(".btn-upload").addEventListener("click", () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
              if (!allowedTypes.includes(file.type)) {
                showToast("Format file tidak didukung.", "error");
                return;
              }

              const maxSize = 2 * 1024 * 1024;
              if (file.size > maxSize) {
                showToast("Ukuran gambar maksimal 2MB.", "error");
                return;
              }
           
              selectedFile = file;
              tr.querySelector(".icon").innerHTML = `<img src="${URL.createObjectURL(selectedFile)}" width="50" height="50"/>`;
              showToast("Ikon kegiatan unggulan berhasil di upload.", "success");
            };
            input.click();
          });

          tr.querySelector(".btn-simpan").addEventListener("click", () => {
            const nama_kegiatan = tr.querySelector(".judul input").value.trim();
            const deskripsi_kegiatan = tr.querySelector(".deskripsi input").value.trim();
            if (!nama_kegiatan || !deskripsi_kegiatan) return showToast("Data kegiatan unggulan tidak boleh kosong.", "error");

            updateKegiatanUnggulanById(item.id, {nama_kegiatan, deskripsi_kegiatan }, selectedFile)
              .then(() => {
                editingIndex = null;
                showToast("Data kegiatan unggulan berhasil disimpan.", "success");
                renderTabelUnggulan();
                enableAllButtons();
              })
              .catch(() => showToast("Gagal menyimpan data kegiatan unggulan.", "error"));
          });

          tr.querySelector(".btn-batal").addEventListener("click", () => {
            editingIndex = null;
            renderTabelUnggulan();
            enableAllButtons();
          });
        });

        btnHapus.addEventListener("click", () => {
          if (editingIndex !== null) return
          else {
            showToast("Data kegiatan unggulan berhasil dihapus.", "error");
            deleteKegiatanUnggulanById(item.id)
              .then(() => renderTabelUnggulan())
              .catch(() => showToast("Gagal menghapus data kegiatan unggulan.", "error"));
          }
        });
      });
    })
    .catch(() =>showToast("Gagal memuat data kegiatan unggulan.", "error"));
}

document.getElementById("btnTambah").addEventListener("click", () => {
  if (editingIndex !== null) return
  editingIndex = "new";

  const tbody = document.querySelector("#tabelUnggulan tbody");
  const tr = document.createElement("tr");

  let selectedFile = null;

  tr.innerHTML = `
    <td class="icon"><img src="/user.png" width="50" height="50" /></td>
    <td class="judul"><input type="text" placeholder="Masukkan kegiatan" style="width: 100%;" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)"></td>
    <td class="deskripsi"><input type="text" placeholder="Masukkan deskripsi" style="width: 100%;" maxlength="255" oninput="if(this.value.length > 255) this.value = this.value.slice(0, 255)"></td>
    <td>
      <button class="btn-upload">Upload Ikon</button>
      <button class="btn-edit btn-simpan">Simpan</button>
      <button class="btn-hapus btn-batal">Batal</button>
    </td>
  `;

  tbody.appendChild(tr);
  disableAllButtonsExcept(tr);

  tr.querySelector(".btn-upload").addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        showToast("Format file tidak didukung.", "error");
        return;
      }

      const maxSize = 2 * 1024 * 1024; 
      if (file.size > maxSize) {
        showToast("Ukuran gambar maksimal 2MB.", "error");
        return;
      }

      selectedFile = file;
      tr.querySelector(".icon").innerHTML = `<img src="${URL.createObjectURL(selectedFile)}" width="50" height="50"/>`;
      showToast("Ikon kegiatan unggulan berhasil di upload.", "success");
    };

    input.click();
  });

  tr.querySelector(".btn-simpan").addEventListener("click", () => {
    const nama_kegiatan = tr.querySelector(".judul input").value.trim();
    const deskripsi_kegiatan = tr.querySelector(".deskripsi input").value.trim();
     if (!nama_kegiatan || !deskripsi_kegiatan || !selectedFile) return showToast("Data kegiatan unggulan tidak boleh kosong.", "error");

    postKegiatanUnggulan({ nama_kegiatan, deskripsi_kegiatan }, selectedFile)
      .then(() => {
        editingIndex = null;
        showToast("Data kegiatan unggulan berhasil ditambahkan.", "success");
        renderTabelUnggulan();
        enableAllButtons();
      })
      .catch(() => showToast("Gagal menambahkan data kegiatan unggulan.", "error"));
  });

  tr.querySelector(".btn-batal").addEventListener("click", () => {
    editingIndex = null;
    renderTabelUnggulan(); 
    enableAllButtons();
  });
});

function disableAllButtonsExcept(row) {
  document.querySelectorAll("button").forEach(btn => {
    if (!row.contains(btn)) {
      btn.disabled = true;
    }
  });
}

function enableAllButtons() {
  document.querySelectorAll("button").forEach(btn => {
    btn.disabled = false;
  });
}

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

window.onload = () => {
  renderTabelUnggulan();
  initSidebarFunctionality();
};
