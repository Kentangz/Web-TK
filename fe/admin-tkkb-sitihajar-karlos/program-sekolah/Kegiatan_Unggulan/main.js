import '../../global.css'
import './style.css'
import { createSidebarHTML, initSidebarFunctionality } from '../../Component/Sidebar/sidebar'

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

const kegiatanUnggulanData = [
  { ikon: "/user.png", judul: "DONAT (Dokter Anak Sehat)", deskripsi: "Meliputi: Pemeriksaan kesehatan anak, penyuluhan dan konsultasi gizi anak dan keluarga, konseling psikologi, kunjungan ke balai kesehatan, dll." },
  { ikon: "/user.png", judul: "Ekstrakulikuler", deskripsi: "(Drumband, English day, Komputer day, Bela diri dan Tari, Mengaji)." },
  { ikon: "/user.png", judul: "Student Day", deskripsi: "Meliputi: Memasak, Berkebun, Life skill, dll." },
  { ikon: "/user.png", judul: "Puncak Tema", deskripsi: "Kegiatan yang diadakan pada akhir tema pelajaran ." },
  { ikon: "/user.png", judul: "ODOA", deskripsi: "One Day One Ayat" },
  { ikon: "/user.png", judul: "Pondok Ramadhan", deskripsi: "Kegiatan di bulan Ramadhan" },
  { ikon: "/user.png", judul: "Home Visit", deskripsi: "Kunjungan ke rumah siswa" },
  { ikon: "/user.png", judul: "Parent Day", deskripsi: "Hari bersama orang tua" },
];

let editingIndex = null;

function renderTabelUnggulan() {
  const tbody = document.querySelector("#tabelUnggulan tbody");
  tbody.innerHTML = "";

  kegiatanUnggulanData.forEach((item, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="ikon">${item.ikon ? `<img src="${item.ikon}" width="50" height="50" />` : "-"}</td>
      <td class="judul">${item.judul}</td>
      <td class="deskripsi">${item.deskripsi}</td>
      <td>
        <button class="btn-edit" data-index="${index}">Edit</button>
        <button class="btn-hapus" data-index="${index}">Hapus</button>
      </td>
    `;

    tbody.appendChild(tr);

    const btnEdit = tr.querySelector(".btn-edit");
    const btnHapus = tr.querySelector(".btn-hapus");

    btnEdit.addEventListener("click", () => {
      if (editingIndex !== null) return alert("Selesaikan edit lain dulu!");
      editingIndex = index;
      disableAllButtonsExcept(tr);

      let newIcon = item.ikon;

      tr.querySelector(".ikon").innerHTML = `<img src="${item.ikon}" width="50" height="50" />`;
      tr.querySelector(".judul").innerHTML = `<input type="text" value="${item.judul}" style="width: 100%;">`;
      tr.querySelector(".deskripsi").innerHTML = `<input type="text" value="${item.deskripsi}" style="width: 100%;">`;
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
          const reader = new FileReader();
          reader.onload = (ev) => {
            newIcon = ev.target.result;
            tr.querySelector(".ikon").innerHTML = `<img src="${newIcon}" width="50" height="50" />`;
          };
          reader.readAsDataURL(file);
        };
        input.click();
      });

      tr.querySelector(".btn-simpan").addEventListener("click", () => {
        const judul = tr.querySelector(".judul input").value.trim();
        const deskripsi = tr.querySelector(".deskripsi input").value.trim();
        if (!judul || !deskripsi || !newIcon) return alert("Data tidak boleh kosong!");
        kegiatanUnggulanData[index] = { ikon: newIcon, judul, deskripsi };
        editingIndex = null;
        renderTabelUnggulan();
        enableAllButtons();
      });

      tr.querySelector(".btn-batal").addEventListener("click", () => {
        editingIndex = null;
        renderTabelUnggulan();
        enableAllButtons();
      });
    });

    btnHapus.addEventListener("click", () => {
      if (editingIndex !== null) return alert("Selesaikan edit lain dulu!");
      if (confirm("Yakin ingin menghapus?")) {
        kegiatanUnggulanData.splice(index, 1);
        renderTabelUnggulan();
      }
    });
  });
}

document.getElementById("btnTambah").addEventListener("click", () => {
  if (editingIndex !== null) return alert("Selesaikan edit terlebih dahulu.");
  editingIndex = kegiatanUnggulanData.length;

  const tbody = document.querySelector("#tabelUnggulan tbody");
  const tr = document.createElement("tr");
  let newIcon = "";

  tr.innerHTML = `
    <td class="ikon"><img src="/user.png" width="50" height="50" /></td>
    <td class="judul"><input type="text" placeholder="Masukkan nama kegiatan" style="width: 100%;"></td>
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
      const reader = new FileReader();
      reader.onload = (ev) => {
        newIcon = ev.target.result;
        tr.querySelector(".ikon").innerHTML = `<img src="${newIcon}" width="50" height="50" />`;
      };
      reader.readAsDataURL(file);
    };
    input.click();
  });

  tr.querySelector(".btn-simpan").addEventListener("click", () => {
    const judul = tr.querySelector(".judul input").value.trim();
    const deskripsi = tr.querySelector(".deskripsi input").value.trim();
    if (!judul || !deskripsi || !newIcon) return alert("Data tidak boleh kosong!");
    kegiatanUnggulanData.push({ ikon: newIcon, judul, deskripsi });
    editingIndex = null;
    renderTabelUnggulan();
    enableAllButtons();
  });

  tr.querySelector(".btn-batal").addEventListener("click", () => {
    editingIndex = null;
    tr.remove();
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

renderTabelUnggulan();
initSidebarFunctionality();