import '../global.css';
import './style.css';
import { createSidebarHTML, initSidebarFunctionality } from '../Component/Sidebar/sidebar';
import { getAllGuru, postGuru, updateGuruById, deleteGuruById } from './fetch.js';
import { checkAuth } from '../Auth/Api/checkX.js';

if (!checkAuth()) {
  throw new Error("Not authenticated");
}

document.querySelector('#guru').innerHTML = `
  ${createSidebarHTML({
    activePage: 'guru',
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

    <div class="teacher-card">
      <div class="card-header">Data Guru</div>
      <div class="card-body">
        <table class="card-table" id="guruTable">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Jabatan</th>
              <th>Nama</th>
              <th>TTL</th>
              <th>No. Telp</th>
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
  </div>
`;

let guruData = [];
let editingIndex = null;

function renderTable() {
  const tbody = document.querySelector("#guruTable tbody");
  tbody.innerHTML = "";

  guruData.forEach((guru, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="text-align: center;">
        <img src="${guru.img}" alt="Foto" width="100" height="100" style="object-fit: cover;">
      </td>
      <td class="jabatan">${guru.title}</td>
      <td class="nama">${guru.name}</td>
      <td class="ttl">${guru.ttl}</td>
      <td class="nomor">${guru.phone}</td>
      <td style="text-align: center;">
        <button class="btn-edit" data-index="${index}">Edit</button>
        <button class="btn-hapus" data-index="${index}">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll(".btn-edit").forEach(btn =>
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const tr = e.target.closest("tr");

      if (editingIndex !== null) {
        return;
      }

      editingIndex = parseInt(index);
      disableAllButtonsExcept(tr);

      const dataLama = { ...guruData[index] };
      let uploadedImageFile = null;

      tr.querySelector(".jabatan").innerHTML = `<input type="text" value="${dataLama.title}" style="width: 100%;">`;
      tr.querySelector(".nama").innerHTML = `<input type="text" value="${dataLama.name}" style="width: 100%;">`;
      tr.querySelector(".ttl").innerHTML = `<input type="text" value="${dataLama.ttl}" style="width: 100%;">`;
      tr.querySelector(".nomor").innerHTML = `<input type="text" value="${dataLama.phone}" style="width: 100%;">`;

      const tdImage = tr.querySelector("td:nth-child(1)");
      tdImage.innerHTML = `<img src="${dataLama.img}" alt="Foto" width="100" height="100" style="object-fit: cover;">`;

      const opsiTd = tr.querySelector("td:last-child");
      opsiTd.innerHTML = `
        <button class="btn-upload" data-index="${index}">Upload Foto</button>
        <button class="btn-simpan btn-edit" data-index="${index}">Simpan</button>
        <button class="btn-batal btn-hapus" data-index="${index}">Batal</button>
      `;

      opsiTd.querySelector(".btn-simpan").addEventListener("click", async () => {
        const jabatan = tr.querySelector(".jabatan input").value.trim();
        const nama = tr.querySelector(".nama input").value.trim();
        const ttl = tr.querySelector(".ttl input").value.trim();
        const nomor = tr.querySelector(".nomor input").value.trim();

        if (jabatan && nama && ttl && nomor) {

          const updatedGuru = await updateGuruById(dataLama.id, { jabatan, nama, ttl, nomor }, uploadedImageFile);

          if (updatedGuru) {
            guruData[index] = {
              id: updatedGuru.id,
              img: updatedGuru.img,
              title: updatedGuru.title,
              name: updatedGuru.name,
              ttl: updatedGuru.ttl,
              phone: updatedGuru.phone
            };
            editingIndex = null;
            renderTable();
            enableAllButtons();
            showToast("Data guru berhasil disimpan.", "success");
          } else {
            showToast("Gagal menyimpan data guru.", "error");
          }
        } else {
          showToast("Data guru tidak boleh kosong.", "error");
        }
      });

      opsiTd.querySelector(".btn-upload").addEventListener("click", () => {
        const inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.accept = "image/*";
        inputFile.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
          const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"];
          if (!allowedFormats.includes(file.type)) {
            showToast("Format file tidak didukung.", "error");
            return;
          }

          if (file.size > 2 * 1024 * 1024) {
            showToast("Ukuran gambar maksimal 2MB.", "error");
            return;
          }

          uploadedImageFile = file;
          const reader = new FileReader();
          reader.onload = function (e) {
            tdImage.innerHTML = `<img src="${e.target.result}" alt="Foto" width="100" height="100" style="object-fit: cover;">`;
            showToast("Foto guru berhasil diupload.", "success");
          };
          reader.readAsDataURL(file);
        }
      });
        inputFile.click();
      });

      opsiTd.querySelector(".btn-batal").addEventListener("click", () => {
        editingIndex = null;
        renderTable();
        enableAllButtons();
      });
    })
  );

  document.querySelectorAll(".btn-hapus").forEach(btn =>
    btn.addEventListener("click", async (e) => {
      const index = e.target.dataset.index;
      if (editingIndex !== null) {
        return;
      }

      const guruToDelete = guruData[index];
      try {
        await deleteGuruById(guruToDelete.id);
        guruData.splice(index, 1);
        renderTable();
        showToast("Data guru berhasil dihapus.", "error");
      } catch (error) {
        showToast("Gagal menghapus data guru.", "error");
      }
    })
  );
}

