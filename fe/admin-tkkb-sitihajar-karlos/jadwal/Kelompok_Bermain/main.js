import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

import { getAllWaktu, postWaktu, updateWaktuById, deleteWaktuById, getAllJadwal, postJadwal, updateJadwalById, deleteJadwalById } from './fetch.js';

document.querySelector('#kelompok-bermain').innerHTML = `
  ${createSidebarHTML({
    activePage: 'kelompok-bermain',
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

    <div class="schedule-card">
      <div class="card-header">
        <div class="card-title">Tanggal</div>
      </div>
      <div class="card-body">
        <table class="card-table" id="tableHari">
          <thead>
            <tr>
              <th>Hari</th>
              <th>Jam</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
    <div class="button-group">
      <button class="btn-tambah" id="btnTambahHari">Tambah</button>
    </div>

    <div class="schedule-card">
      <div class="card-header">
        <div class="card-title">Jadwal Kelompok Bermain</div>
      </div>
      <div class="card-body">
        <table class="card-table" id="tableBermain">
          <thead>
            <tr>
              <th>Ikon</th>
              <th>Deskripsi</th>
              <th>Opsi</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
    <div class="button-group">
      <button class="btn-tambah" id="btnTambah">Tambah</button>
  </div>
`;

let jadwalHariData = [];
let jadwalBermainData = [];

let editingIndexHari = null;
let editingIndexBermain = null;

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