document.getElementById("btnTambah").addEventListener("click", () => {
  const tbody = document.querySelector("#guruTable tbody");

  if (tbody.querySelector(".input-new")) return;

  if (editingIndex !== null) {
    return;
  }

  const tr = document.createElement("tr");
  tr.classList.add("input-new");
  disableAllButtonsExcept(tr);

  tr.innerHTML = `
    <td style="text-align: center;">
      <img src="/user.png" alt="Foto" width="100" height="100" style="object-fit: cover; display:block; margin:auto; margin-bottom:5px;">
    </td>
    <td><input type="text" placeholder="Jabatan" style="width: 100%;"></td>
    <td><input type="text" placeholder="Nama" style="width: 100%;"></td>
    <td><input type="text" placeholder="Tempat, Tgl Lahir" style="width: 100%;"></td>
    <td><input type="text" placeholder="No Telepon" style="width: 100%;"></td>
    <td style="text-align: center;">
      <button class="btn-upload">Upload Foto</button>
      <button class="btn-simpan btn-edit">Simpan</button>
      <button class="btn-batal btn-hapus">Batal</button>
    </td>
  `;
  tbody.appendChild(tr);

  const tdImage = tr.querySelector("td:nth-child(1)");

  let uploadedImageFile = null;

  tr.querySelector(".btn-upload").addEventListener("click", () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedFormats = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"];
      if (!allowedFormats.includes(file.type)) {
        showToast("Format file tidak didukung.", "error");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        showToast("Ukuran gambar maksimal 2MB.", "error");
        return;
      }

      uploadedImageFile = file;
      const reader = new FileReader();
      reader.onload = function (e) {
        tdImage.innerHTML = `<img src="${e.target.result}" alt="Foto" width="100" height="100" style="object-fit: cover;">`;
        showToast("Foto guru berhasil diupload.", "success");
      };
      reader.readAsDataURL(file);
    }
  });
    inputFile.click();
  });

  tr.querySelector(".btn-simpan").addEventListener("click", async () => {
    const jabatan = tr.querySelector("td:nth-child(2) input").value.trim();
    const nama = tr.querySelector("td:nth-child(3) input").value.trim();
    const ttl = tr.querySelector("td:nth-child(4) input").value.trim();
    const nomor = tr.querySelector("td:nth-child(5) input").value.trim();

    if (jabatan && nama && ttl && nomor && uploadedImageFile) {
      const newGuru = await postGuru({ jabatan, nama, ttl, nomor }, uploadedImageFile);
      if (newGuru) {
        guruData.push({
          id: newGuru.id,
          img: newGuru.img,
          title: newGuru.title,
          name: newGuru.name,
          ttl: newGuru.ttl,
          phone: newGuru.phone
        });
        tr.remove();
        editingIndex = null;
        renderTable();
        enableAllButtons();
        showToast("Data guru berhasil ditambahkan.", "success");
      } else {
        showToast("Gagal menambahkan data guru.", "error");
      }
    } else {
      showToast("Data guru tidak boleh kosong.", "error");
    }
  });

  tr.querySelector(".btn-batal").addEventListener("click", () => {
    tr.remove();
    editingIndex = null;
    enableAllButtons();
  });
});

function disableAllButtonsExcept(exceptRow) {
  document.querySelectorAll("#guruTable button, #btnTambah").forEach(btn => {
    if (!exceptRow || !exceptRow.contains(btn)) btn.disabled = true;
  });
}

function enableAllButtons() {
  document.querySelectorAll("#guruTable button, #btnTambah").forEach(btn => btn.disabled = false);
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

(async () => {
  const tbody = document.querySelector("#guruTable tbody");
  tbody.innerHTML =`<tr><td colspan="6">Loading data guru...</td></tr>`;

  try {
    const allGuru = await getAllGuru();
    guruData = allGuru.map(g => ({
      id: g.id,
      img: g.img,
      title: g.jabatan || g.title,
      name: g.nama || g.name,
      ttl: g.ttl,
      phone: g.nomor || g.phone
    }));
    renderTable();
  } catch (error) {
    showToast("Gagal memuat data guru.", "error");
  }
})();

initSidebarFunctionality();