function renderTabelHari() {
  const tbody = document.querySelector("#tableHari tbody");
  tbody.innerHTML =`<tr><td colspan="3">Loading data waktu...</td></tr>`;

  getAllWaktu()
    .then(data => {
      jadwalHariData = data;
      const tbody = document.querySelector("#tableHari tbody");
      tbody.innerHTML = "";

      jadwalHariData.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <tr data-id="${item.id}">
          <td class="hari">${item.day}</td>
          <td class="jam">${item.hour}</td>
          <td>
            <button class="btn-edit" data-index="${index}">Edit</button>
            <button class="btn-hapus" data-index="${index}">Hapus</button>
          </td>
        `;

        tbody.appendChild(tr);

        const btnEdit = tr.querySelector(".btn-edit");
        const btnHapus = tr.querySelector(".btn-hapus");

        btnEdit.addEventListener("click", () => {
          if (editingIndexHari !== null) return
          editingIndexHari = index;
          disableAllButtonsExcept(tr);

          tr.querySelector(".hari").innerHTML = `<input type="text" value="${item.day}" style="width: 100%;">`;
          tr.querySelector(".jam").innerHTML = `<input type="text" value="${item.hour}" style="width: 100%;">`;
          tr.querySelector("td:last-child").innerHTML = `
            <button class="btn-edit btn-simpan">Simpan</button>
            <button class="btn-hapus btn-batal">Batal</button>
          `;

          tr.querySelector(".btn-simpan").addEventListener("click", () => {
            const hari = tr.querySelector(".hari input").value.trim();
            const jam = tr.querySelector(".jam input").value.trim();
            if (!hari || !jam) return showToast("Data waktu tidak boleh kosong.", "error");

            updateWaktuById(item.id, { hari, jam })
              .then(() => {
                editingIndexHari = null;
                showToast("Data waktu berhasil disimpan.", "success");
                renderTabelHari();
                enableAllButtons();
              })
              .catch(() => showToast("Gagal menyimpan data waktu.", "error"));
          });

          tr.querySelector(".btn-batal").addEventListener("click", () => {
            editingIndexHari = null;
            renderTabelHari();
            enableAllButtons();
          });
        });

        btnHapus.addEventListener("click", () => {
          if (editingIndexHari !== null) return
          else {
            showToast("Data waktu berhasil dihapus.", "error");
            deleteWaktuById(item.id)
              .then(() => renderTabelHari())
              .catch(() => showToast("Gagal menghapus data waktu.", "error"));
          }
        });
      });
    })
    .catch(() => showToast("Gagal memuat data waktu.", "error"));
}

document.getElementById("btnTambahHari").addEventListener("click", () => {
  if (editingIndexHari !== null) return
  editingIndexHari = "new";

  const tbody = document.querySelector("#tableHari tbody");
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td class="hari"><input type="text" placeholder="Masukkan hari" style="width: 100%;"></td>
    <td class="jam"><input type="text" placeholder="Masukkan jam" style="width: 100%;"></td>
    <td>
      <button class="btn-edit btn-simpan">Simpan</button>
      <button class="btn-hapus btn-batal">Batal</button>
    </td>
  `;

  tbody.appendChild(tr);
  disableAllButtonsExcept(tr);

  tr.querySelector(".btn-simpan").addEventListener("click", () => {
    const hari = tr.querySelector(".hari input").value.trim();
    const jam = tr.querySelector(".jam input").value.trim();
    if (!hari || !jam) return showToast("Data waktu tidak boleh kosong.", "error");

    postWaktu({ hari, jam })
      .then(() => {
        editingIndexHari = null;
        showToast("Data waktu berhasil ditambahkan.", "success");
        renderTabelHari();
        enableAllButtons();
      })
      .catch(() => showToast("Gagal menambahkan data waktu.", "error"));
  });

  tr.querySelector(".btn-batal").addEventListener("click", () => {
    editingIndexHari = null;
    renderTabelHari();
    enableAllButtons();
  });
});

function renderTabelBermain() {
  const tbody = document.querySelector("#tableBermain tbody");
  tbody.innerHTML =`<tr><td colspan="3">Loading data jadwal...</td></tr>`;

  getAllJadwal()
    .then(data => {
      jadwalBermainData = data;
      const tbody = document.querySelector("#tableBermain tbody");
      tbody.innerHTML = "";

      jadwalBermainData.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <tr data-id="${item.id}">
          <td class="icon">${item.icon ? `<img src="${item.icon}" width="50" height="50"/>` : "0"}</td>
          <td class="deskripsi">${item.desc}</td>
          <td>
            <button class="btn-edit" data-index="${index}">Edit</button>
            <button class="btn-hapus" data-index="${index}">Hapus</button>
          </td>
        `;

        tbody.appendChild(tr);

        const btnEdit = tr.querySelector(".btn-edit");
        const btnHapus = tr.querySelector(".btn-hapus");

        btnEdit.addEventListener("click", () => {
          if (editingIndexBermain !== null) return
          editingIndexBermain = index;
          disableAllButtonsExcept(tr);

          let selectedFile = null;

          tr.querySelector(".icon").innerHTML = `<img src="${item.icon}" width="50" height="50"/>`;
          tr.querySelector(".deskripsi").innerHTML = `<input type="text" value="${item.desc}" style="width: 100%;">`;
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
              showToast("Ikon jadwal berhasil di upload.", "success");
            };
            input.click();
          });

          tr.querySelector(".btn-simpan").addEventListener("click", () => {
            const deskripsi = tr.querySelector(".deskripsi input").value.trim();
            if (!deskripsi) return showToast("Data jadwal tidak boleh kosong.", "error");

            updateJadwalById(item.id, { deskripsi }, selectedFile)
              .then(() => {
                editingIndexBermain = null;
                showToast("Data jadwal berhasil disimpan.", "success");
                renderTabelBermain();
                enableAllButtons();
              })
              .catch(() => showToast("Gagal menyimpan data jadwal.", "error"));
          });

          tr.querySelector(".btn-batal").addEventListener("click", () => {
            editingIndexBermain = null;
            renderTabelBermain();
            enableAllButtons();
          });
        });

        btnHapus.addEventListener("click", () => {
          if (editingIndexBermain !== null) return
          else {
            showToast("Data jadwal berhasil dihapus.", "error");
            deleteJadwalById(item.id)
              .then(() => renderTabelBermain())
              .catch(() => showToast("Gagal menghapus data jadwal.", "error"));
          }
        });
      });
    })
    .catch(() =>showToast("Gagal memuat data jadwal.", "error"));
}

document.getElementById("btnTambah").addEventListener("click", () => {
  if (editingIndexBermain !== null) return
  editingIndexBermain = "new";

  const tbody = document.querySelector("#tableBermain tbody");
  const tr = document.createElement("tr");

  let selectedFile = null;

  tr.innerHTML = `
    <td class="icon"><img src="/user.png" width="50" height="50" /></td>
    <td class="deskripsi"><input type="text" placeholder="Masukkan deskripsi" style="width: 100%;"></td>
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
      showToast("Ikon jadwal berhasil di upload.", "success");
    };

    input.click();
  });

  tr.querySelector(".btn-simpan").addEventListener("click", () => {
    const deskripsi = tr.querySelector(".deskripsi input").value.trim();
    if (!deskripsi || !selectedFile) return showToast("Data jadwal tidak boleh kosong.", "error");

    postJadwal({ deskripsi }, selectedFile)
      .then(() => {
        editingIndexBermain = null;
        showToast("Data jadwal berhasil ditambahkan.", "success");
        renderTabelBermain();
        enableAllButtons();
      })
      .catch(() => showToast("Gagal menambahkan data jadwal.", "error"));
  });

  tr.querySelector(".btn-batal").addEventListener("click", () => {
    editingIndexBermain = null;
    renderTabelBermain();
    enableAllButtons();
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

window.onload = () => {
  renderTabelHari();
  renderTabelBermain();
  initSidebarFunctionality();
};
